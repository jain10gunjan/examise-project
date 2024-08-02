"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Question() {
  interface Question {
    _id: string;
    topic: string;
    difficulty: string;
    question: string;
    options: {
      A: string;
      B: string;
      C: string;
      D: string;
    };
    correct_option: string;
    solution: string;
  }

  interface ApiResponse {
    data: Question[];
    total: number;
    pagenumber: number;
    limit: number;
  }

  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Question | null>(null);
  const [similarData, setSimilarData] = useState<Question[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/aptitudeData?_id=${id}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data: ApiResponse = await res.json();
        const res2 = await fetch(
          `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/aptitudeData?topicwise=${data?.data[0]?.topic}`
        );
        const data2: ApiResponse = await res2.json();

        setData(data?.data[0]);
        setSimilarData(data2?.data);
      } catch (error: any) {
        console.error(error.message);
      }
    }

    fetchData();
  }, [id]);

  const handleOptionClick = (selectedOption: string) => {
    setSelectedOption(selectedOption);
    if (selectedOption === data?.correct_option) {
      toast.success("Correct answer!");
    } else {
      toast.error("Incorrect answer.");
    }
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <MathJaxContext>
        <section className="mt-20 text-gray-600 body-font">
          <div className="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
            <div className="w-full md:w-2/3 flex flex-col mb-16">
              <div className="mb-8 overflow-x-auto scrolling-touch">
                <div className="flex border-b border-gray-200">
                  <div className="relative question-numbercontainer">
                    <p className="text-xs text-gray-600">
                      Aptitude Questions <br />
                      Chapter: {data.topic}
                    </p>
                    <p className="text-xs text-gray-600">
                      Difficulty: {data.difficulty}
                    </p>
                  </div>

                  <div className="questioncontainer">
                    <MathJax inline dynamic>
                      <span
                        dangerouslySetInnerHTML={{ __html: data.question }}
                      />
                    </MathJax>
                  </div>
                  <div className="flex-col leading-none optionscontainer">
                    {Object.entries(data.options).map(([key, value]) => (
                      <MathJax key={key} inline dynamic>
                        <div
                          onClick={() => handleOptionClick(key)}
                          id={key}
                          className={`option ${
                            selectedOption === key
                              ? key === data.correct_option
                                ? "correct"
                                : "wrong"
                              : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: value }}
                        ></div>
                      </MathJax>
                    ))}
                  </div>

                  <div className="mt-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => setShowSolution(true)}
                    >
                      Show Solution
                    </button>
                    {showSolution && (
                      <div className="mt-4">
                        <p className="font-semibold">Solution:</p>
                        <MathJax inline dynamic>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: data.solution,
                            }}
                          />
                        </MathJax>
                      </div>
                    )}
                  </div>

                  <div className="relative mt-0 mb-20 flex flex-wrap items-center">
                    <span className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                      <MathJax inline dynamic>
                        The answer for the question is:{" "}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: data.solution,
                          }}
                        />
                      </MathJax>
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <h2 className="font-bold text-5xl mt-5 tracking-tight">
                      Similar
                    </h2>
                    <p className="text-neutral-500 text-xl mt-3">
                      Frequently Similar Questions
                    </p>
                  </div>

                  <div className="relative flex flex-col items-center justify-center overflow-hidden p-6 sm:py-12">
                    {Array.isArray(similarData) ? (
                      similarData.map((similarQuestion, index) => (
                        <div
                          key={index}
                          className="w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center hover:bg-purple-100 hover:cursor-pointer justify-between px-5 py-4 rounded-md"
                        >
                          <Link href={`/question/${similarQuestion._id}`}>
                            <span
                              className="text-purple-800 text-sm"
                              dangerouslySetInnerHTML={{
                                __html: similarQuestion.topic,
                              }}
                            ></span>
                            <MathJax inline dynamic>
                              <h3
                                className="font-bold mt-px"
                                dangerouslySetInnerHTML={{
                                  __html: similarQuestion.question,
                                }}
                              ></h3>
                            </MathJax>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                                Practice
                              </span>
                              <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-sm">
                                Share
                              </span>
                            </div>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <div>No data available</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Toaster />
      </MathJaxContext>
    </div>
  );
}
