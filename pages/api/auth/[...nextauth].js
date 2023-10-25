import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { ObjectId } from "bson";

import { serverEnv } from "@config/schemas/serverSchema";
import stripe from "@config/stripe";
import DbAdapter from "./db-adapter";
import connectMongo from "@config/mongo";
import { Account, Link, Profile, User } from "@models/index";
import {
  getAccountByProviderAccountId,
  associateProfileWithAccount,
} from "../account/account";
import logger from "@config/logger";

export const authOptions = {
  adapter: DbAdapter(connectMongo),
  providers: [
    GithubProvider({
      clientId: serverEnv.GITHUB_ID,
      clientSecret: serverEnv.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, profile: githubProfile }) {
      await connectMongo();
      await Account.findOneAndUpdate(
        { userId: user._id },
        {
          github: {
            company: githubProfile.company,
            publicRepos: githubProfile.public_repos,
            followers: githubProfile.followers,
            following: githubProfile.following,
          },
        },
        { upsert: true },
      );
      return true;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/account/onboarding`;
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.id;
        token.username = profile.login;
      }
      return token;
    },
    async session({ session, token }) {
      await connectMongo();
      // Send properties to the client, like an access_token and user id from a provider.
      // note: `sub` is the user id
      session.accessToken = token.accessToken;
      session.user.id = token.sub;
      session.username = token.username;
      const user = await User.findOne({ _id: token.sub });
      if (user) {
        session.accountType = user.type;
        session.stripeCustomerId = user.stripeCustomerId;
      } else {
        session.accountType = "free";
        session.stripeCustomerId = null;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  events: {
    async signIn({ profile: githubProfile }) {
      await connectMongo();
      const username = githubProfile.username;
      const defaultLink = (profileId) => ({
        username,
        name: "GitHub",
        url: `https://github.com/${username}`,
        icon: "FaGithub",
        isEnabled: true,
        isPinned: true,
        animation: "glow",
        profile: new ObjectId(profileId),
      });

      // associate BioDrop profile to account
      const account = await getAccountByProviderAccountId(githubProfile.id);
      const user = await User.findOne({ _id: account.userId });

      // create basic profile if it doesn't exist
      let profile = await Profile.findOne({ username });
      if (!profile) {
        logger.info("profile not found for: ", username);
        profile = await Profile.findOneAndUpdate(
          {
            username,
          },
          {
            source: "database",
            name: githubProfile.name,
            bio: "Have a look at my BioDrop Profile!",
            user: account.userId,
          },
          {
            new: true,
            upsert: true,
          },
        );
        const link = await Link.create([defaultLink(profile._id)], {
          new: true,
        });
        profile = await Profile.findOneAndUpdate(
          { username },
          {
            $push: { links: new ObjectId(link[0]._id) },
          },
          { new: true },
        );
      }

      // associate User to Profile
      await associateProfileWithAccount(account, profile._id);

      // Create a stripe customer for the user with their email address
      if (!user.stripeCustomerId) {
        logger.info("user stripe customer id not found for: ", user.email);

        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
          metadata: {
            userId: account.userId,
            github: username,
          },
        });

        await User.findOneAndUpdate(
          { _id: new ObjectId(account.userId) },
          { stripeCustomerId: customer.id, type: "free" },
        );
      }

      // add github link to profile if no links exist
      if (profile.links.length === 0) {
        logger.info("no links found for: ", username);
        const link = await Link.create([defaultLink(profile._id)], {
          new: true,
        });
        await Profile.findOneAndUpdate(
          { username },
          {
            $push: { links: new ObjectId(link[0]._id) },
          },
        );
      }
    },
  },
};

export default NextAuth(authOptions);
