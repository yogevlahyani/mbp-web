import { NextApiResponse } from "next";
import NextAuth, { CallbacksOptions, User, NextAuthOptions } from "next-auth";
import { NextApiRequest } from "next-auth/internals/utils";
import Providers from "next-auth/providers";
import { FitnessKitService } from "../../../src/services/fitnesskit.service";

const fitnesskitService = new FitnessKitService();

const providers = [
  Providers.Credentials({
    name: "credentials",
    authorize: async ({ email, password }): Promise<User | null> => {
      try {
        const access_token = await fitnesskitService.signIn(email, password);

        return { access_token };
      } catch (e) {
        throw new Error(e.response?.data?.message || 'Server is down, please try again later.');
      }
    },
  }),
];

const callbacks: CallbacksOptions = {
  async jwt(token: any, user: any) {
    if (user) {
      token.accessToken = user.access_token;
    }

    return token;
  },

  async session(session: any, token: any) {
    session.accessToken = token.accessToken;

    return session;
  },
};

const options: NextAuthOptions = {
  providers,
  callbacks,
};

export default NextAuth(options);
