"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeSwitcher from "./Themeswitcher";

function Navbar() {
  const [navbar, setNavbar] = useState(false);
  // const [dropdown, setDropdown] = useState(false);

  return (
    <header className="container mx-auto border-b px-4 sm:px-6">
      <div className="flex flex-wrap items-center justify-between">
        <div className="py-3 hover:cursor-pointer md:block">
          <Link href="/">
            <h2 className="text-2xl text-neutral-900 hover:text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-300">
              TodoCards
            </h2>
          </Link>
        </div>

        <div className="flex gap-x-2">
          <div>
            <Link
              href="/"
              className="flex h-full items-center text-neutral-900 hover:text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-300"
              onClick={() => setNavbar((nb) => !nb)}
            >
              Sign In
            </Link>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
