import NextAuth, { Account, Session, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  Role,
  TJwtToken,
  TUserAuthed,
  TUserSigninResponse,
  UserPass,
  ZJwtToken,
  ZUserSigninResponse,
} from "@/app/lib/types";
import { env } from "@/env.mjs";
import axios from "axios";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // console.log("in authorize : credentials");
        // console.log(credentials);
        try {
          const userCred: UserPass = {
            username: credentials.username,
            password: credentials.password,
          };
          const res = await axios.post(
            `${env.NEXT_PUBLIC_API_URL}/auth/login`,
            userCred,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.status !== 200) {
            // console.log(`signin failed with res.status = ${res.status}`);
            throw new Error("Invalid Credentials");
          }
          // console.log(`signin succeeded`);
          const parsedResponse = ZUserSigninResponse.safeParse(res.data);
          if (!parsedResponse.success) {
            throw new Error(
              `Signin response parsing error : ${parsedResponse.error}`
            );
          }
          const signinResponse: TUserSigninResponse = parsedResponse.data;
          if (signinResponse.message !== "Logged in successfully") {
            // console.log(
            // `signin succeeded, expected token type bearer, got ${signinResponse.token_type}`
            // );
            throw new Error("Invalid Credentials");
          }
          const payload = jwt.decode(signinResponse.token);
          const parsedTokenPayload = ZJwtToken.safeParse(payload);
          if (!parsedTokenPayload.success) {
            throw new Error(
              `Failed to parse Jwt Token : ${parsedTokenPayload.error}`
            );
          }
          const jwtPayload: TJwtToken = parsedTokenPayload.data;
          const user: TUserAuthed = {
            username: userCred.username,
            token: signinResponse.token,
            id: jwtPayload.id,
            name: "dummy",
            email: "dummy@gmail.com",
            role: Role.USER,
          }; // user should have id, email, name
          // console.log(`user = ${JSON.stringify(user)}`);
          return user;
        } catch (err: unknown) {
          console.log(`got err = ${err}`);
          throw new Error(`got err = ${err}`);
        }
      },
    }),
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  // // after this much idle time, token will expire
  // session: {
  //   strategy: "jwt",
  //   maxAge: env.NEXT_TOKEN_TIMEOUT,
  // },
  // // after this much idle time, token will expire
  // jwt: {
  //   maxAge: env.NEXT_TOKEN_TIMEOUT,
  // },
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: User;
      account: Account | null;
    }): Promise<JWT> {
      // Persist the OAuth access_token to the token right after signin
      // console.log(
      // `in callbacks jwt : token = ${JSON.stringify(
      // token
      // )}, user = ${JSON.stringify(user)}, account = ${JSON.stringify(
      //   account
      // )}`
      // );
      if (account) {
        token.accessToken = user.token;
        token.role = user.role;
      }
      // console.log(
      // `after callbacks jwt : token = ${JSON.stringify(
      //   token
      // )}, user = ${JSON.stringify(user)}, account = ${JSON.stringify(
      //   account
      // )}`
      // );
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }): Promise<Session> {
      // Send properties to the client, like an access_token from a provider.
      // console.log(
      //   `in callbacks session : session = ${JSON.stringify(
      //     session
      //   )}, token = ${JSON.stringify(token)}, user = ${JSON.stringify(user)}`
      // );
      session.accessToken = token.accessToken;
      session.role = token.role;
      // console.log(
      //   `after callbacks session : session = ${JSON.stringify(
      //     session
      //   )}, token = ${JSON.stringify(token)}, user = ${JSON.stringify(user)}`
      // );
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
