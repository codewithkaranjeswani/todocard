import { z } from "zod";

export const Role = { ADMIN: "Admin", USER: "User" } as const;
export const ZRole = z.nativeEnum(Role);
export type TRole = z.infer<typeof ZRole>;

export type UserPass = {
  username: string;
  password: string;
};

export type UserCreate = {
  username: string;
  password: string;
};

export const ZUserSigninForm = z.object({
  username: z.string().min(1, "Username must have atleast 1 chars").max(50),
  password: z.string().min(4, "Password must have atleast 4 chars").max(50),
});

export type TUserSigninForm = z.infer<typeof ZUserSigninForm>;

export const ZUserSignup = z.object({
  firstname: z
    .string()
    // .min(1, "First Name must have atleast 1 char")
    .max(50, "First Name shouln't exceed 50 chars"),
  lastname: z
    .string()
    // .min(1, "Last Name must have atleast 1 char")
    .max(50, "Last Name shouln't exceed 50 chars"),
  email: z.string().min(1, "Email must have atleast 1 chars"),
  username: z.string().min(1, "Username must have atleast 1 chars").max(50),
  password: z.string().min(4, "Password must have atleast 4 chars").max(50),
  // role: ZRole,
});

export type TUserSignup = z.infer<typeof ZUserSignup>;

export const ZUserSigninResponse = z.object({
  message: z.string(),
  token: z.string(),
});

export type TUserSigninResponse = z.infer<typeof ZUserSigninResponse>;

export const ZJwtToken = z.object({
  id: z.string(),
});

export type TJwtToken = z.infer<typeof ZJwtToken>;

export type TUserAuthed = {
  username: string;
  token: string;
  id: string;
  name: string;
  email: string;
  role: string;
};
