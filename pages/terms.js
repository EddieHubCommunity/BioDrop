import Page from "@components/Page";
import PageHead from "@components/PageHead";

export default function Terms() {
  return (
    <>
      <PageHead
        title="LinkFree Terms and Conditions"
        description="Read the Terms and Conditions of LinkFree"
      />
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Terms and Conditions</h1>
        <div className="bg-primary-low dark:bg-primary-high py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <p className="text-base font-semibold leading-7 text-secondary-medium dark:text-secondary-low ">
                What you need to know
              </p>
              <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-primary-medium dark:text-primary-low-medium lg:max-w-none lg:grid-cols-2">
                <div>
                  <p>
                    By creating your LinkFree Profile, you the user understands
                    and agrees that the LinkFree project and the contributions
                    that you make are public and that a record of the
                    contribution (including all personal information you submit
                    with it) will be maintained indefinitely and may be
                    redistributed consistent with the LinkFree project or the
                    open source license(s) involved.
                  </p>
                  <p className="mt-8"></p>
                </div>
                <div>
                  <p></p>
                  <p className="mt-8"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
