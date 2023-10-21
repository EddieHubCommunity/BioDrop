import { ImageResponse } from "@vercel/og";
// import Profile from "@components/embeds/Profile";
// import { getUserApi } from "./profiles/[username]/index";
 
export const config = {
  runtime: "edge",
};
 
export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  // const theme = searchParams.get("theme") || "default";

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex"
        }}
      >
        👋 Hello { username } 你好 नमस्ते こんにちは สวัสดีค่ะ 안녕 добрий день Hallá
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}