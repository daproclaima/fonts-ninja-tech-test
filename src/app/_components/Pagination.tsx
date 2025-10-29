"use client";

import Link from "next/link";
import { ArrowLeftSvg } from "@/app/_assets/ArrowLeftSvg";
import { ArrowRightSvg } from "@/app/_assets/ArrowRightSvg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-4 mt-12">
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? "/" : `/?page=${currentPage - 1}`}
          className="text-neutral-600 dark:text-gray-10 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeftSvg />
        </Link>
      )}
      {currentPage === 1 && (
        <span className="text-neutral-400 dark:text-gray-10 opacity-50">
          <ArrowLeftSvg />
        </span>
      )}

      <div className="flex gap-3 items-center">
        {pages.map((page) => (
          <Link
            key={page}
            href={page === 1 ? "/" : `/?page=${page}`}
            className={`transition-all ${
              currentPage === page
                ? "w-8 h-8 py-6 px-6 flex items-center justify-center bg-red-500 text-white rounded-2xl font-semibold"
                : "w-8 h-8 py-6 px-6 flex items-center justify-center text-neutral-600 dark:text-gray-10 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages && (
        <Link
          href={`/?page=${currentPage + 1}`}
          className="text-neutral-600 dark:text-gray-10 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowRightSvg />
        </Link>
      )}
      {currentPage === totalPages && (
        <span className="text-neutral-400 dark:text-gray-10 opacity-50">
          <ArrowRightSvg />
        </span>
      )}
    </div>
  );
}
