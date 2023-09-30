import Link from "next/link";

export default function Home() {
  return (
    <section className="container mx-auto">
      <div className="flex flex-col items-center py-10 gap-y-4">
        <div className="text-3xl flex">TodoCard</div>
        <div>For your Todo Tasks, Always!</div>
        <div>
          To create your TodoCard{" "}
          <Link className="underline" href="/auth/signin">
            Signin
          </Link>
        </div>
      </div>
    </section>
  );
}
