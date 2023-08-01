import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { serverEnv } from "@config/schemas/serverSchema";
import DbAdapter from "./db-adapter";
import connectMongo from "@config/mongo";
import { Account, Profile } from "@models/index";
import {
  getAccountByProviderAccountId,
  associateProfileWithAccount,
} from "../account/account";

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
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.username = token.username;

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  events: {
    async signIn({ profile: githubProfile }) {
      // associate LinkFree profile to LinkFree account
      const account = await getAccountByProviderAccountId(githubProfile.id);
      const profile = await Profile.findOne({
        username: githubProfile.username,
      });
      if (profile) {
        await associateProfileWithAccount(account, profile._id);
      }
    },
  },
};

export default NextAuth(authOptions);
