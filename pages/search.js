import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import UserHorizontal from "@components/user/UserHorizontal";
import Alert from "@components/Alert";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import Tag from "@components/tag/Tag";
import Badge from "@components/Badge";
import logger from "@config/logger";
import Input from "@components/form/Input";
import { getTags } from "./api/discover/tags";
import { getProfiles } from "./api/discover/profiles";
import Pagination from "@components/Pagination";
import {
  cleanSearchInput,
  searchTagNameInInput,
} from "@services/utils/search/tags";
import { PROJECT_NAME } from "@constants/index";

async function fetchUsersByKeyword(keyword) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?${new URLSearchParams({
      slug: keyword,
    }).toString()}`,
  );

  const searchData = await res.json();
  return searchData.users || [];
}

async function fetchRecentlyUpdatedUsers() {
  const users = await getProfiles();
  return users;
}

async function fetchTags() {
  try {
    return await getTags();
  } catch (e) {
    logger.error(e, "ERROR loading tags");
    return [];
  }
}

export async function getServerSideProps(context) {
  const { keyword } = context.query;

  let serverProps = {
    tags: [],
    filteredUsers: [],
    recentlyUpdatedUsers: [],
  };

  try {
    if (keyword) {
      serverProps.filteredUsers = await fetchUsersByKeyword(keyword);
    } else {
      serverProps.recentlyUpdatedUsers = await fetchRecentlyUpdatedUsers();
    }
  } catch (e) {
    logger.error(e, "ERROR fetching users");
  }

  serverProps.tags = await fetchTags();

  return {
    props: { data: serverProps, BASE_URL: process.env.NEXT_PUBLIC_BASE_URL },
  };
}

export default function Search({
  data: { tags, recentlyUpdatedUsers, filteredUsers },
  BASE_URL,
}) {
  const router = useRouter();
  const { username, keyword, userSearchParam } = router.query;
  const [notFound, setNotFound] = useState();
  const [users, setUsers] = useState(keyword ? filteredUsers : recentlyUpdatedUsers);
  const [inputValue, setInputValue] = useState(
    username || keyword || userSearchParam || "",
  );
  const [currentPage, setCurrentPage] = useState(1);

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (username) {
      setNotFound(`${username} not found`);
    }
  }, [username]);
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!inputValue) {
      //Setting the users as null when the input field is empty
      setUsers(recentlyUpdatedUsers);
      //Removing the not found field when the input field is empty
      setNotFound();
      router.replace(
        {
          pathname: "/search",
        },
        undefined,
        { shallow: true },
      );
      return;
    }

    // checks if there is no keyword between 2 commas and removes the second comma and also checks if the input starts with comma and removes it.
    setInputValue(inputValue.replace(/,(\s*),/g, ",").replace(/^,/, ""));

    // If the inputValue has not changed and is the same as the keyword passed from the server
    if (keyword && inputValue === keyword) {
      return;
    }

    async function fetchUsers(value) {
      try {
        const res = await fetch(
          `${BASE_URL}/api/search?${new URLSearchParams({
            slug: value,
          }).toString()}`,
        );
        const data = await res.json();
        if (data.error) {
          throw new Error(`${value} not found`);
        }

        setNotFound();
        setUsers(data.users.sort(() => Math.random() - 0.5));
        setCurrentPage(1);
      } catch (err) {
        setNotFound(err.message);
        setUsers([]);
      }
    }

    const timer = setTimeout(() => {
      router.replace(
        {
          pathname: "/search",
          query: { userSearchParam: inputValue },
        },
        undefined,
        { shallow: true },
      );
      fetchUsers(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    const onKeyDownHandler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDownHandler);

    return () => {
      document.removeEventListener("keydown", onKeyDownHandler);
    };
  }, []);

  const search = (keyword) => {
    const cleanedInput = cleanSearchInput(inputValue);

    if (!cleanedInput.length) {
      return setInputValue(keyword);
    }

    const items = cleanedInput.split(", ");

    if (cleanedInput.length) {
      if (searchTagNameInInput(inputValue, keyword)) {
        return setInputValue(
          items.filter((item) => item.trim() !== keyword).join(", "),
        );
      }

      return setInputValue([...items, keyword].join(", "));
    }

    setInputValue(keyword);
  };

  const usersPerPage = 21;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const visibleUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 150, behavior: "smooth" });
  }, []);

  return (
    <>
      <PageHead
        title={`${PROJECT_NAME} Search Users`}
        description={`Search ${PROJECT_NAME} user directory by name, tags, skills, languages`}
      />
      <Page>
        <h1 className="mb-4 text-4xl font-bold">Search</h1>

        <div className="flex flex-wrap justify-center mb-4 space-x-3">
          {tags &&
            tags
              .slice(0, 10)
              .map((tag) => (
                <Tag
                  key={tag.name}
                  name={tag.name}
                  total={tag.total}
                  selected={searchTagNameInInput(inputValue, tag.name)}
                  onClick={() => search(tag.name)}
                />
              ))}
        </div>

        <Badge
          content={users.length}
          display={!!users}
          className="w-full"
          badgeClassName={"translate-x-2/4 -translate-y-1/2"}
        >
          <Input
            ref={searchInputRef}
            placeholder="Search user by name or tags; eg: open source, reactjs or places; eg: London, New York"
            name="keyword"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Badge>

       {!inputValue && <h2 className="mt-10 mb-4 text-2xl font-bold">Recently updated profiles</h2>}

        {notFound && <Alert type="error" message={notFound} />}
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {users.length < usersPerPage &&
            users.map((user) => (
              <li key={user.username}>
                <UserHorizontal profile={user} input={inputValue} />
              </li>
            ))}

          {users.length > usersPerPage &&
            visibleUsers.map((user) => (
              <li key={user.username}>
                <UserHorizontal profile={user} input={inputValue} />
              </li>
            ))}
        </ul>

        {users.length > usersPerPage && (
          <Pagination
            currentPage={currentPage}
            data={users}
            perPage={usersPerPage}
            paginate={paginate}
            startIndex={indexOfFirstUser}
            endIndex={indexOfLastUser}
          />
        )}
      </Page>
    </>
  );
}
