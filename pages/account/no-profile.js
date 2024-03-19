import { clientEnv } from "@config/schemas/clientSchema";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import Link from "@components/Link";
import { PROJECT_NAME } from "@constants/index";

export async function getServerSideProps() {
  return {
    props: { BASE_URL: clientEnv.NEXT_PUBLIC_BASE_URL },
  };
}

export default function NoProfile({ BASE_URL }) {
  return (
    <>
      <PageHead
        title="Profile does not exist"
        description="You must create a profile first"
      />

      <Page>
        <div className="bg-white dark:bg-primary-high">
          <div className="py-24 px-6 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-4xl font-bold tracking-tight text-primary-high dark:text-primary-low">
                Your {PROJECT_NAME} Profile does not exist yet
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-medium dark:text-primary-medium-low">
                Please follow the QuickStart guide to create your Profile or
                click on the Forms button to create your Profile
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href={`${BASE_URL}/account/manage/profile`}
                  className="rounded-md bg-secondary-high px-3.5 py-1.5 text-base font-semibold leading-7 text-primary-low dark:text-primary-low shadow-sm hover:bg-secondary-low focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-high"
                >
                  Go to Forms
                </Link>
                <Link
                  href="https://biodrop.io/docs/quickstart-forms"
                  className="text-base font-semibold leading-7 text-primary-high dark:text-primary-low"
                >
                  QuickStart Guide <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
