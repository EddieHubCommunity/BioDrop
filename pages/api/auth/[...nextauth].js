import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { ObjectId } from "bson";

import { serverEnv } from "@config/schemas/serverSchema";
import stripe from "@config/stripe";
import DbAdapter from "./db-adapter";
import connectMongo from "@config/mongo";
import { Account, Profile, User } from "@models/index";
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
        { upsert: true }
      );
      return true;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/account/statistics`;
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
      // associate BioDrop profile to account
      const account = await getAccountByProviderAccountId(githubProfile.id);
      const user = await User.findOne({ _id: account.userId });

      // associate User to Profile for premium flag
      const profile = await Profile.findOneAndUpdate(
        {
          username: githubProfile.username,
        },
        {
          user: account.userId,
        },
        {
          new: true,
        }
      );
      if (profile) {
        await associateProfileWithAccount(account, profile._id);
      }

      // Create a stripe customer for the user with their email address
      if (!user.stripeCustomerId) {
        logger.info("user stripe customer id not found for: ", user.email);

        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
          metadata: {
            userId: account.userId,
            github: githubProfile.username,
          },
        });

        await User.findOneAndUpdate(
          { _id: new ObjectId(account.userId) },
          { stripeCustomerId: customer.id, type: "free" }
        );
      }
    },
  },
};

export default NextAuth(authOptions);
