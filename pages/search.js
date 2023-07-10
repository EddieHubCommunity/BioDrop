import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

import UserCard from "@components/user/UserCard";
import Alert from "@components/Alert";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import Tag from "@components/Tag";
import Badge from "@components/Badge";
import logger from "@config/logger";
import Input from "@components/form/Input";
import { getTags } from "./api/discover/tags";
import { getUsers } from "./api/profiles";
import config from "@config/app.json";
import Pagination from "@components/Pagination";

export async function getStaticProps() {
  const pageConfig = config.isr.searchPage; // Fetch the specific configuration for this page
  let data = {
    tags: [],
  };
  let users = [];
  try {
    users = await getUsers();
  } catch (e) {
    logger.error(e, "ERROR search users");
  }

  try {
    data.tags = await getTags();
  } catch (e) {
    logger.error(e, "ERROR loading tags");
  }

  if (users.length > 10) {
    data.randUsers = users.sort(() => 0.5 - Math.random()).slice(0, 10);
  } else {
    data.randUsers = users;
  }

  return {
    props: { data, BASE_URL: process.env.NEXT_PUBLIC_BASE_URL },
    revalidate: pageConfig.revalidateSeconds,
  };
}

export default function Search({ data: { tags, randUsers }, BASE_URL }) {
  const router = useRouter();
  const { username, keyword } = router.query;
  const [notFound, setNotFound] = useState();
  const [users, setUsers] = useState(randUsers);
  const [inputValue, setInputValue] = useState(username || keyword || "");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (username) {
      setNotFound(`${username} not found`);
    }
  }, [username]);

  useEffect(() => {
    if (!inputValue) {
      //Setting the users as null when the input field is empty
      setUsers(randUsers);
      //Removing the not found field when the input field is empty
      setNotFound();
      return;
    }

    if (inputValue.length < 2) {
      return;
    }

    // checks if there is no keyword between 2 commas and removes the second comma and also checks if the input starts with comma and removes it.
    setInputValue(inputValue.replace(/,(\s*),/g, ",").replace(/^,/, ""));

    async function fetchUsers(value) {
      try {
        const res = await fetch(
          `${BASE_URL}/api/search/${value.replaceAll(",", "/")}`
        );
        const data = await res.json();
        if (data.error) {
          throw new Error(`${inputValue} not found`);
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
      fetchUsers(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const search = (keyword) => {
    const cleanedInput = cleanSearchInput(inputValue);

    if (!cleanedInput.length) {
      return setInputValue(keyword);
    }

    const items = cleanedInput.split(", ");

    if (cleanedInput.length) {
      if (searchTagNameInInput(inputValue, keyword)) {
        return setInputValue(
          items.filter((item) => item.trim() !== keyword).join(", ")
        );
      }

      return setInputValue([...items, keyword].join(", "));
    }

    setInputValue(keyword);
  };

  // removes leading/trailing whitespaces and extra spaces and adds space after the comma and converted to lowercase
  const cleanSearchInput = (searchInput) => {
    return searchInput
      .trim()
      .replace(/\s{2,}/g, " ")
      .replace(/,(?!\s)/g, ", ")
      .toLowerCase();
  };

  const searchTagNameInInput = (searchInput, tagName) => {
    const tags = cleanSearchInput(searchInput).split(",");

    for (let tag of tags) {
      if (tag.trim() === tagName.toLowerCase()) {
        return true;
      }
    }

    return false;
  };

  const usersPerPage = 20;
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
        title="LinkFree Search Users"
        description="Search LinkFree user directory by name, tags, skills, languages"
      />
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Search</h1>

        <div className="flex flex-wrap justify-center space-x-3 mb-4">
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
            placeholder="Search user by name or tags; eg: open source, reactjs"
            name="keyword"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Badge>

        {notFound && <Alert type="error" message={notFound} />}
        <ul className="flex flex-wrap gap-3 justify-center mt-[3rem]">
          {users.length < usersPerPage &&
            users.map((user) => (
              <li key={user.username}>
                <UserCard profile={user} />
              </li>
            ))}

          {users.length > usersPerPage &&
            visibleUsers.map((user) => (
              <li key={user.username}>
                <UserCard profile={user} />
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
