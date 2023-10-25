import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import DocumentPlusIcon from "@heroicons/react/24/outline/DocumentPlusIcon";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Navigation from "@components/account/manage/Navigation";
import { getReposApi } from "pages/api/account/manage/repos";
import Button from "@components/Button";
import Input from "@components/form/Input";
import { useState } from "react";
import Notification from "@components/Notification";
import { clientEnv } from "@config/schemas/clientSchema";
import UserRepos from "@components/user/UserRepos";
import { PROJECT_NAME } from "@constants/index";
import ConfirmDialog from "@components/ConfirmDialog";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const username = session.username;

  let repos = [];
  try {
    repos = await getReposApi(username);
  } catch (e) {
    logger.error(
      e,
      `profile loading failed milestones for username: ${username}`,
    );
  }

  return {
    props: { repos, BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL },
  };
}

export default function ManageRepos({ BASE_URL, repos }) {
  const [selectedRepoId, setSelectedRepoId] = useState(null);
  const [open, setOpen] = useState(false);
  const [showNotification, setShowNotification] = useState({
    show: false,
    type: "",
    message: "",
    additionalMessage: "",
  });
  const [repoList, setRepoList] = useState(repos || []);
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/api/account/manage/repo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const updatedRepos = await res.json();

    if (updatedRepos.message) {
      return setShowNotification({
        show: true,
        type: "error",
        message: "Repo add failed",
        additionalMessage: updatedRepos.message,
      });
    }

    const resRepos = await fetch(`${BASE_URL}/api/account/manage/repos`);
    const listRepos = await resRepos.json();

    setRepoList(listRepos);
    setUrl("");
    return setShowNotification({
      show: true,
      type: "success",
      message: "Repo added",
      additionalMessage: "Your repository has been added successfully",
    });
  };

  const confirmDelete = (id) => {
    setSelectedRepoId(id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${BASE_URL}/api/account/manage/repo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleteRepo = await res.json();

    if (deleteRepo.message) {
      return setShowNotification({
        show: true,
        type: "error",
        message: "Repo delete failed",
        additionalMessage: deleteRepo.message,
      });
    }

    const resRepos = await fetch(`${BASE_URL}/api/account/manage/repos`);
    const listRepos = await resRepos.json();

    setRepoList(listRepos);
    return setShowNotification({
      show: true,
      type: "success",
      message: "Repo deleted",
      additionalMessage: "Your repository has been deleted successfully",
    });
  };

  return (
    <>
      <PageHead
        title="Manage Repositories (repos)"
        description={`Here you can manage your ${PROJECT_NAME} repositories.`}
      />

      <Page>
        <Navigation />

        <Notification
          show={showNotification.show}
          type={showNotification.type}
          onClose={() =>
            setShowNotification({ ...showNotification, show: false })
          }
          message={showNotification.message}
          additionalMessage={showNotification.additionalMessage}
        />

        <form className="mb-2" onSubmit={handleSubmit}>
          <Input
            name="url"
            type="url"
            placeholder="https://github.com/EddieHubCommunity/BioDrop"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
          <Button disable={!url.length}>
            <DocumentPlusIcon className="h-5 w-5 mr-2" />
            Add Repo
          </Button>
        </form>

        <UserRepos
          repos={repoList}
          manage={true}
          confirmDelete={confirmDelete}
        />
      </Page>
      <ConfirmDialog
        open={open}
        action={() => handleDelete(selectedRepoId)}
        setOpen={setOpen}
        title="Delete repo"
        description="Are you sure?"
      />
    </>
  );
}
