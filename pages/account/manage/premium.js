import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useState } from "react";
import { useRouter } from "next/router";

import { clientEnv } from "@config/schemas/clientSchema";
import logger from "@config/logger";
import PageHead from "@components/PageHead";
import Page from "@components/Page";
import Navigation from "@components/account/manage/Navigation";
import Alert from "@components/Alert";
import { getSettingsApi } from "pages/api/account/manage/settings";
import Toggle from "@components/form/Toggle";
import Notification from "@components/Notification";
import Link from "@components/Link";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const username = session.username;

  let settings = {};
  try {
    settings = await getSettingsApi(username);
  } catch (e) {
    logger.error(e, `profile loading failed for username: ${username}`);
  }

  return {
    props: {
      username,
      settings,
      accountType: session.accountType,
      BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL,
      PREMIUM_SUPPORT_URL: clientEnv.NEXT_PUBLIC_PREMIUM_SUPPORT_URL,
    },
  };
}

export default function ManageSettings({
  username,
  settings,
  accountType,
  BASE_URL,
  PREMIUM_SUPPORT_URL,
}) {
  const router = useRouter();
  const { success } = router.query;
  const [showNotification, setShowNotification] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(settings.hideNavbar || false);
  const [hideFooter, setHideFooter] = useState(settings.hideFooter || false);

  const toggle = async (setting) => {
    if (accountType !== "premium") {
      return;
    }
    const res = await fetch(`${BASE_URL}/api/account/manage/settings`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hideNavbar: setting === "hideNavbar" ? !hideNavbar : hideNavbar,
        hideFooter: setting === "hideFooter" ? !hideFooter : hideFooter,
      }),
    });
    const updatedSettings = await res.json();
    setShowNotification(true);
    setHideNavbar(updatedSettings.hideNavbar);
    setHideFooter(updatedSettings.hideFooter);
  };

  return (
    <>
      <PageHead
        title="Manage Profile settings"
        description="Here you can manage your BioDrop Proile settings."
      />

      <Page>
        {success && (
          <Alert
            type="success"
            message={"Event Created/Updated Successfully"}
          />
        )}
        <Navigation />
        <Notification
          show={showNotification}
          type="success"
          onClose={() => setShowNotification(false)}
          message="Premium updated"
          additionalMessage="Your Profile Premium settings have been updated."
        />
        {accountType !== "premium" && (
          <Alert
            type="warning"
            message="These are Premium features. Please upgrade your account for these to take effect on your public Profile."
          />
        )}
        <form>
          <fieldset>
            <legend className="sr-only">Premium features</legend>
            <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
              <div
                className="text-sm font-semibold leading-6 text-primary-medium dark:text-primary-low"
                aria-hidden="true"
              >
                Premium features
              </div>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <div className="max-w-lg">
                  <p className="text-sm leading-6 text-primary-medium dark:text-primary-low">
                    These are active while you are a Premium member.
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <Toggle
                        text1="Hide Navbar on your Profile"
                        enabled={accountType === "premium" && hideNavbar}
                        setEnabled={() => toggle("hideNavbar")}
                      />
                    </div>
                    <div className="flex items-center gap-x-3">
                      <Toggle
                        text1="Hide Footer on your Profile"
                        enabled={accountType === "premium" && hideFooter}
                        setEnabled={() => toggle("hideFooter")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
        {accountType === "premium" && (
          <p>
            For help with your Premium account settings:{" "}
            <Link href={`${PREMIUM_SUPPORT_URL} (${username})`} target="_blank">
              Contact Support
            </Link>
          </p>
        )}
      </Page>
    </>
  );
}
