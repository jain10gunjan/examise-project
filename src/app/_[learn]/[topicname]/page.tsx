"use client";

import React from "react";
import Sidebar from "@/components/calculators/sidebarrelated/Sidebar";
import { useParams } from "next/navigation";
import { promptData } from "../../../lib/prompts.js";

export default function Page() {
  const { topicname } = useParams<{ topicname: string }>();
  const topic = topicname
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  const questionData = promptData.filter((item) => item.topic === topicname);

  return (
    <div>
      <div className="mt-12 max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">
          <div className="lg:col-span-2">
            <div className="py-8 lg:pe-8">
              <div className="space-y-5 lg:space-y-8">
                <h2 className="text-3xl font-bold lg:text-5xl dark:text-white">
                  Practice Types Of Questions For Topic: {topic}
                </h2>

                <div className="space-y-3">
                  <div className="py-12 mx-auto divide-y divide-gray-200 dark:divide-neutral-700">
                    {questionData?.map((data) => (
                      <div key={data.id} className="py-8 first:pt-0 last:pb-0">
                        <a
                          href={`/learn/${topicname}/${data.id}`}
                          className="flex gap-x-5"
                        >
                          <svg
                            className="shrink-0 mt-1 size-6 text-gray-500 dark:text-neutral-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <path d="M12 17h.01" />
                          </svg>

                          <div className="grow">
                            <h3 className="md:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                              {data.question}
                            </h3>
                            <p className="mt-1 text-gray-500 dark:text-neutral-500">
                              Practice More Of This Type Of Question Click Here.
                            </p>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Sidebar />
        </div>
      </div>
    </div>
  );
}
