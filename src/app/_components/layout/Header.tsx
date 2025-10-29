"use client";

import Link from "next/link";
import FontsNinjaSvg from "@/app/_assets/FontsNinjaSvg";
import { toggleTheme } from "@/app/_components/theme/theme.utils";

export const Header = () => (
  <header className="pt-12 flex flex-row justify-between items-center">
    <Link href="/" aria-label="return to home page">
      <FontsNinjaSvg />
    </Link>

    <button
      type="button"
      className="w-[150px] py-4 px-2 bg-coral text-gray-25 rounded-2xl first-letter:uppercase"
      onClick={toggleTheme}
    >
      switch theme
    </button>
  </header>
);
