"use client";
import { TUserSigninForm, UserPass, ZUserSigninForm } from "@/app/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function SigninForm() {
  // const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    // getValues,
  } = useForm<TUserSigninForm>({
    resolver: zodResolver(ZUserSigninForm),
  });

  async function onSubmit(data: TUserSigninForm) {
    const user: UserPass = { username: data.username, password: data.password };
    const res = await signIn("credentials", {
      ...user,
      redirect: false,
    });
    if (!res) {
      toast.error(`signin response undefined`);
      return;
    }
    if (res.status !== 200) {
      toast.error(
        `error in signin, res.status = ${res.status}, res.error = ${res.error}`
      );
      return;
    } else {
      toast.success(`signin successful!`);
    }
    reset();
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-10 p-10"
      >
        <h1 className="flex justify-center px-24 text-3xl font-bold leading-tight">
          Sign In
        </h1>
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
        />
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Sign In
        </button>
        <p className="text-base font-light text-gray-500 dark:text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-gray-600 hover:underline dark:text-gray-500"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </>
  );
}
