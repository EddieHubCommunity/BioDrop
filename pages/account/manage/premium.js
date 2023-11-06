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
import Input from "@components/form/Input";
import Button from "@components/Button";

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
  const [showNotification, setShowNotification] = useState({
    show: false,
    type: "",
    message: "",
    additionalMessage: "",
  });
  const [hideNavbar, setHideNavbar] = useState(settings.hideNavbar || false);
  const [hideFooter, setHideFooter] = useState(settings.hideFooter || false);
  const [vercel, setVercel] = useState(settings.vercel);
  const [domain, setDomain] = useState(
    settings.domain?.replaceAll("|", ".") || "",
  ); // TODO: use getter/setter instead
  const [enableForm] = useState(accountType === "premium" ? true : false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/api/account/manage/settings`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hideNavbar, hideFooter, domain }),
    });
    const updatedSettings = await res.json();

    if (updatedSettings.message) {
      return setShowNotification({
        show: true,
        type: "error",
        message: "Profile settings update failed",
        additionalMessage: updatedSettings.message,
      });
    }

    setDomain(updatedSettings.domain.replaceAll("|", ".") || "");
    setVercel(updatedSettings.vercel);

    return setShowNotification({
      show: true,
      type: "success",
      message: "Profile updated",
      additionalMessage: "Your profile settings has been updated successfully",
    });
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
          show={showNotification.show}
          type={showNotification.type}
          onClose={() =>
            setShowNotification({ ...showNotification, show: false })
          }
          message={showNotification.message}
          additionalMessage={showNotification.additionalMessage}
        />

        {accountType !== "premium" && (
          <Alert
            type="warning"
            message="These are Premium features. Please upgrade your account for these to take effect on your public Profile."
          />
        )}
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className="sr-only">Premium features</legend>
            <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
              <div>
                <p
                  className="font-semibold leading-6 text-primary-medium dark:text-primary-low"
                  aria-hidden="true"
                >
                  Premium features
                </p>
                {accountType === "premium" && (
                  <p
                    className="text-sm leading-6 text-primary-medium dark:text-primary-low mt-4"
                    aria-hidden="true"
                  >
                    For help with your Premium account settings:
                    <br />
                    <Link
                      href={`${PREMIUM_SUPPORT_URL} (${username})`}
                      target="_blank"
                    >
                      Contact Support
                    </Link>
                  </p>
                )}
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
                        enabled={enableForm && hideNavbar}
                        setEnabled={setHideNavbar}
                      />
                    </div>
                    <div className="flex items-center gap-x-3">
                      <Toggle
                        text1="Hide Footer on your Profile"
                        enabled={enableForm && hideFooter}
                        setEnabled={setHideFooter}
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-4">
                      <div className="mt-1">
                        <Input
                          name="domain"
                          label={`Domain (for example: ${username}.io)`}
                          value={domain}
                          disabled={!enableForm}
                          onChange={(e) => {
                            setVercel({});
                            setDomain(
                              e.target.value.replace(
                                /http:\/\/|https:\/\//,
                                "",
                              ),
                            );
                          }}
                        />
                      </div>
                      <p className="text-sm text-primary-medium-low dark:text-primary-low-high">
                        Clear and save to remove domain.{" "}
                        <Link href="/docs/premium/domain">
                          Learn more about custom domains
                        </Link>
                      </p>
                      {vercel?.misconfigured !== undefined &&
                        domain?.length > 0 && (
                          <p className="text-sm text-primary-medium-low dark:text-primary-low-high">
                            {vercel.misconfigured ? (
                              <Alert type="error" message="DNS misconfigured" />
                            ) : (
                              <Alert
                                type="success"
                                message="DNS correctly configured"
                              />
                            )}
                          </p>
                        )}
                    </div>
                    <div className="mt-10 border-t border-primary-low-medium/30 pt-6 sm:flex sm:items-center sm:justify-between">
                      <Button primary={true} disabled={!enableForm}>
                        SAVE
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </Page>
    </>
  );
}
