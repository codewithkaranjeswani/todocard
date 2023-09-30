import SigninForm from "@/app/components/SigninForm";

export default function SigninPage() {
  return (
    <section className="container sm:mx-0 md:mx-auto">
      <div className="mx-auto flex w-full flex-col items-center rounded-lg px-6 py-8 shadow-2xl dark:border dark:border-neutral-700 dark:bg-neutral-800 sm:max-w-md md:mt-0 lg:py-0 xl:p-0">
        <SigninForm />
      </div>
    </section>
  );
}
