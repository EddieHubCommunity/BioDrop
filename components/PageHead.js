import Head from "next/head";

export default function PageHead({
  title,
  description,
  ogTitle,
  ogUrl,
  ogImage,
  ogType,
}) {
  if (!title) {
    title = "LinkFree - connect to your audience with a single link";
  }

  if (!description) {
    description =
      "Showcase the content you create and your projects in one place. Make it easier for people to find, follow and subscribe. Open Source alternative to LinkTree.";
  }

  if (!ogTitle) {
    ogTitle = "LinkFree - connect to your audience with a single link";
  }
  if (!ogUrl) {
    ogUrl = "http://linkfree.eddiehub.io";
  }
  if (!ogImage) {
    ogImage = "/logo512.png";
  }
  if (!ogType) {
    ogType = "image/png";
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:title" content={ogTitle} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
    </Head>
  );
}
