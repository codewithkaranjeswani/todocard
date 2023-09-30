import { TUserAuthed } from "@/app/lib/types";
import { TJwtToken, TUserSigninResponse } from "@/lib/types";
import NextAuth, { Account } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: string;
  }
}

declare module "next-auth" {
  interface User extends TUserAuthed {}
}
