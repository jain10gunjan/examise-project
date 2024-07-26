"use client";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firebaseConfig from "../../../Firebase/firebase.config";
import GoogleButton from "react-google-button";
import Papa from "papaparse";

firebase.initializeApp(firebaseConfig);

const CreateContest = () => {
  const [contestId, setContestId] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [authorised, setAuthorised] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionsarray, setQuestionsarray] = useState([]);
  const [contestquestionslist, setContestquestionslist] = useState([]);
  const [contestName, setContestName] = useState(""); // State for contest name
  const [totalQuestions, setTotalQuestions] = useState(""); // State for total questions
  const [collegeName, setCollegename] = useState(""); // State for contest name
  const [branchName, setBranchname] = useState(""); // State for contest name
  const [totaltime, setTotaltime] = useState(""); // State for contest name
  const [topiclist, setTopiclist] = useState([]);
  const [user, setUser] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
        console.log(user?.uid);
        const fetchData = async () => {
          console.log("Checking User Is Admin Or Not");
          try {
            const response = await axios.get(
              `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/admins?id=${user?.uid}`
            );
            if (response.data === "exists") {
              setAuthorised(true);
            }
          } catch (error) {
            console.error(error);
          }
        };

        fetchData();
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    console.log("ok1");

    // Update the current date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setSelectedEndTime(event.target.value);
  };

  const handleTotalTimeChange = (event) => {
    const newTime = event.target.value;
    setTotaltime(newTime);
    console.log(totaltime);
  };

  const setDateTime = () => {
    if (selectedDate && selectedTime) {
      // Combine the date and time into a single string
      const dateTimeString = `${selectedDate}T${selectedTime}`;

      // Create a Date object from the combined string
      const dateTime = new Date(dateTimeString);

      if (!isNaN(dateTime.getTime())) {
        // Check if the Date object is valid
        console.log("Selected Date and Time:", dateTime);
        // You can update your state or perform other actions with the selected date and time here
      } else {
        console.error("Invalid Date and Time");
      }
    } else {
      console.error("Please select both Date and Time");
    }
  };

  const compareDateTime = () => {
    if (selectedDate && selectedTime) {
      const userDateTimeString = `${selectedDate}T${selectedTime}`;
      const userDateTime = new Date(userDateTimeString);

      const currentDateTime = new Date();

      console.log("Current" + currentDateTime.getTime());
      console.log("User" + userDateTime.getTime());

      if (userDateTime.getTime() <= currentDateTime.getTime()) {
        toast.success("yes");
      } else {
        toast.error("no");
      }
    } else {
      toast.error("Date is missing"); // Reset the result if date or time is missing
    }
  };

  useEffect(() => {
    console.log("ok");

    // user?.uid === userIDs
    if (authorised) {
      // setAuthorised(true);
      const generateUniqueContestId = async () => {
        try {
          const newcontestId = uuidv4();
          const response = await axios.get(
            `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/checkingvalidcontestid?contestid=${newcontestId}`
          );

          if (response.data === "exists") {
            toast.error("Contest ID already exists. Generating a new one.");
            generateUniqueContestId(); // Recursively generate a new unique ID
          } else {
            setContestId(newcontestId);
            toast.success("Unique Contest ID created");
          }
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      };

      generateUniqueContestId(); // Call the function initially
    } else {
      setAuthorised(false);
    }
  }, [user, authorised]);

  const generateUniqueContestId = async () => {
    try {
      const newcontestId = uuidv4();
      const response = await axios.get(
        `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/checkingvalidcontestid?contestid=${newcontestId}`
      );

      if (response.data === "exists") {
        toast.error("Contest ID already exists. Generating a new one.");
        generateUniqueContestId(); // Recursively generate a new unique ID
      } else {
        setContestId(newcontestId);
        toast.success("Unique Contest ID created");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    if (user) {
      // User is signed in.
      const fetchData = async () => {
        console.log("w");
        try {
          const response = await axios.get(
            `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/totalcustomcontestquestionstopics?author=${user?.id}`
          );

          //   console.log(response.data)
          setTopiclist(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [user]);

  const fetchQuestionsByTopic = useCallback(
    async (topic) => {
      try {
        const response = await axios.get(
          `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/customcontestquestionsapi?topic=${topic}&author=${user?.uid}`
        );
        if (response.data !== "No matching documents found") {
          setQuestions(response.data);
        } else {
          setQuestions(null);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    },
    [user]
  ); // Add an empty dependency array to useCallback

  useEffect(() => {
    // Fetch questions by selected topic on component mount
    console.log("running");
    if (selectedTopic) {
      fetchQuestionsByTopic(selectedTopic);
    } else {
      fetchQuestionsByTopic("type");
    }
  }, [selectedTopic, fetchQuestionsByTopic]); // Include fetchQuestionsByTopic in the dependency array

  const handleAddContestQuestions = async (questionId) => {
    try {
      // Check if the questionId is already in the `contestquestionslist` array
      if (!contestquestionslist.includes(questionId)) {
        // If it's not already in the array, create a copy of the existing `contestquestionslist` array
        const updatedContestQuestionsList = [...contestquestionslist];

        // Add the clicked questionId to the copy of the array
        updatedContestQuestionsList.push(questionId);

        // Update the `contestquestionslist` state with the updated array
        setContestquestionslist(updatedContestQuestionsList);

        // You can also log the updated list if needed
        toast.success("Question added");
        console.log(updatedContestQuestionsList);
      } else {
        // Handle the case where the questionId is already in the array (duplicate)
        toast.error("Question already in the list");
        console.log("Question is already in the contest list");
      }
    } catch (error) {
      console.error("Error adding question to contest list:", error);
    }
  };

  const handleRemoveContestQuestions = (questionId) => {
    try {
      // Check if the questionId is in the `contestquestionslist` array
      if (contestquestionslist.includes(questionId)) {
        // Create a copy of the existing `contestquestionslist` array
        const updatedContestQuestionsList = [...contestquestionslist];

        // Find the index of the questionId in the array
        const indexToRemove = updatedContestQuestionsList.indexOf(questionId);

        // Remove the questionId from the copy of the array
        updatedContestQuestionsList.splice(indexToRemove, 1);

        // Update the `contestquestionslist` state with the updated array
        setContestquestionslist(updatedContestQuestionsList);

        // You can also log the updated list if needed
        toast.success("Question removed");
        console.log(updatedContestQuestionsList);
      } else {
        // Handle the case where the questionId is not in the array
        toast.warn("Question not found in the list");
        console.warn("Question is not in the contest list");
      }
    } catch (error) {
      console.error("Error removing question from contest list:", error);
    }
  };

  const fetchQuestions = async () => {
    // console.log(contestquestionslist);
    try {
      // Assuming you need to extract question IDs from contestdata
      // const questionIds = contestdata[0].questions; // Replace with the correct path to question IDs
      // const questionIds = contestdata[0]?.questions; // Replace with the correct path to question IDs

      const questionIds = contestquestionslist;
      console.log(questionIds);
      // Fetch questions one by one using questionIds from another API
      const fetchedQuestions = [];
      for (const questionId of questionIds) {
        const response = await axios.get(
          `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/customcontestquestionsapi?_id=${questionId}`
        );
        fetchedQuestions.push(response.data);
      }

      console.log(fetchedQuestions);
      setQuestionsarray(fetchedQuestions);
      console.log("working....fetching");
      toast.success("Questions Fetched Successfully");
    } catch (error) {
      console.error(error);
    }
    console.log(questionsarray ? questionsarray : null);
  };

  const sendContestDataToAPI = async () => {
    setDateTime();

    try {
      const response = await axios.get(
        `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/checkingvalidcontestid?contestid=${contestId}`
      );

      if (response.data === "exists") {
        toast.error("Contest ID already exists. Generating a new one.");
        generateUniqueContestId(); // Recursively generate a new unique ID
      } else {
        if (contestquestionslist.length === parseInt(totalQuestions)) {
          try {
            // Create an object containing the data you want to send

            // Make an HTTP POST request to your API endpoint
            const response = await axios.post(
              "https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/contestdatainsertion",
              {
                data: {
                  contestid: contestId,
                  contestname: contestName, // Contest name from state
                  totalquestions: totalQuestions,
                  collegename: collegeName, // Total questions from state
                  branchname: branchName, // Total questions from state
                  // Total questions from state
                  // contestquestionslist: contestquestionslist,
                  contestquestionslist: questionsarray,
                  contestdate: selectedDate,
                  contesttime: selectedTime,
                  contestenddate: selectedEndDate,
                  contestendtime: selectedEndTime,
                  contestauthorid: user?.uid,
                  contestauthoremail: user?.email,
                  totaltime: totaltime,
                },
              }
            );
            // Handle the response from the API as needed
            console.log(response.data); // Log the API response
            toast.success("Contest Created");
          } catch (error) {
            console.error("Error sending contest data:", error);
          }
        } else {
          if (contestquestionslist.length > parseInt(totalQuestions)) {
            toast.error("You have added more questions than you want");
          } else {
            toast.error("You have added less questions than you want");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const [csvFile, setCsvFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  const handleConvert = () => {
    if (csvFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            const filteredData = results.data.map((item) => {
              return Object.fromEntries(
                Object.entries(item).filter(([key, value]) => value !== null)
              );
            });

            const cleanedData = filteredData.filter(
              (item) => Object.keys(item).length > 0
            );

            const finalData = cleanedData
              .map((item) => {
                const options = {
                  A: item.options__A,
                  B: item.options__B,
                  C: item.options__C,
                  D: item.options__D,
                };

                return {
                  id: parseInt(item.id),
                  contestname: item.contestname,
                  topic: item.topic,
                  author: user?.uid,
                  difficulty: item.difficulty,
                  question: item.question,
                  options: options,
                  correct_option: item.correct_option,
                  solution: item.solution,
                  // imgurl: item.imgurl
                };
              })
              .filter((item) => Object.keys(item.options).length > 0);

            setJsonData(finalData);
          },
          dynamicTyping: true,
        });
      };
      reader.readAsText(csvFile);
    }
  };

  const submitDataToAPI = () => {
    // Check if jsonData is empty
    if (!jsonData || jsonData.length === 0) {
      alert("No data to submit.");
      return;
    }

    // Define the API endpoint URL
    const apiUrl =
      "https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/importfromcsv";

    // Make a POST request to the API
    axios
      .post(apiUrl, { data: jsonData })
      .then((response) => {
        // Handle the API response if needed
        console.log("API Response:", response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("API Error:", error);
      });
  };

  return (
    <>
      {authorised ? (
        <>
          {user ? (
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
                <div className="mb-8 text-center">
                  <p className="text-xl font-semibold">
                    Current Date and Time:
                  </p>
                  <p className="text-lg">{currentDateTime.toLocaleString()}</p>
                  <button
                    onClick={compareDateTime}
                    className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded mt-4"
                  >
                    Check
                  </button>
                </div>

                <div className="flex justify-center mb-8">
                  <button
                    onClick={fetchQuestions}
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Fetch Questions
                  </button>
                </div>

                <div className="flex flex-col text-center w-full mb-12">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                    Create Free Aptitude Contest
                  </h1>
                  <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                    Unleash the power of our system and create and host contests
                    for unlimited users for free.
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    Contest ID: {contestId}
                  </p>
                </div>

                <div className="lg:w-2/3 w-full mx-auto space-y-4">
                  <div className="w-full">
                    <label
                      htmlFor="contest-name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Enter Contest Name
                    </label>
                    <input
                      type="text"
                      id="contest-name"
                      name="contest-name"
                      value={contestName}
                      onChange={(e) => setContestName(e.target.value)}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="total-questions"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Total Questions
                    </label>
                    <input
                      type="text"
                      id="total-questions"
                      name="total-questions"
                      value={totalQuestions}
                      onChange={(e) => setTotalQuestions(e.target.value)}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="collegename"
                      className="leading-7 text-sm text-gray-600"
                    >
                      College Name
                    </label>
                    <input
                      type="text"
                      id="collegename"
                      name="collegename"
                      value={collegeName}
                      onChange={(e) => setCollegename(e.target.value)}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="branchname"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Branch Name
                    </label>
                    <input
                      type="text"
                      id="branchname"
                      name="branchname"
                      value={branchName}
                      onChange={(e) => setBranchname(e.target.value)}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="dateInput"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Set Date
                    </label>
                    <input
                      type="date"
                      id="dateInput"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="timeInput"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Select Time
                    </label>
                    <input
                      type="time"
                      id="timeInput"
                      value={selectedTime}
                      onChange={handleTimeChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="dateInput"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Set End Date
                    </label>
                    <input
                      type="date"
                      id="dateInput"
                      value={selectedEndDate}
                      onChange={handleEndDateChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="timeInput"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Select End Time
                    </label>
                    <input
                      type="time"
                      id="timeInput"
                      value={selectedEndTime}
                      onChange={handleEndTimeChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="hourInput"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Select Total Hours
                    </label>
                    <input
                      type="number"
                      id="hourInput"
                      name="hourInput"
                      value={totaltime}
                      step="1"
                      min="1"
                      max="10" // Adjust the max value as needed
                      onChange={handleTotalTimeChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={sendContestDataToAPI}
                      className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                      Create
                    </button>
                  </div>
                </div>

                <div className="container mx-auto px-4 mt-12">
                  <p className="text-xl font-bold mt-4 mb-8">
                    Total Questions in Contest: {contestquestionslist?.length}
                  </p>
                  <h1 className="text-3xl font-bold mt-4 mb-8">
                    Aptitude Questions
                  </h1>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="topicSelect"
                    >
                      Select Topic:
                    </label>
                    <select
                      id="topicSelect"
                      name="topicSelect"
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select a Topic</option>
                      {topiclist.map((topic) => (
                        <option key={topic?._id} value={topic?._id}>
                          {topic?._id}
                        </option>
                      ))}
                    </select>
                  </div>
                  {questions?.length > 0 ? (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Questions</h2>
                      <ul>
                        {questions.map((question) => (
                          <li key={question._id} className="mb-4">
                            <h3 className="text-lg font-bold mb-2">
                              {question.question}
                            </h3>
                            <p className="text-gray-600 mb-2">
                              Topic: {question.topic}
                            </p>
                            <div className="flex space-x-4">
                              <button
                                onClick={() =>
                                  handleAddContestQuestions(question._id)
                                }
                                className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              >
                                ADD
                              </button>
                              <button
                                onClick={() =>
                                  handleRemoveContestQuestions(question._id)
                                }
                                className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              >
                                DELETE
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>No questions available for the selected topic.</p>
                  )}
                </div>

                <div className="mt-12">
                  <h1 className="text-2xl font-bold mb-4">
                    CSV to JSON Converter
                  </h1>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                  />
                  <button
                    className="bg-blue-500 text-white rounded-md p-2 mt-2"
                    onClick={handleConvert}
                  >
                    Convert to JSON
                  </button>
                  {jsonData && (
                    <div className="mt-4">
                      <h2 className="text-lg font-semibold">JSON Data:</h2>
                      <pre className="bg-gray-100 p-4 rounded">
                        {JSON.stringify(jsonData, null, 2)}
                      </pre>
                      <button
                        className="bg-green-500 text-gray-800 rounded-md p-2 mt-2"
                        onClick={submitDataToAPI}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <Toaster />
            </section>
          ) : (
            <GoogleButton
              onClick={() => {
                handleSignInWithGoogle();
              }}
            />
          )}
        </>
      ) : (
        <section className="mt-20 bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                Hold! On
              </h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                You are not authorised to access this page
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Write us a mail at contact@aptitudetracker.com for creating a
                contest creation account.{" "}
              </p>
              <a
                href={`/`}
                className="inline-flex text-dark bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
              >
                Back to Homepage
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CreateContest;
