import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Page from "@components/Page";
import PageHead from "@components/PageHead";
import Link from "@components/Link";

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

  return {
    props: {},
  };
}

export default function NoProfile() {
  return (
    <>
      <PageHead
        title="Profile does not exist"
        description="You must create a profile first"
      />

      <Page>
        <div className="bg-white">
          <div className="py-24 px-6 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-4xl font-bold tracking-tight text-primary-high">
                Your LinkFree Profile does not exist yet
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-medium">
                Please follow the QuickStart guide to create your Profile
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="https://linkfree.eddiehub.io/eddiejaoude"
                  className="rounded-md bg-secondary-high px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-secondary-low focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-high"
                >
                  Example
                </Link>
                <Link
                  href="https://linkfree.eddiehub.io/docs/quickstart"
                  className="text-base font-semibold leading-7 text-primary-high"
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
