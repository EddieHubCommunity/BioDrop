import { IconContext } from "react-icons";
import { FaRegComments } from "react-icons/fa6";
import { remark } from "remark";
import strip from "strip-markdown";
import requestIp from "request-ip";

import { getUserApi } from "./api/profiles/[username]/index";
import { clientEnv } from "@config/schemas/clientSchema";
import logger from "@config/logger";
import Link from "@components/Link";
import PageHead from "@components/PageHead";
import MultiLayout from "@components/layouts/MultiLayout";
import Page from "@components/Page";
import UserPage from "@components/user/UserPage";
import { BASE_GITHUB_PROJECT_URL } from "@constants/index";
import { getStats } from "./api/account/statistics";

export async function getServerSideProps(context) {
  const { req, res } = context;
  const username = context.query.username;

  const { status, profile } = await getUserApi(req, res, username, {
    referer: req.headers.referer,
    ip: requestIp.getClientIp(req),
  });
  if (status !== 200) {
    logger.error(
      profile.error,
      `profile loading failed for username: ${username}`
    );

    return {
      redirect: {
        destination: `/search?username=${username}`,
        permanent: false,
      },
    };
  }

  logger.info(`data loaded for username: ${username}`);

  try {
    const processedBio = await remark().use(strip).process(profile.bio);
    profile.cleanBio = processedBio.toString();
  } catch (e) {
    logger.error(e, `cannot strip markdown for: ${username}`);
    profile.cleanBio = profile.bio;
  }
  try {
    if (profile.isStatsPublic) {
      profile.profileStats = await getStats(username);
    }
  } catch (e) {
    logger.error(e, "ERROR get user's account statistics");
  }

  return {
    props: {
      data: profile,
      settings: { ...profile.settings, type: profile.accountType },
      BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL,
    },
  };
}

export default function User({ data, BASE_URL }) {
  return (
    <>
      <PageHead
        title={data.name}
        description={data.cleanBio}
        ogTitle={data.name}
        ogDescription={data.cleanBio}
        ogUrl={`https://biodrop.io/${data.username}`}
        ogImage={`https://github.com/${data.username}.png`}
        ogType="image/png"
      />

      <Page>
        <UserPage data={data} BASE_URL={BASE_URL} />
      </Page>

      <Link
        href={`${BASE_GITHUB_PROJECT_URL}/issues/new?labels=testimonial&template=testimonial.yml&title=New+Testimonial+for+${data.name}&name=${data.username}`}
        rel="noopener noreferrer"
        target="_blank"
        className="fixed bottom-5 right-5 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-high"
      >
        <div className="px-4 py-2 bg-tertiary-medium text-primary-low flex items-center gap-1 rounded-full hover:bg-secondary-medium hover:drop-shadow-lg">
          <IconContext.Provider
            value={{ color: "white", style: { verticalAlign: "middle" } }}
          >
            <FaRegComments />
          </IconContext.Provider>
          <p className="text-sm font-medium text-primary-medium">
            Add testimonial for {data.name}
          </p>
        </div>
      </Link>
    </>
  );
}

User.getLayout = function getLayout(page, settings) {
  return <MultiLayout settings={settings}>{page}</MultiLayout>;
};
