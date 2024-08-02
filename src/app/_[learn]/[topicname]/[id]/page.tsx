"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Groq } from "groq-sdk";
import { useParams } from "next/navigation";
import { promptData } from "../../../../lib/prompts.js";

interface Question {
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

const QuestionGenerator: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showSolutionIndex, setShowSolutionIndex] = useState<number | null>(
    null
  );
  const { id } = useParams<{ id: string }>();
  const questionData = promptData.find((item) => item.id === id);
  const dbsaveapiUrl = process.env.NEXT_PUBLIC_AICONTENT_DB_SAVE_API;
  if (!dbsaveapiUrl) {
    toast.error("API endpoint is not defined.");
    return;
  }
  const fetchQuestions = async () => {
    if (!questionData?.question) return;

    setLoading(true);
    try {
      const groq = new Groq({
        apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `generate 3 more questions similar to this with detailed solution in JSON format as one object: {
              "topic": ${questionData.topic},
              "difficulty": "",
              "question": "",
              "options": {
                  "A": "",
                  "B": "",
                  "C": "",
                  "D": ""
              },
              "correct_option": "",
              "solution": ""
            }, and the question is :${questionData?.question}`,
          },
        ],
        model: "gemma2-9b-it",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
      });

      const rawContent = chatCompletion.choices[0]?.message?.content || "";
      const jsonBlocks = rawContent.match(/```json\n([\s\S]*?)\n```/g) || [];
      const jsonStrings = jsonBlocks.map((block) =>
        block.replace(/```json|```/g, "").trim()
      );
      const combinedJsonString = `[${jsonStrings.join(",")}]`;

      try {
        const questions: Question[] = JSON.parse(combinedJsonString);
        if (questions.length > 0) {
          setQuestions(questions);
          toast.success("Questions generated successfully!");
          await postQuestionsToAPI(questions); // Post questions to the API
        } else {
          throw new Error("No questions generated.");
        }
      } catch (parseError) {
        throw new Error("Failed to parse JSON response.");
      }
    } catch (error) {
      toast.error("Failed to generate questions. Please try again.");
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchQuestions(); // Call the memoized function
  // }, [fetchQuestions]);

  const postQuestionsToAPI = async (questions: Question[]) => {
    try {
      // Log the question being sent
      console.log("Posting question:", questions[0]);

      const response = await fetch(dbsaveapiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: questions[0] }), // Ensure data is correctly structured
      });

      if (response.ok) {
        toast.success("Saved!");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error}`);
        console.error("Error from API:", errorData);
      }
    } catch (error) {
      toast.error("Error submitting questions. Please try again.");
      console.error("Error posting to API:", error);
    }
  };

  const handleOptionClick = (selectedOption: string, correctOption: string) => {
    setSelectedOption(selectedOption);
    if (selectedOption === correctOption) {
      toast.success("Correct answer!");
    } else {
      toast.error("Incorrect answer.");
    }
  };

  console.log(questions);

  return (
    <>
      <section className={loading ? "animate-pulse" : ""}>
        <div className="mt-20 text-gray-600 body-font">
          <div className="container mx-auto flex flex-col px-5 py-4 justify-center items-center">
            <div className="w-full md:w-2/3 flex flex-col mb-16">
              <h1 className="text-3xl text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-neutral-200">
                Practice problems for every type{" "}
                <span className="text-blue-600 dark:text-blue-500">
                  through Examise AI
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-neutral-500">
                Type: {questionData?.question}
              </p>
            </div>
            {questions?.map((data, index) => (
              <div key={index} className="w-full md:w-2/3 flex flex-col mb-16">
                <div className="mb-8 overflow-x-auto scrolling-touch">
                  <div className="flex border-b border-gray-200">
                    <MathJaxContext>
                      <div>
                        <div className="relative question-numbercontainer">
                          <p className="text-xs text-gray-600">
                            Aptitude Questions <br />
                            Chapter : {data?.topic}{" "}
                          </p>
                          <p className="text-xs text-gray-600">
                            Difficulty : {data?.difficulty}{" "}
                          </p>
                        </div>

                        <div className="questioncontainer">
                          <MathJax inline dynamic>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: data?.question,
                              }}
                            />
                          </MathJax>
                        </div>
                        <div className="flex-col leading-none optionscontainer">
                          <MathJax inline dynamic>
                            <div
                              onClick={() =>
                                handleOptionClick("A", data.correct_option)
                              }
                              id="A"
                              dangerouslySetInnerHTML={{
                                __html: data?.options["A"],
                              }}
                            ></div>
                          </MathJax>
                          <MathJax inline dynamic>
                            <div
                              onClick={() =>
                                handleOptionClick("B", data.correct_option)
                              }
                              id="B"
                              dangerouslySetInnerHTML={{
                                __html: data?.options["B"],
                              }}
                            ></div>
                          </MathJax>
                          <MathJax inline dynamic>
                            <div
                              onClick={() =>
                                handleOptionClick("C", data.correct_option)
                              }
                              id="C"
                              dangerouslySetInnerHTML={{
                                __html: data?.options["C"],
                              }}
                            ></div>
                          </MathJax>
                          <MathJax inline dynamic>
                            <div
                              onClick={() =>
                                handleOptionClick("D", data.correct_option)
                              }
                              id="D"
                              dangerouslySetInnerHTML={{
                                __html: data?.options["D"],
                              }}
                            ></div>
                          </MathJax>
                        </div>
                        <div></div>

                        {/* Buttons */}
                        <div className="mt-4">
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
                            onClick={() => setShowSolutionIndex(index)}
                          >
                            Show Solution
                          </button>
                          {showSolutionIndex === index && (
                            <div className="mt-4 p-2 border-t border-gray-200">
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
                      </div>
                    </MathJaxContext>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8 text-gray-600 body-font">
        <div className="container mx-auto flex flex-col px-5 py-4 justify-center items-center">
          <button
            className={`bg-blue-600 text-white px-4 py-2 rounded mb-6 shadow hover:bg-blue-700 transition`}
            onClick={fetchQuestions}
            disabled={loading}
          >
            {loading ? (
              <button type="button" className="bg-indigo-500 ..." disabled>
                Generating Please Wait...
              </button>
            ) : (
              "Generate More Questions"
            )}
          </button>
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default memo(QuestionGenerator);
