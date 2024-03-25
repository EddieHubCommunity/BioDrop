import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  FaGithub,
  FaLink,
  FaPersonBurst,
  FaMicroblog,
  FaTent,
  FaCertificate,
  FaArrowUpRightFromSquare,
  FaTriangleExclamation,
} from "react-icons/fa6";

import { clientEnv } from "@config/schemas/clientSchema";
import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import { getUserApi } from "pages/api/profiles/[username]";
import { PROJECT_NAME } from "@constants/index";
import Card from "@components/Card";
import Button from "@components/Button";
import Modal from "@components/Modal";
import Navigation from "@components/account/manage/Navigation";
import ProgressBar from "@components/statistics/ProgressBar";
import Alert from "@components/Alert";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const username = session.username;

  let profile = {};
  try {
    profile = (await getUserApi(context.req, context.res, username)).profile;
  } catch (e) {
    logger.error(e, `profile loading failed for username: ${username}`);
  }
  if (profile.error) {
    profile.username = session.username;
    profile.name = session.user.name;
  }

  let profileSections = [
    "links",
    "milestones",
    "tags",
    "socials",
    "testimonials",
    "events",
    "repos",
    "delete"
  ];
  let progress = {
    percentage: 0,
    missing: [],
  };

  progress.missing = profileSections.filter(
    (property) => !profile[property]?.length,
  );
  progress.percentage = (
    ((profileSections.length - progress.missing.length) /
      profileSections.length) *
    100
  ).toFixed(0);

  return {
    props: { profile, progress, BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL },
  };
}

export default function Onboarding({ profile, progress, BASE_URL }) {
  const router = useRouter();
  const { data: session } = useSession();
  if (typeof window !== "undefined" && window.localStorage) {
    if (router.query.alert) {
      localStorage.removeItem("premium-intent");
    }
    if (
      session &&
      session.accountType !== "premium" &&
      localStorage.getItem("premium-intent")
    ) {
      localStorage.removeItem("premium-intent");
      router.push("/api/stripe");
    }
  }
  const [showModal, setShowModal] = useState(false);

  const cards = [
    {
      icon: FaPersonBurst,
      title: "Profile",
      description: "Start and Edit your Profile",
      button: {
        name: "Profile",
        href: "/account/manage/profile",
      },
      isEdit: profile.bio,
    },
    {
      icon: FaLink,
      title: "Links",
      description: "List your social media and other links",
      button: {
        name: "Link",
        href: "/account/manage/links",
      },
      isEdit: profile.links && profile.links.length > 0,
    },
    {
      icon: FaGithub,
      title: "Repos",
      description: "Your favourite GitHub Repos",
      button: {
        name: "Repo",
        href: "/account/manage/repos",
      },
      isEdit: profile.repos && profile.repos.length > 0,
    },
    {
      icon: FaMicroblog,
      title: "Testimonials",
      description: "Your favourite Testimonials",
      button: {
        name: "Testimonials",
        href: "/account/manage/testimonials",
      },
      isEdit: profile.testimonials && profile.testimonials.length > 0,
    },
    {
      icon: FaTent,
      title: "Events",
      description: "Events you are attending or speaking at",
      button: {
        name: "Event",
        href: "/account/manage/events",
      },
      isEdit: profile.events && profile.events.length > 0,
    },
    {
      icon: FaCertificate,
      title: "Milestones",
      description: "Your achievements and future goals",
      button: {
        name: "Milestone",
        href: "/account/manage/milestones",
      },
      isEdit: profile.milestones && profile.milestones.length > 0,
    },
    {
      icon: FaTriangleExclamation,
      title: "Delete Account",
      description: "Delete your account",
      button: {
        name: "Delete Account",
      },
      click: true,
    },
  ];

  const alerts = {
    premium: "You are now a premium user!",
    cancel: "You cancelled your subscription.",
  };

  //TODO move this?
  const deleteLinks = async () => {
    await fetch(`${BASE_URL}/api/account/manage/delete/${profile.username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
    
  return (
    <>
      <PageHead
        title="Onboarding Dashboard"
        description={`Here you can manage your ${PROJECT_NAME} profile`}
      />

      <Page>
        <Navigation />

        {router.query.alert && (
          <Alert type="info" message={alerts[router.query.alert]} />
        )}

        <div className="flex flex-col mb-8 md:flex-row">
          <h1 className="mb-4 text-4xl font-bold grow">
            Create &amp; Manage Your Profile
          </h1>
          <Button
            href={`/${profile.username}`}
            className={"gap-4"}
            disabled={!cards[0].isEdit}
          >
            <FaArrowUpRightFromSquare className="w-4 h-4" /> View Profile
          </Button>
        </div>

        <div className="w-full border p-4 my-6 dark:border-primary-medium">
          <span className="flex flex-row flex-wrap justify-between">
            <span className="text-lg font-medium text-primary-medium dark:text-primary-low">
              Profile Completion: {progress.percentage}%
            </span>
            {progress.missing.length > 0 && (
              <span className="text-primary-medium-low dark:text-primary-low">
                (add missing sections below: {progress.missing.join(", ")})
              </span>
            )}
          </span>

          <ProgressBar progress={progress} />
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card) => (
            <li key={card.title}>
              {card.click ?
              <div className="flex flex-col items-center border-2 h-[14rem] overflow-hidden rounded-lg shadow-lg transition duration-350 p-4 gap-3  duration-500 ease-in-out hover:border-tertiary-medium border-tertiary-medium">
              <div className="flex gap-4 content-center items-center justify-items-start grow">
                  <card.icon className="h-16 w-16" />
                  <h2 className="text-xl font-bold">{card.title}</h2>
                </div>
                <p>{card.description}</p>
                <Button onClick={() => setShowModal(true)}>Delete Account</Button>
                
            <Modal
            show={showModal}
            setShow={setShowModal}
          >
            {/* TODO: on click, show a indicator deltion is happening - success message after */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:mx-24">
              <Button onClick={() => deleteLinks()}>
                Delete my Account
              </Button>
              <Button onClick={() => setShowModal(false)}>Go Back</Button>
            </div>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-center text-primary-medium dark:text-primary-low mb-4">Warning! This cannot be reversed once you click Delete.</p>
          </Modal>
        
                </div>
                :
              <Card href={card.button.href} active={!card.isEdit}>
                <div className="flex gap-4 content-center items-center justify-items-start grow">
                  <card.icon className="h-16 w-16" />
                  <h2 className="text-xl font-bold">{card.title}</h2>
                </div>
                <p>{card.description}</p>
                {card.isEdit ? <Button>Edit</Button>
                : <Button primary={true}>+ {card.button.name}</Button>
                }
              </Card>
}
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
