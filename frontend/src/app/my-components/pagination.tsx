import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number | null;
  onPageChange: (page: number) => void;
}

export function Pagination({
                             currentPage,
                             totalPages,
                             onPageChange,
                           }: PaginationProps) {
  const getClassName = (isActive: boolean) =>
    `relative block rounded-full px-3 py-1.5 text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b39977] ${
      isActive
        ? "bg-[#342519] text-[#ede6d9] font-medium dark:bg-slate-900 dark:text-primary-500"
        : "bg-transparent text-surface hover:bg-[#b39977] hover:text-white"
    }`;

  if (totalPages == null) return null;

  return (
    <nav
      aria-label="Page navigation example"
      className="flex justify-center pt-2 mt-2"
    >
      <ul className="list-style-none flex gap-2">
        <li>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`relative block rounded-full bg-transparent px-3 py-1.5 text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b39977] ${
              currentPage === 1
                ? "pointer-events-none text-surface/50 bg-gray-100 cursor-not-allowed"
                : "text-surface hover:bg-[#b39977] hover:text-white"
            }`}
          >
            Prev
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index + 1}
            aria-current={currentPage === index + 1 ? "page" : undefined}
          >
            <button
              onClick={() => onPageChange(index + 1)}
              className={getClassName(currentPage === index + 1)}
            >
              {index + 1}
              {currentPage === index + 1 && (
                <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                  (current)
                </span>
              )}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={`relative block rounded-full bg-transparent px-3 py-1.5 text-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b39977] ${
              currentPage === totalPages
                ? "pointer-events-none text-surface/50 bg-gray-100 cursor-not-allowed"
                : "text-surface hover:bg-[#b39977] hover:text-white"
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
