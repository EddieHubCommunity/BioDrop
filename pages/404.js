import Image from "next/image";

import Button from "@components/Button";
import PageHead from "@components/PageHead";
import Page from "@components/Page";

export default function Page404() {
  return (
    <>
      <PageHead
        title="LinkFree page not found"
        description="LinkFree page not found 404"
      />
      <Page>
        <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-secondary-high">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary-high dark:text-primary-low sm:text-5xl">
              Page not found
            </h1>
            <p className="m-6 text-base leading-7 text-primary-medium dark:text-primary-medium-low">
              Sorry, we could not find the page you are looking for.
            </p>
            <Image
              src="https://user-images.githubusercontent.com/624760/114314273-eaae0100-9af1-11eb-955a-4039657fe85a.png"
              alt="EddieHub mascot scared pose"
              width={300}
              height={300}
            />
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button href="/" primary={true} aria-label="Back to home">
                Go back home
              </Button>
              <Button href="/docs" aria-label="Read the docs">
                Read the docs
              </Button>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
