"use client";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firebaseConfig from "../../../../Firebase/firebase.config";
import GoogleButton from "react-google-button";
import Modal from "react-modal";
import Joyride from "react-joyride";
import { useParams } from "next/navigation";

firebase.initializeApp(firebaseConfig);

const SignedJoinContest = () => {
  let { contestid } = useParams();
  const [systemid, setSystemid] = useState([]);
  const [contestdata, setContestdata] = useState([]);
  // const [copied, setCopied] = useState(false);
  const [pageupdate, setPageupdate] = useState(0);
  const [username, setUsername] = useState("");
  const [registered, setRegistered] = useState(false);
  const [user, setUser] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [showModalsubmissions, setShowmodalsubmission] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [loaderjoin, setLoaderjoin] = useState(false);
  const [runTour, setRunTour] = useState(true);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    enrollmentno: "",
    email: "",
    dob: "",
    address: "",
    collegename: "",
    year: "",
    branch: "",
    gender: "",
    linkedinurl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [source, setSource] = useState("");
  const [updateid, setUpdateid] = useState(null);

  const steps = [
    {
      target: ".step-1",
      content:
        "This is step 1. Click on Continue With Google and sign in with your account.",
    },
    {
      target: ".step-2",
      content:
        "Click On Join Contest Button to join and then wait 2-3 seconds then click on play contest to start and play the contest",
    },
  ];

  const handleTourFinish = () => {
    // You can perform any actions when the tour finishes
    console.log("Tour finished");
  };

  useEffect(() => {
    // Get the URLSearchParams object from the current URL
    const params = new URLSearchParams(window.location.search);

    // Access individual parameters using the get method
    setSource(params.get("source"));

    // Don't forget to include any dependencies in the useEffect dependency array if needed
  }, []);

  // const userpointEndpoint = process.env.REACT_APP_USERPOINTS;
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
        setSystemid(user?.uid);
        // console.log(user?.uid)
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
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/userprofileget?email=${user.email}`
          );
          const userResponse = response.data[0] || {};

          setUsername(userResponse.enrollmentno);
          setFormData({
            fname: userResponse.fname || user.displayName.split(" ")[0],
            lname: userResponse.lname || user.displayName.split(" ")[1],
            enrollmentno: user.email.split("@")[0],
            email: user.email,
            collegename: userResponse.collegename || source,
            // linkedinurl: 'https://app.aptitudetracker.com',
          });
          setUpdateid(userResponse._id);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [user, source]);
  // useEffect(() => {
  //     console.log('Auth1 Running.... of page');

  //     if (user) {
  //         setSystemid(user.id);
  //         setUsername(user.username);
  //     }

  // }, [user]);

  useEffect(() => {
    //console.log('working');
    //toast.success("Updating Page...")
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/contestdataapi2?id=${contestid}&q=questions`
        );
        setContestdata(response.data);

        if (username) {
          const response2 = await axios.get(
            `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/checkingvalidcontestid?contestid=${contestid}&username=${username}&userid=${user?.uid}`
          );
          if (response2.data === "exists") {
            setRegistered(true);
            //toast.success("You are already registered in the contest");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [contestid, systemid, username, user]);

  //console.log(JSON.stringify(contestdata));

  const handleJoinContestClick = async () => {
    try {
      // Check if the user already exists in the contest
      const response2 = await axios.get(
        `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/checkingvalidcontestid?contestid=${contestid}&username=${username}&userid=${systemid}`
      );

      if (response2.data === "exists") {
        setRegistered(true);
        toast.success("You are already registered in the contest");
      } else {
        // If the user does not exist in the contest, register them
        // const registrationData = {
        //   contestid: contestid,
        //   userId: systemid,
        //   username: username,
        //   contestattempted: "no",
        //   questionIds: [],
        //   questionsIdswrong: []
        // };

        // console.log('Registration Data:', registrationData);

        try {
          const response = await axios.post(
            "https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/contestdataupdation",
            {
              data: {
                contestid: contestid,
                userId: systemid,
                username: username,
                contestattempted: "no",
                questionIds: [],
                questionsIdswrong: [],
              },
            }
          );

          // console.log('API Response:', response.data[0].message);

          toast.success(`Joined and ${response.data?.message}`);
          setPageupdate(pageupdate + 1);
          setRegistered(true);
        } catch (error) {
          console.error("API Error:", error);
          toast.error("Failed to join the contest. Please try again later.");
        }
      }

      // Close the username modal regardless of success or failure
    } catch (error) {
      console.error("Error checking contest existence:", error);
    }
  };

  // const handleInviteFriend = () => {
  //     // setTexttocopy(`https://app.aptitudetracker.com/joincontest/${contestid}`);
  //     setCopied(true);
  //     toast.success('Contest ID Copied To Clipboard');

  // };

  const calculateTimeRemaining = useCallback(() => {
    const now = new Date();
    const contestStartTime = new Date(
      `${contestdata[0]?.contestdate}T${contestdata[0]?.contesttime}`
    );
    const contestEndTime = new Date(
      `${contestdata[0]?.contestenddate}T${contestdata[0]?.contestendtime}`
    );

    if (now < contestStartTime) {
      // Contest hasn't started yet, count down to its start
      return contestStartTime - now;
    } else if (now >= contestStartTime && now < contestEndTime) {
      // Contest has started, count down to its end
      return contestEndTime - now;
    } else {
      // Contest has ended
      return 0;
    }
  }, [contestdata]);

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => {
        const newTimeRemaining = calculateTimeRemaining();
        if (newTimeRemaining <= 0) {
          clearInterval(timerInterval);
        }
        return newTimeRemaining;
      });
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, [calculateTimeRemaining]);
  const hours = Math.floor(timeRemaining / 3600000);
  const minutes = Math.floor((timeRemaining % 3600000) / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);

  const now = new Date();
  const contestStartDate = new Date(
    `${contestdata[0]?.contestdate}T${contestdata[0]?.contesttime}`
  );
  const contestEndDate = new Date(
    `${contestdata[0]?.contestenddate}T${contestdata[0]?.contestendtime}`
  );

  let message = "";

  if (now < contestStartDate) {
    message = "Time Remaining Until Contest Starts:";
  } else if (now >= contestStartDate && now < contestEndDate) {
    message = "Time Remaining Until Contest Ends:";
  } else {
    message = "Contest has ended.";
  }

  const handleSignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModalSubmission = () => {
    setShowmodalsubmission(false);
    setIsButtonVisible(false);
    setLoaderjoin(false);
  };

  const startContest = () => {
    setLoaderjoin(true);
    const url = `/playcontest/${contestid}`; // Replace with your desired URL
    const randomDelay = Math.floor(Math.random() * (10000 - 3000 + 1) + 3000); // Random delay between 3 to 10 seconds
    setTimeout(() => {
      window.location.href = url;
    }, randomDelay);
  };

  const showbuttonrandomly = () => {
    // Calculate a random delay and set the button visibility after the delay
    const randomDelay = Math.floor(Math.random() * (5000 - 3000 + 1) + 1000); // Random delay between 3 to 10 seconds
    setTimeout(() => {
      setIsButtonVisible(true); // Show the button after the random delay
    }, randomDelay);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // Set showContent to true after 2 seconds
      setShowContent(true);
    }, 6000); // 2000 milliseconds = 2 seconds

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Check if fields are empty
    if (!formData.fname.trim()) {
      newErrors.fname = "First Name is required";
    }
    if (!formData.lname.trim()) {
      newErrors.lname = "Last Name is required";
    }
    if (!formData.enrollmentno.trim()) {
      newErrors.enrollmentno = "Enrollment Number is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.collegename.trim()) {
      newErrors.collegename = "College Name is required";
    }

    toast.success("Preparing Your test");
    // Check if there are any errors
    return Object.keys(newErrors).length === 0;
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }

    const isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    const userData = {
      fname: formData.fname,
      lname: formData.lname,
      enrollmentno: formData.enrollmentno,
      email: formData.email,
      dob: "empty",
      address: "empty",
      collegename: formData.collegename,
      year: "empty",
      branch: "empty",
      gender: "empty",
      linkedinurl: "empty",
    };

    if (updateid === null || updateid === undefined) {
      try {
        const response = await axios.post(
          "https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/userprofiledataform",
          {
            data: userData,
          }
        );
        console.log("Data submitted successfully!", response.data);
        toast.success("Data submitted successfully!");
      } catch (error) {
        console.error("Failed to submit data:", error);
      }

      handleRefresh();
    } else {
      try {
        const response = await axios.post(
          `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/userprofiledataupdate?_id=${updateid}`,
          {
            data: userData,
          }
        );
        console.log("Data updated successfully!", response.data);
        toast.success("Data updated successfully!");
      } catch (error) {
        console.error("Failed to submit data:", error);
      }
    }

    setIsSubmitting(false);
  };

  const joyrideLocale = {
    last: "Okay", // Change the text of the last button to "Okay"
  };

  return (
    <>
      {showContent && user ? (
        <>
          {user ? (
            <div>
              <Modal
                isOpen={showModalsubmissions}
                onRequestClose={closeModalSubmission}
                contentLabel="Are you sure"
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity here
                    zIndex: 1000, // You can adjust the z-index as needed
                  },
                }}
              >
                <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">
                      General Instructions:
                    </h2>
                    <ul className="list-disc pl-6 mb-4">
                      <li>
                        This test consists of {contestdata[0]?.totalquestion}{" "}
                        questions covering various topics.
                      </li>
                      <li>
                        You will have a total of {contestdata[0]?.totaltime}{" "}
                        hour to complete the test.
                      </li>
                      <li>
                        There are three buttons available "Next," "Prev," and
                        "End Contest."
                      </li>
                      <li>
                        Please use the "Next" and "Prev" buttons to move between
                        questions.
                      </li>
                      <li>
                        The "End Contest" button should only be pressed when you
                        have completed the entire test.
                      </li>
                      <li>
                        You will be tracked throughout the test to ensure
                        fairness.
                      </li>
                      <li>
                        You are not allowed to switch between browser tabs. Only
                        two warnings will be given, and on the second warning,
                        you must submit your test.
                      </li>
                      <li>
                        You can press the "End Contest" button to submit your
                        test whenever you're ready; there are no restrictions on
                        timings.
                      </li>
                      <li>
                        Please answer all questions to the best of your ability.
                      </li>
                      <li>
                        Do not rush; take your time to understand and answer
                        each question.
                      </li>
                      <li>
                        Make sure to double-check your answers before submitting
                        the test.
                      </li>
                      <li>
                        If you encounter technical issues or have concerns,
                        contact the test administrator for assistance.
                      </li>
                    </ul>
                    <div class="flex items-center justify-between w-full gap-4 mt-8">
                      {isButtonVisible ? (
                        <button
                          onClick={startContest}
                          type="button"
                          className="py-3 px-6 bg-indigo-600 hover-bg-indigo-700 focus-ring-indigo-500 focus-ring-offset-indigo-200 text-gray-800 w-full transition ease-in duration-200 text-center text-lg font-semibold shadow-md focus-outline-none focus-ring-2 focus-ring-offset-2 rounded-lg"
                        >
                          {!loaderjoin ? (
                            "start"
                          ) : (
                            <>
                              <p>Starting..</p>
                              <svg
                                aria-hidden="true"
                                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                            </>
                          )}
                        </button>
                      ) : (
                        <>
                          <p>Start Button will appear in a moment...</p>
                          <svg
                            aria-hidden="true"
                            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </>
                      )}
                      <button
                        onClick={closeModalSubmission}
                        type="button"
                        class="py-2 px-4  bg-gray-800 hover:bg-gray-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-gray-800 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>

              <section class="mt-20 mb-w-full py-8 bg-gradient dark:bg-gray-800 md:py-16">
                <Joyride
                  steps={steps}
                  run={runTour}
                  continuous={true}
                  showSkipButton={true}
                  showProgress={false}
                  disableOverlayClose={true}
                  disableScrolling={true}
                  onFinish={handleTourFinish}
                  locale={joyrideLocale}
                  callback={(data) => {
                    if (data.status === "finished") {
                      setRunTour(false);
                    }
                  }}
                />

                <div class="box-content max-w-5xl px-5 mx-auto">
                  <div class="flex flex-col items-center -mx-5 md:flex-row">
                    <div class="w-full px-5 mb-5 text-center md:mb-0 md:text-left">
                      <h3 class="text-lg font-bold leading-tight text-dark font-heading md:text-xl">
                        Hi... {user?.displayName}
                      </h3>
                      <h6 class="text-xs font-semibold text-gray-700 uppercase md:text-base dark:text-gray-100">
                        New Contest: {contestdata[0]?.name}
                        {/* {message}
      {hours}h {minutes}m {seconds}s */}
                      </h6>
                      <h3 class="text-2xl font-bold text-gray font-heading md:text-4xl">
                        At {contestdata[0]?.contestdate}
                      </h3>

                      <h3 class="text-lg font-bold leading-tight text-gray font-heading md:text-xl">
                        @ {contestdata[0]?.contesttime}
                      </h3>

                      {username ? (
                        <div className="flex justify-between mt-4 step-2">
                          <div className="w-1/2">
                            {message === "Contest has ended." ? null : (
                              <button
                                onClick={() => {
                                  handleJoinContestClick();
                                }}
                                type="button"
                                className={`py-2 px-4 ${
                                  registered ? "bg-green-500" : "bg-gray-600"
                                } hover:bg-gray-400 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-gray-800 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
                              >
                                {registered
                                  ? "Already Registered"
                                  : "Join Contest"}
                              </button>
                            )}
                          </div>
                          <div className="w-1/2 ml-3">
                            {message === "Contest has ended." ? null : (
                              <div className="inline-flex rounded-md shadow">
                                {registered &&
                                message ===
                                  "Time Remaining Until Contest Ends:" ? (
                                  <button
                                    onClick={() => {
                                      setShowmodalsubmission(true);
                                      showbuttonrandomly();
                                    }}
                                    className={`py-2 px-4 bg-gray-600 hover:bg-gray-400 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-gray-800 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg bg-gray-600`}
                                  >
                                    Play Contest
                                  </button>
                                ) : null}
                              </div>
                            )}
                          </div>
                          {/* <div className="w-1/2 ml-3">
    <div className="inline-flex rounded-md shadow">
      <CopyToClipboard text={`${contestid}`} onCopy={handleInviteFriend}>
        <button
          className={`py-2 px-4 bg-gray-600 hover:bg-gray-400 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-gray-800 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${copied ? 'bg-green-500' : ''}`}
        >
          {copied ? 'Copied!' : 'Invite Friend'}
        </button>
      </CopyToClipboard>
    </div>
  </div> */}
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            handleSubmit();
                          }}
                          type="button"
                          className={`py-2 px-4 bg-gray-600 hover:bg-gray-400 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-gray-800 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
                        >
                          Please Click Here To Continue..
                        </button>
                      )}
                    </div>

                    <p className="text-gray">{message}</p>

                    <div class="mt-2 w-full px-5 md:w-auto">
                      <div class="flex justify-center text-center text-gray">
                        <div class="w-20 py-3 mx-2 border rounded-lg md:w-24 border-light-300 bg-light-100 md:py-4">
                          <div class="text-2xl font-semibold md:text-3xl">
                            <span>{hours}</span>
                          </div>
                          <div class="mt-3 text-xs uppercase opacity-75 ">
                            Hour
                          </div>
                        </div>
                        <div class="w-20 py-3 mx-2 border rounded-lg md:w-24 border-light-300 bg-light-100 md:py-4">
                          <div class="text-2xl font-semibold md:text-3xl">
                            <span>{minutes}</span>
                          </div>
                          <div class="mt-3 text-xs uppercase opacity-75 ">
                            Min
                          </div>
                        </div>
                        <div class="w-20 py-3 mx-2 border rounded-lg md:w-24 border-light-300 bg-light-100 md:py-4">
                          <div class="text-2xl font-semibold md:text-3xl">
                            <span>{seconds}</span>
                          </div>
                          <div class="mt-3 text-xs uppercase opacity-75 ">
                            Second
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* // <div class="mt-12 bg-white dark:bg-gray-800 ">
            //  {registered ? <div class="lg:flex lg:items-center lg:justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            //     <h2 class="text-3xl font-extrabold text-black dark:text-gray-800 sm:text-4xl">
            //         <span class="block">
            //             Join Contest
            //         </span>
            //         <span class="block text-indigo-500">
            //             {contestid}
            //         </span>
            //         <span>
            //             {username}
            //         </span>
            //     </h2>
            //     <div class="lg:mt-0 lg:flex-shrink-0">
            //         <div class=" inline-flex rounded-md shadow">
            //             <button onClick={handleJoinContestClick} type="button" class="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-gray-800 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            //                 Join Contest
            //             </button>
            //         </div>
            //         <div class="inline-flex ml-3 rounded-md shadow">
            //             <CopyToClipboard text={`localhost:3000/joincontest/${contestid}`} onCopy={handleInviteFriend}>
            //                 <button className={`py-4 px-6 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-gray-800 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${copied ? 'bg-green-500' : ''}`}>
            //                     {copied ? 'Copied!' : 'Invite Friend'}
            //                 </button>
            //             </CopyToClipboard>
            //         </div>
            //     </div>



            // </div> : 'you have not registered for the contest yet.'} */}

              {/* <div className="py-4">
                {contestdata.length > 0 ? ( // Check if contestdata is an array and not empty
                    <>





                        {contestdata[0].contestdata?.usersid &&
                            Object.entries(contestdata[0].contestdata.usersid).map(
                                ([userId, userData]) => (
                                    <div key={userId}>



                                        <div class="container flex flex-col items-center justify-center w-full mx-auto">

                                            <div class="w-full px-4 py-5 mb-2 bg-white border rounded-md shadow sm:px-6 dark:bg-gray-800">
                                                <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-800">
                                                    USER ID:
                                                </h3>
                                                <p class="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200">
                                                    {userData.username}
                                                </p>
                                            </div>
                                         

                                        </div>
                                    </div>
                                )
                            )}


                    </>
                ) : (
                    <p>Loading contest data...</p>
                )}
            </div> */}

              <Toaster />
            </div>
          ) : (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <GoogleButton
                onClick={() => {
                  handleSignInWithGoogle();
                }}
              />
            </div>
          )}
        </>
      ) : user ? (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p>Loading... </p>{" "}
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div class="mx-7">
            <p>
              You are not signed in. Please Sign In First To Experience Seamless
              Test Taking Experience.
            </p>

            <button
              onClick={() => {
                handleSignInWithGoogle();
              }}
              aria-label="Continue with google"
              class="bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-2"
            >
              <svg
                width="19"
                height="20"
                viewBox="0 0 19 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                  fill="#4285F4"
                />
                <path
                  d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                  fill="#34A853"
                />
                <path
                  d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                  fill="#FBBC05"
                />
                <path
                  d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                  fill="#EB4335"
                />
              </svg>
              <p class="text-base font-medium ml-4 text-gray-700 step-2">
                Continue with Google
              </p>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignedJoinContest;
