import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  FaGithub,
  FaLink,
  FaPersonBurst,
  FaMicroblog,
  FaTent,
  FaCertificate,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import { getUserApi } from "pages/api/profiles/[username]";
import { PROJECT_NAME } from "@constants/index";
import Card from "@components/Card";
import Button from "@components/Button";
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
    props: { profile, progress },
  };
}

export default function Onboarding({ profile, progress }) {
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
  ];

  const alerts = {
    premium: "You are now a premium user!",
    cancel: "You cancelled your subscription.",
  };
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
            disable={!cards[0].isEdit}
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
              <Card href={card.button.href} active={!card.isEdit}>
                <div className="flex gap-4 content-center items-center justify-items-start grow">
                  <card.icon className="h-16 w-16" />
                  <h2 className="text-xl font-bold">{card.title}</h2>
                </div>
                <p>{card.description}</p>
                {card.isEdit && <Button>Edit</Button>}
                {!card.isEdit && (
                  <Button primary={true}>+ {card.button.name}</Button>
                )}
              </Card>
            </li>
          ))}
        </ul>
      </Page>
    </>
  );
}
