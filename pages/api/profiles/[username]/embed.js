import satori from "satori";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { getUserApi } from "./index";
import Profile from "@components/embeds/external/Profile";
import { loadEmoji, getIconCode } from "@services/utils/twemoji";

const inter = await fs.readFile(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../public", "Inter-Regular.ttf"));
const interBold = await fs.readFile(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../public", "Inter-Bold.ttf"));

export default async function handler(req, res) {
  const { username } = req.query;
  const { profile } = await getUserApi(req, res, username);

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
      loadAdditionalAsset: async (code, segment) => {
        if (code === 'emoji') {
          return (`data:image/svg+xml;base64,${btoa(await loadEmoji("twemoji", getIconCode(segment)))}`)
        }
      }
    },
  );

  res.setHeader("Content-Type", "image/svg+xml");
  res.status(200).send(response);
}