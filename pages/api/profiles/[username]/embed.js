import satori from "satori";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { getUserApi } from "./index";
import Profile from "@components/embeds/external/Profile";

const inter = await fs.readFile(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../public", "Inter-Regular.ttf"));
const interBold = await fs.readFile(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../public", "Inter-Bold.ttf"));

export default async function handler(req, res) {
  const { username } = req.query;
  const { profile } = await getUserApi(req, res, username);

  // const person = {
  //   name: "Olabode Lawal-Shittabey",
  //   bio: "Open-source advocate 🥑 community manager 🚀 coder 💻 and app/game developer 🎮",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  //   twitterUrl: "#",
  //   linkedinUrl: "#",
  // }

  const response = await satori(
    <Profile data={profile} />,
    {
      width: 350,
      height: 550,
      fonts: [
        {
          name: "Inter",
          data: inter,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: interBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );

  res.setHeader("Content-Type", "image/svg+xml");
  res.status(200).send(response);
}