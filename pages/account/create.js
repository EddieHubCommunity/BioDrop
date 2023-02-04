import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Page from "../../components/Page";
import PageHead from "../../components/PageHead";

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

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

export default function NotExist() {
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
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                Your LinkFree Profile does not exist yet
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-700">
                Please follow the QuickStart guide to create your Profile
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="https://linkfree.eddiehub.io/eddiejaoude"
                  className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Example
                </a>
                <a
                  href="https://linkfree.eddiehub.io/docs/quickstart"
                  className="text-base font-semibold leading-7 text-gray-900"
                >
                  QuickStart Guide <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
