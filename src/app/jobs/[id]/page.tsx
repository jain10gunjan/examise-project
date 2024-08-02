"use client";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import MetaDataJobs from "@/components/MetaDataJobs";
import { useAuth } from "../../../components/context/Authcontext";

interface Job {
  title: string;
  companyName: string;
  type: string;
  slug: string;
  image: string;
  salary: number;
  description: string;
  _id: string;
  id: string;
  searchid: string;
  experience: string;
  sharetext: string;
  createdat: string;
  companyLocation: string;
  category: string;
  requirements: null;
  applyBefore: string;
  link: string;
}

export default function JobByID() {
  const [job, setJob] = useState<Job[] | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  let jobid = useParams<{ id: string }>();
  const { user, signInWithGoogle, signOut } = useAuth();

  useEffect(() => {
    async function fetchData() {
      console.log("working");
      try {
        const res = await fetch(
          `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/jobsdata?_id=${jobid.id}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Job[] = await res.json();
        setJob(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [jobid]);

  const handleCopy = () => {
    const textToCopy = `${job?.sharetext}
Company Name: ${job?.companyName}
Title: ${job?.title}
Type: ${job?.type}
Category: ${job?.category}
Location: ${job?.companyLocation}
Salary: ${job?.salary}
Apply Link: https://examise.in/jobs/${jobid.id}`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Copied The Job Successfully");
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <MetaDataJobs
        seoTitle={job?.sharetext}
        seoDescription={`${job?.title} ${job?.companyName}`}
      />

      <section className="mt-20 text-gray-600 body-font">
        <div className="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
          <div className="relative mt-4 bg-white  shadow-xl shadow-gray-100 w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center  justify-between px-5 py-4 rounded-md">
            <div>
              <span className="font-extrabold text-purple-800 text-sm">
                {job?.companyName}
              </span>
              <h3 className="font-extrabold mt-px">{job?.title}</h3>
              <span className="text-sm mt-px">{job?.category}</span>
              <div className="flex items-center gap-3 mt-2">
                <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                  Full-time
                </span>
                <span className="text-slate-600 text-sm flex gap-1 items-center">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>{" "}
                  {job?.experience}
                </span>
              </div>

              <div
                className="mt-8"
                dangerouslySetInnerHTML={{ __html: job?.description }}
              ></div>
            </div>
            <div className="">
              <div className="absolute top-0 right-0 mb-3 py-4 px-5 flex gap-3">
                {user ? (
                  <Link
                    href={`${job?.link}`}
                    className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm"
                  >
                    Apply Now
                  </Link>
                ) : (
                  <button
                    onClick={() => toast.success("Sign In To Apply")}
                    className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm"
                  >
                    Apply Now
                  </button>
                )}

                <button
                  onClick={handleCopy}
                  className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm"
                >
                  Share
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 grow">
            <div className="relative flex flex-col items-center justify-center sm:py-12"></div>
          </div>
        </div>
      </section>
    </>
  );
}
