"use client";

import Image from "next/image";
import Link from "next/link";
import { toggleTheme } from "@/app/_components/theme/theme.utils";

export const Header = () => (
  <header className="px-14 pt-12 flex flex-row justify-between">
    <Link href="/" aria-label="return to home page">
      <Image
        className="dark:invert"
        src="/fonts-ninja.svg"
        alt="fonts ninja logo"
        width={24}
        height={26}
        priority
      />
    </Link>

    <button
      type="button"
      className="w-[150px] py-4 px-2 bg-coral rounded-2xl first-letter:uppercase"
      onClick={toggleTheme}
    >
      switch theme
    </button>
  </header>
);
