import Page from "../../components/Page";
import PageHead from "../../components/PageHead";

export async function getServerSideProps(context) {
  let data = {};
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/statistics`
  //     );
  //     data = await res.json();
  //   } catch (e) {
  //     console.log("ERROR get user's account statistics", e);
  //   }

  return {
    props: { data },
  };
}

export default function Search({ data }) {
  return (
    <>
      <PageHead
        title="LinkFree Statistics"
        description="Private statistics for your account"
      />

      <Page>
        <h1 className="text-4xl mb-4 font-bold">Your Statistics</h1>
      </Page>
    </>
  );
}
