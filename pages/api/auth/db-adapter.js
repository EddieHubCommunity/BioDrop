import { User, Account, Session, VerificationToken } from "@models/index";

/** @return { import("next-auth/adapters").Adapter } */
export default function DbAdapter(client) {
  return {
    async createUser(data) {
      await client();
      const user = await User.create(data);
      return user;
    },
    async getUser(id) {
      await client();
      const user = await User.findById(id);
      return user;
    },
    async getUserByEmail(email) {
      await client();
      const user = await User.findOne({ email });
      return user;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      await client();
      const account = await Account.findOne({ providerAccountId, provider });
      if (!account) {
        return null;
      }

      const user = await await User.findById(account.userId);
      return user;
    },
    async updateUser(data) {
      await client();
      const { id, ...restData } = data;
      const user = await User.findByIdAndUpdate(id, restData, {
        new: true,
        runValidators: true,
        returnDocument: "after",
      });

      return user;
    },
    async deleteUser(userId) {
      await client();
      const user = await User.findByIdAndDelete(userId);
      return user;
    },
    async linkAccount(data) {
      await client();
      const account = await Account.create(data);
      return account;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      await client();
      const account = await Account.findOneAndDelete({
        providerAccountId,
        provider,
      });

      if (account) {
        return account;
      }
    },
    async createSession(data) {
      await client();
      const session = await Session.create(data);
      return session;
    },
    async getSessionAndUser(sessionToken) {
      await client();
      const session = await Session.findOne({ sessionToken });
      if (!session) {
        return null;
      }

      const user = await await User.findById(session.userId);
      if (!user) {
        return null;
      }

      return { user, session };
    },
    async updateSession(data) {
      await client();
      const { id, ...restData } = data;
      const session = await Session.findByIdAndUpdate(id, restData, {
        new: true,
        runValidators: true,
      });
      return session;
    },
    async deleteSession(sessionToken) {
      await client();
      const session = await Session.findOneAndDelete({ sessionToken });
      return session;
    },
    async createVerificationToken(data) {
      await client();
      const verificationToken = await VerificationToken.create(data);
      return verificationToken;
    },
    async useVerificationToken({ identifier, token }) {
      await client();
      const verificationToken = await VerificationToken.findOne({
        identifier,
        token,
      });
      return verificationToken;
    },
  };
}
