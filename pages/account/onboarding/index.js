import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
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

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

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

  return {
    props: { profile },
  };
}

export default function Onboarding({ profile }) {
  const cards = [
    {
      icon: FaPersonBurst,
      title: "Profile",
      description: "Manage your profile and personal information",
      button: {
        name: "Profile",
        href: "/account/manage/profile",
      },
      isEdit: true,
    },
    {
      icon: FaLink,
      title: "Links",
      description: "Help people find you on other platforms",
      button: {
        name: "Link",
        href: "/account/manage/link",
      },
      isEdit: profile.links && profile.links.length > 0,
    },
    {
      icon: FaGithub,
      title: "Repos",
      description: "Display your favourite repos",
      button: {
        name: "Repo",
        href: "/account/manage/repos",
      },
      isEdit: profile.repos && profile.repos.length > 0,
    },
    {
      icon: FaMicroblog,
      title: "Testimonials",
      description: "Display your favourite testinomials",
      button: {
        name: "Testimonials",
        href: "/account/manage/testimonials",
      },
      isEdit: profile.testimonials && profile.testimonials.length > 0,
    },
    {
      icon: FaTent,
      title: "Events",
      description: "Display the events you are attending",
      button: {
        name: "Event",
        href: "/account/manage/events",
      },
      isEdit: profile.events && profile.events.length > 0,
    },
    {
      icon: FaCertificate,
      title: "Milestones",
      description: "Display your achievements and future goals",
      button: {
        name: "Milestone",
        href: "/account/manage/milestone",
      },
      isEdit: profile.milestones && profile.milestones.length > 0,
    },
  ];
  return (
    <>
      <PageHead
        title="Onboarding Dashboard"
        description={`Here you can manage your ${PROJECT_NAME} profile`}
      />

      <Page>
        <Navigation />
        <div className="flex mb-8">
          <h1 className="mb-4 text-4xl font-bold grow">
            Manage Profile Overview
          </h1>
          <Button href={`/${profile.username}`} className="gap-4">
            <FaArrowUpRightFromSquare className="w-4 h-4" /> View Profile
          </Button>
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
