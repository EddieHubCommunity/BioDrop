import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { clientEnv } from "@config/schemas/clientSchema";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import Button from "@components/Button";
import logger from "@config/logger";
import { getUserApi } from "pages/api/profiles/[username]";
import Router from "next/router";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
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

  return {
    props: { profile, BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL },
  };
}

export default function ProfileDeactivated({ profile, BASE_URL }) {
  const activateProfile = async() => {
    const res = await fetch(`${BASE_URL}/api/account/manage/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...profile, isEnabled: true}),
    });
    await res.json();
    return Router.push(`${BASE_URL}/account/manage/profile`);
  };

  return (
    <>
      <PageHead
        title="Profile deactivated"
        description="You must activate your profile first"
      />

      <Page>
        <div className="bg-white dark:bg-primary-high">
          <div className="py-24 px-6 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-4xl font-bold tracking-tight text-primary-high dark:text-primary-low">
                Profile deactivated
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-medium dark:text-primary-medium-low">
                click on the Activate profile button to use your Profile again
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button 
                  type = "button"
                  onClick={() => activateProfile()}
                  className="rounded-md bg-secondary-high px-3.5 py-1.5 text-base font-semibold leading-7 text-primary-low dark:text-primary-low shadow-sm hover:bg-secondary-low focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-high"
                >
                  Activate profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
