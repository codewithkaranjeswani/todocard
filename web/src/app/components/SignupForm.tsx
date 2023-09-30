"use client";
import Link from "next/link";
import axios from "axios";
import { Role, TUserSignup, UserCreate, ZUserSignup } from "@/app/lib/types";
import { env } from "@/env.mjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { toastifyError } from "@/app/lib/error";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TUserSignup>({
    resolver: zodResolver(ZUserSignup),
  });
  async function onSubmit(data: TUserSignup) {
    const user: UserCreate = {
      username: data.username,
      password: data.password,
    };
    try {
      const res = await axios.post(
        `${env.NEXT_PUBLIC_API_URL}/auth/signup`,
        user,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status !== 200) {
        toast.error(`error in signup, res.status = ${res.status}`);
        return;
      } else {
        toast.success(`signup successful, now signin!`);
        router.push("/auth/signin");
      }
    } catch (error: unknown) {
      toastifyError(error);
      return;
    }
    reset();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-y-8 p-10"
      >
        <h1 className="flex justify-center text-3xl font-bold leading-tight tracking-tight">
          Sign Up
        </h1>
        <div className="flex gap-x-4">
          <div className="relative flex w-1/2 flex-col gap-y-10">
            <label>
              First Name <span className="text-red-500"> *</span>
            </label>
            {errors.firstname && (
              <p className="absolute text-red-500">
                {errors.firstname.message}
              </p>
            )}
            <input
              {...register("firstname")}
              type="firstname"
              placeholder="firstname"
              className="block w-full rounded-lg border border-blue-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              // className="text-xl dark:bg-gray-700"
            />
          </div>
          <div className="relative flex w-1/2 flex-col gap-y-10">
            <label>
              Last Name <span className="text-red-500"> *</span>
            </label>
            {errors.lastname && (
              <p className="absolute text-red-500">{errors.lastname.message}</p>
            )}
            <input
              {...register("lastname")}
              type="lastname"
              placeholder="lastname"
              className="block w-full rounded-lg border border-blue-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              // className="text-xl dark:bg-gray-700"
            />
          </div>
        </div>
        <div className="relative">
          <label>
            Email <span className="text-red-500"> *</span>
          </label>
          {errors.email && (
            <p className="absolute text-red-500">{errors.email.message}</p>
          )}
        </div>
        <input
          {...register("email")}
          type="email"
          placeholder="email"
          className="block w-full rounded-lg border border-blue-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          // className="text-xl dark:bg-gray-700"
        />
        <div className="relative">
          <label>
            Username <span className="text-red-500"> *</span>
          </label>
          {errors.username && (
            <p className="absolute text-red-500">{errors.username.message}</p>
          )}
        </div>
        <input
          {...register("username")}
          type="text"
          placeholder="username"
          className="block w-full rounded-lg border border-blue-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          // className="text-xl dark:bg-gray-700"
        />
        <div className="relative">
          <label>
            Password <span className="text-red-500"> *</span>
          </label>
          {errors.password && (
            <p className="absolute text-red-500">{errors.password.message}</p>
          )}
        </div>
        <input
          {...register("password")}
          type="password"
          placeholder="********************"
          className="block w-full rounded-lg border border-blue-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          // className="text-xl dark:bg-gray-700"
        />
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 disabled:dark:bg-gray-500"
        >
          Sign Up
        </button>
        <p className="text-base font-light text-gray-500 dark:text-gray-400">
          Already have your account?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-gray-600 hover:underline dark:text-gray-500"
          >
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
}
