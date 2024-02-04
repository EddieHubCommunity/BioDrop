import Head from "next/head";

export default function PageHead(props) {
  const {
    title = "BioDrop - connect to your audience with a single link",
    description = "Showcase the content you create and your projects in one place. Make it easier for people to find, follow and subscribe.",
    ogTitle = "BioDrop - connect to your audience with a single link",
    ogDescription = "Showcase the content you create and your projects in one place. Make it easier for people to find, follow and subscribe.",
    ogUrl = "http://biodrop.io",
    ogImage = "/logo512.png",
    ogType = "image/png",
  } = props;

  const children = props.children;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <link rel="manifest" href="/manifest.json" />

      {children}
    </Head>
  );
}
