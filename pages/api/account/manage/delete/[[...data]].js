import { authOptions } from "../../../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import connectMongo from "@config/mongo";
//import logger from "@config/logger";
import { Link } from "@models/index";
import fs from 'fs';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const username = session.username;

  if (!["DELETE"].includes(req.method)) {
    return res.status(400).json({
      error: "Invalid request: DELETE required",
    });
  }

  const { data } = req.query;
  const context = { req, res };

  let link = {};
  
  if (req.method === "DELETE") {
    link = await deleteLinkApi(context, username, data[0]);
  }
  
  if (link.error) {
    return res.status(400).json({ message: link.error });
  }

  return res.status(200).json(link);
}


  export async function deleteLinkApi(context, username) {
    await connectMongo();
   // const log = logger.child({ username });
  
    // delete link
    try {
      await Link.deleteMany({ username: username });
    } catch (e) {
      const error = `failed to delete links from profile for username: ${username}`;
      //log.error(e, error);
      return { error };
    }
    checkJsonProfile(username)
    return JSON.parse(JSON.stringify({}));
  }

  //check for json version, delete if exists
  async function checkJsonProfile(username){
    if(fs.existsSync(`./data/${username}.json`)){
    try {
      
        console.log("found file" + username)
        fs.unlinkSync(`./data/${username}.json`)
    
    } catch (e) {
      const error = `failed to delete json profile for username: ${username}`;
      //log.error(e, error);
      return { error };
    }

    return JSON.parse(JSON.stringify({}));
  }else{
    console.log(`no json profile`)
    return JSON.parse(JSON.stringify({}));
  }
  }