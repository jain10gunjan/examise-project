"use client";

import React from "react";
import toast, { Toaster } from "react-hot-toast";

const Share_print = () => {
  return (
    <>
      <div className="flex items-center gap-x-5">
        <button className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:text-neutral-200">
          Get PDF
        </button>
        <button className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:text-neutral-200">
          Share
        </button>
      </div>
      <Toaster />
    </>
  );
};

export default Share_print;
