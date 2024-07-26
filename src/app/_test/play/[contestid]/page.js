"use client";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firebaseConfig from "../../../../Firebase/firebase.config";
// import Modal from 'react-modal';
// import { savePDF } from '@progress/kendo-react-pdf';
import GoogleButton from "react-google-button";
import { useParams } from "next/navigation";

firebase.initializeApp(firebaseConfig);

const SignedPlayContest = () => {
  let { contestid } = useParams();
  const [systemid, setSystemid] = useState([]);
  const [contestdata, setContestdata] = useState([]);
  const [questions, setQuestions] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [usercorrectquestionslist, setUsercorrectquestionslist] = useState([]);
  const [userwrongquestionslist, setUserwrongquestionslist] = useState([]);
  const [userselectedoption, setUserselectedoption] = useState([]);
  const [showModal, setShowmodal] = useState(false);
  const [username, setUsername] = useState("");
  const [timeLeft, setTimeLeft] = useState(5);
  const [showModalsubmissions, setShowmodalsubmission] = useState(false);
  const [user, setUser] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const [warningVisible, setWarningVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [tabwarn, setTabwarn] = useState(0);
  const [totaltime, setTotaltime] = useState(null);

  // const pdfBodyRef = useRef(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
        setSystemid(user?.uid);
        //console.log(user?.uid)
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
            `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/userprofileget?email=${user?.email}`
          );
          const userResponse = response.data[0] || {};

          setUsername(userResponse.enrollmentno);

          const response2 = await axios.get(
            `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/checkingvalidcontestid?contestid=${contestid}&username=${userResponse.enrollmentno}&userid=${user?.uid}`
          );

          if (response2.data !== "exists") {
            setShowmodal(true);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [user, contestid]);

  // useEffect(() => {
  //   console.log('Auth1 Running.... of page');
  //   if (user) {
  //     setSystemid(user.id);
  //     setUsername(user.username);
  //   }

  // }, [user]);

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        // Fetch whether the user has attempted the contest
        const response3 = await axios.get(
          `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/checkingcontestattempted?contestId=${contestid}&userId=${user?.uid}`
        );
        if (response3.data?.hasAttempted === true) {
          redirectToURL2();
          return; // Exit early if the contest has been attempted
        } else {
          setShowmodal(false);
          //toast.success(`Welcome ${username}`);
          const response = await axios.get(
            `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/contestdataapi2?id=${contestid}&q=questions`
          );
          setContestdata(response.data);
          const updatedNow = new Date(
            Date.now() + response.data[0]?.totaltime * 60 * 60 * 1000
          ); // Add 2 hours
          setTotaltime(updatedNow);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchContestData();
  }, [contestid, systemid, username, user]);

  // console.log(typeof totaltime)

  useEffect(() => {
    // Fetch questions based on contestdata if contestdata is available
    // const fetchQuestions = async () => {
    //   if (contestdata.length > 0) {
    //     try {
    //       // Assuming you need to extract question IDs from contestdata
    //       // const questionIds = contestdata[0].questions; // Replace with the correct path to question IDs
    //       const questionIds = contestdata[0]?.questions; // Replace with the correct path to question IDs

    //       console.log(questionIds);
    //       // Fetch questions one by one using questionIds from another API
    //       const fetchedQuestions = [];
    //       for (const questionId of questionIds) {
    //         const response = await axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/aptitudeData?_id=${questionId}`);
    //         fetchedQuestions.push(response.data);
    //       }

    //       setQuestions(fetchedQuestions);
    //       console.log('working....fetching')
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    // };

    // fetchQuestions();

    // setQuestions(contestdata[0]?.questions);

    // Assuming contestdata is an array of arrays with questions in the first element
    const originalQuestions = contestdata[0]?.questions;

    // Check if originalQuestions is an array
    if (Array.isArray(originalQuestions)) {
      // Create a function to shuffle an array
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

      // Clone the original questions array to avoid modifying it directly
      const shuffledQuestions = [...originalQuestions];

      // Shuffle the cloned array
      shuffleArray(shuffledQuestions);

      // Now, shuffledQuestions contains the questions in random order
      setQuestions(shuffledQuestions);
      //console.log(shuffledQuestions);
    } else {
      console.error("Original questions is not an array.");
    }

    //console.log(contestdata[0]?.contestenddate);
    //console.log(contestdata[0]?.contestendtime);
  }, [contestdata]);

  const handleVisibilityChange = () => {
    if (document.hidden) {
      setIsTabActive(false);
      setWarningVisible(false); // Reset warning when the tab becomes hidden
    }
  };

  const handleVisibilityChange2 = () => {
    if (tabwarn === 1) {
      handleSubmitUserContestData();
    } else {
      setTabwarn(tabwarn + 1);
      if (!document.hidden) {
        setIsTabActive(true);
      }
    }
  };

  useEffect(() => {
    // Add event listener for page visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Set the inactivity threshold to 10 seconds (10000 milliseconds)
    const inactivityThreshold = 30000; // 10 seconds
    let inactivityTimer;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (!document.hidden) {
          setWarningVisible(true);
        }
      }, inactivityThreshold);
    };

    const activityEvents = ["mousemove", "keydown"];

    activityEvents.forEach((event) => {
      document.addEventListener(event, resetInactivityTimer);
    });

    // Initial timer setup
    resetInactivityTimer();

    // Handle beforeunload event to warn the user before closing the tab
    window.addEventListener("beforeunload", (event) => {
      if (!isTabActive) {
        return undefined;
      }

      return undefined;
    });

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      activityEvents.forEach((event) => {
        document.removeEventListener(event, resetInactivityTimer);
      });
      clearTimeout(inactivityTimer); // Clear the timer on cleanup

      // Remove the beforeunload event listener
      window.removeEventListener("beforeunload", (event) => {
        if (!isTabActive) {
          return undefined;
        }

        return undefined;
      });
    };
  }, [isTabActive, warningVisible]);

  const hidewarn = () => {
    setWarningVisible(false);
  };

  // const createPdf = () => {
  //   if (pdfBodyRef.current) {
  //     savePDF(pdfBodyRef.current, {
  //       paperSize: 'Letter',
  //       fileName: `${user?.displayName}.pdf`,
  //       margin: '20px',
  //       scale: 0.6,
  //     });
  //   }
  // };

  //console.log(questions);
  const currentDate = new Date().toLocaleDateString("en-CA"); // Assuming 'en-CA' uses the "YYYY-MM-DD" format
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  //console.log(username);
  //console.log(currentTime);
  //console.log(contestdata[0].contestdate === currentDate);
  //console.log(contestdata[0].contesttime === currentTime);

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      toast.error("No more previous questions you are at the start");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      toast.success("You are at the end of contest");
    }
  };

  const redirectToURL = () => {
    const url = `/contestsubmittedsuccessfully/${contestid}`; // Replace with your desired URL
    window.location.href = url;
  };

  const redirectToURL2 = () => {
    const url = "/alreadyattempted"; // Replace with your desired URL
    window.location.href = url;
  };

  // Contest start and end date and time
  const contestStartDate = `${contestdata[0]?.contestdate} ${contestdata[0]?.contesttime}`;
  const contestEndDate = `${contestdata[0]?.contestenddate} ${contestdata[0]?.contestendtime}`;

  // Parse dates and times to compare
  const currentDateTime = new Date(`${currentDate} ${currentTime}`);
  const contestStartDateTime = new Date(contestStartDate);
  // const contestEndDateTime = new Date(contestEndDate);

  // Check if the user comes early or late
  const isEarly = currentDateTime < contestStartDateTime;
  const isLate = currentDateTime >= totaltime;

  const handleOptionClick = async (option, id) => {
    toast.success(`Option: ${option} Selected`);
    setUserselectedoption((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[currentQuestionIndex] = option;
      //console.log(newSelectedOptions);

      if (option === questions?.[currentQuestionIndex]?.[0]?.correct_option) {
        //toast.success('Correct option');
        setUsercorrectquestionslist((prevCorrectOptions) => {
          const correctoptions = [...prevCorrectOptions];
          correctoptions[
            currentQuestionIndex
          ] = `${questions[currentQuestionIndex][0]._id}_${questions[currentQuestionIndex][0].topic}`;
          //console.log(correctoptions);
          return correctoptions;
        });

        // If user reselects a correct option, remove it from the incorrect options list
        setUserwrongquestionslist((prevWrongOptions) => {
          const wrongoptions = [...prevWrongOptions];
          if (
            wrongoptions[currentQuestionIndex] ===
            `${questions[currentQuestionIndex][0]._id}_${questions[currentQuestionIndex][0].topic}`
          ) {
            wrongoptions[currentQuestionIndex] = undefined; // Remove the item
          }
          //console.log(wrongoptions);
          return wrongoptions;
        });
      } else {
        //toast.error('Wrong option');
        setUserwrongquestionslist((prevWrongOptions) => {
          const wrongoptions = [...prevWrongOptions];
          // wrongoptions[currentQuestionIndex] = questions[currentQuestionIndex][0]._id;
          wrongoptions[
            currentQuestionIndex
          ] = `${questions[currentQuestionIndex][0]._id}_${questions[currentQuestionIndex][0].topic}`;
          //console.log(wrongoptions);
          return wrongoptions;
        });

        // If user reselects a wrong option, remove it from the correct options list
        setUsercorrectquestionslist((prevCorrectOptions) => {
          const correctoptions = [...prevCorrectOptions];
          if (
            correctoptions[currentQuestionIndex] ===
            `${questions[currentQuestionIndex][0]._id}_${questions[currentQuestionIndex][0].topic}`
          ) {
            correctoptions[currentQuestionIndex] = undefined; // Remove the item
          }
          //console.log(correctoptions);
          return correctoptions;
        });
      }

      return newSelectedOptions;
    });

    // Now you can perform any other actions that depend on the updated state
    // handleNextQuestion();
  };

  const closeModal = () => {
    setShowmodal(false);
  };

  const closeModalSubmission = () => {
    setShowmodalsubmission(false);
  };

  // console.log("correct");
  // console.log(usercorrectquestionslist.filter((value) => value !== undefined));
  // console.log("wrong");
  // console.log(userwrongquestionslist.filter((value) => value !== undefined));

  const handleSubmitUserContestData = async () => {
    // contestdata[0]?.contestdata.usersid[systemid].contestattempted

    setLoader(true);

    const response3 = await axios.get(
      `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/checkingcontestattempted?contestId=${contestid}&userId=${user?.uid}`
    );

    // setIsattempted(response3.data.hasattempted);
    console.log(response3.data?.hasAttempted);
    if (response3.data?.hasAttempted === false) {
      try {
        // Define the data to be sent to the Realm function
        const data = {
          contestid: contestid,
          userId: systemid, // Assuming users contains the user's systemid
          questionIds: usercorrectquestionslist, // You can add question IDs here if needed
        };
        console.log(data);

        // Send a POST request to the Realm function

        const response = await axios.post(
          "https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/contestdataupdation",
          {
            data: {
              contestid: contestid,
              userId: systemid, // Assuming users contains the user's systemid
              questionIds: usercorrectquestionslist,
              questionsIdswrong: userwrongquestionslist,
              username: username,
              contestattempted: "yes",
            },
          }
        );

        // Handle the response if needed
        console.log("API Response:", response.data);

        // Display a success message
        toast.success("Submit the contest successfully!");
        // createPdf();
        redirectToURL();
      } catch (error) {
        // Handle errors if the API call fails
        console.error("API Error:", error);
        toast.error("Failed to join the contest. Please try again later.");
      }
    } else {
      toast.success("Already Attempted the contest");
    }
  };

  useEffect(() => {
    if (showModal) {
      // Close the modal and set the redirect URL after 5 seconds
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 10000);

      setTimeout(() => {
        clearInterval(timer);
        setShowmodal(false);
        window.location.replace("/"); // Replace with your actual redirect URL
      }, 5000);

      return () => {
        clearInterval(timer);
      }; // Clear the timer if the component unmounts
    }
  }, [showModal]);

  const calculateTimeRemaining = useCallback(() => {
    const now = new Date();
    const contestStartTime = new Date(
      `${contestdata[0]?.contestdate}T${contestdata[0]?.contesttime}`
    );
    // const contestEndTime = new Date(`${contestdata[0]?.contestenddate}T${contestdata[0]?.contestendtime}`);
    const contestEndTime = totaltime;

    //     // Check if an updated time has already been created
    // if (!localStorage.getItem('updatedNow')) {
    //   // If not, add 1 hour to the current time and store it
    //   const updatedNow = new Date(now.getTime() + 0.1 * 60 * 60 * 1000); // Add 2 hours
    //   localStorage.setItem('updatedNow', updatedNow.toISOString());
    // }

    // // Retrieve the updated time from local storage
    // const storedUpdatedNow = localStorage.getItem('updatedNow');
    // const contestEndTime = new Date(storedUpdatedNow);

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
  }, [contestdata, totaltime]);

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

  console.log();

  const hours = Math.floor(timeRemaining / 3600000);
  const minutes = Math.floor((timeRemaining % 3600000) / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);

  const handleSignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // Set showContent to true after 2 seconds
      setShowContent(true);
    }, 10000); // 2000 milliseconds = 2 seconds

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg sm:max-w-[425px] p-6 relative z-10">
            <div className="mb-4">
              <h2 className="text-lg font-medium">Not Registered!</h2>
            </div>
            <div className="mb-4">
              <p>
                You are not registered in the contest. Please register and then
                come again.
                <br />
                Redirecting in {timeLeft} seconds...
              </p>
            </div>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Username Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity here
            zIndex: 1000, // You can adjust the z-index as needed
          },
        }}


      >





        <div className="bg-white rounded-lg shadow-md p-4">
          You are not registered in the contest. Please register and then come again.
          <br />
          Redirecting in {timeLeft} seconds...
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal> */}
      {showModalsubmissions && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg sm:max-w-[425px] p-6 relative z-10">
            <div className="mb-4">
              <h2 className="text-lg font-medium">Final Alert</h2>
            </div>
            <div className="mb-4">
              <p>
                Are you sure you want to submit this contest? Once submitted you
                cannot edit it.
              </p>
            </div>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                onClick={closeModalSubmission}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 flex items-center"
                onClick={handleSubmitUserContestData}
              >
                Yes
                {loader && (
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <Modal
        isOpen={showModalsubmissions}
        onRequestClose={closeModalSubmission}
        contentLabel="Are you sure"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity here
            zIndex: 1000, // You can adjust the z-index as needed
          },
        }}

      >
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="w-64  p-4 m-auto bg-white shadow-lg rounded-2xl dark:bg-gray-800">
          <div class="w-full h-full text-center">
            <div class="flex flex-col justify-between h-full">






              <p class="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">
                Final Alert
              </p>
              <p class="px-6 py-2 text-xs text-gray-600 dark:text-gray-400">
                Are you sure you want to submit this contest. Once submitted you cannot edit it.
              </p>
              <div class="flex items-center justify-between w-full gap-4 mt-8">
                <button onClick={() => {
                  handleSubmitUserContestData();
                }} type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  Yes 
                  {loader ? <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg> : null}
                </button>
                <button onClick={closeModalSubmission} type="button" class="py-2 px-4  bg-gray-800 hover:bg-gray-600 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </Modal> */}

      {showContent ? (
        <>
          {user ? (
            // Check if the user comes early or late
            isEarly ? (
              // Display countdown if the user comes early
              <div>
                <section class="text-gray-600 body-font">
                  <div class="container px-5 py-24 mx-auto flex items-center md:flex-row flex-col">
                    <div class="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
                      <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
                        {contestdata[0]?.name}
                      </h2>
                      <h1 class="md:text-3xl text-2xl font-medium title-font text-gray-900">
                        You are Early {user?.displayName}
                      </h1>
                    </div>
                    <div class="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
                      <button class="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                        <span class="ml-4 flex items-start flex-col leading-none">
                          <span class="text-xs text-gray-600 mb-1">
                            Contest will start at
                          </span>
                          <span class="title-font font-medium">
                            {contestStartDate}
                          </span>
                        </span>
                      </button>
                      <button class="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                        <span class="ml-4 flex items-start flex-col leading-none">
                          <span class="text-xs text-gray-600 mb-1">
                            And the current time is{" "}
                          </span>
                          <span class="title-font font-medium">
                            {currentDate} {currentTime}
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </section>
                {/* <h1 className='mt-24'>Contest will start at <br></br>{contestStartDate}</h1><br></br>
            <h1>and the current time is {currentDate} {currentTime}</h1> */}

                {/* Implement your countdown logic here */}
              </div>
            ) : isLate ? (
              // Display "Contest Ended" message if the user comes late

              isLate && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="fixed inset-0 bg-black opacity-50"></div>
                  <div className="bg-white rounded-lg shadow-lg sm:max-w-[425px] p-6 relative z-10">
                    <div className="mb-4">
                      <h2 className="text-lg font-medium">
                        Contest Ended : {contestdata[0]?.name}
                      </h2>
                    </div>
                    <div className="mb-4">
                      <p>
                        Time is Up {user?.displayName}. You have been given the
                        extra 1 minute buffer time. You need to submit your test
                        right now if attempted else if you are late please move
                        to homepage.
                      </p>
                    </div>

                    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Contest Will Ended
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {contestEndDate}
                        </p>
                      </div>

                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Current Date and Time
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {currentDate} {currentTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                        onClick={() => {
                          handleSubmitUserContestData();
                        }}
                      >
                        Submit
                        {loader ? (
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                        ) : null}
                      </button>
                    </div>
                  </div>
                </div>
              )
            ) : (
              // Display the contest questions when the contest is active
              <>
                {isTabActive ? (
                  !warningVisible ? (
                    <MathJaxContext>
                      <section class="mt-20 text-gray-600 body-font">
                        <div class="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
                          <div class="w-full md:w-2/3 flex flex-col mb-16">
                            <div className="">
                              <div>
                                <ul>
                                  <p>
                                    Question {currentQuestionIndex + 1} of{" "}
                                    {questions?.length}
                                  </p>
                                </ul>
                              </div>
                              <div class="relative question-numbercontainer">
                                <p class="text-sm text-gray-600">
                                  Aptitude Questions <br />
                                  Chapter :{" "}
                                  {questions?.[currentQuestionIndex]?.[0]
                                    ?.topic || "Default Topic"}{" "}
                                </p>

                                <div class="absolute top-0 right-0  flex items-center mb-3 space-x-3">
                                  <button className="hover:bg-gray-400 text-xs mr-2 py-1.5 px-4 text-gray-600 bg-red-100 rounded-2xl">
                                    {hours}: {minutes} : {seconds}
                                  </button>
                                </div>
                              </div>

                              <div class="questioncontainer">
                                {questions?.[currentQuestionIndex]?.[0]
                                  ?.question === "null" ? (
                                  <img
                                    src={`https://i.ibb.co/${questions?.[currentQuestionIndex]?.[0]?.imgurl}`}
                                    alt="images for the dpp"
                                  />
                                ) : (
                                  <MathJax>
                                    <h1>
                                      {
                                        questions?.[currentQuestionIndex]?.[0]
                                          ?.question
                                      }
                                    </h1>
                                  </MathJax>
                                )}
                              </div>
                              <div class="optionscontainer">
                                <MathJax>
                                  <div
                                    className={`${
                                      userselectedoption[
                                        currentQuestionIndex
                                      ] === "A"
                                        ? "correct"
                                        : null
                                    }`}
                                    onClick={() =>
                                      handleOptionClick(
                                        "A",
                                        questions?.[currentQuestionIndex]?.[0]
                                          ?._id
                                      )
                                    }
                                    id="A"
                                  >
                                    {
                                      questions?.[currentQuestionIndex]?.[0]
                                        ?.options[String.fromCharCode(65 + 0)]
                                    }
                                  </div>
                                </MathJax>
                                <MathJax>
                                  <div
                                    className={`${
                                      userselectedoption[
                                        currentQuestionIndex
                                      ] === "B"
                                        ? "correct"
                                        : null
                                    }`}
                                    onClick={() =>
                                      handleOptionClick(
                                        "B",
                                        questions?.[currentQuestionIndex]?.[0]
                                          ?._id
                                      )
                                    }
                                    id="B"
                                  >
                                    {
                                      questions?.[currentQuestionIndex]?.[0]
                                        ?.options[String.fromCharCode(65 + 1)]
                                    }
                                  </div>
                                </MathJax>
                                <MathJax>
                                  <div
                                    className={`${
                                      userselectedoption[
                                        currentQuestionIndex
                                      ] === "C"
                                        ? "correct"
                                        : null
                                    }`}
                                    onClick={() =>
                                      handleOptionClick(
                                        "C",
                                        questions?.[currentQuestionIndex]?.[0]
                                          ?._id
                                      )
                                    }
                                    id="C"
                                  >
                                    {
                                      questions?.[currentQuestionIndex]?.[0]
                                        ?.options[String.fromCharCode(65 + 2)]
                                    }
                                  </div>
                                </MathJax>
                                <MathJax>
                                  <div
                                    className={`${
                                      userselectedoption[
                                        currentQuestionIndex
                                      ] === "D"
                                        ? "correct"
                                        : null
                                    }`}
                                    onClick={() =>
                                      handleOptionClick(
                                        "D",
                                        questions?.[currentQuestionIndex]?.[0]
                                          ?._id
                                      )
                                    }
                                    id="D"
                                  >
                                    {
                                      questions?.[currentQuestionIndex]?.[0]
                                        ?.options[String.fromCharCode(65 + 3)]
                                    }
                                  </div>
                                </MathJax>
                              </div>
                              <div className=""></div>

                              <div className="relative">
                                {/* Buttons */}
                                <button
                                  class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                  onClick={handlePreviousQuestion}
                                >
                                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Previous
                                  </span>
                                </button>

                                <button
                                  class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                                  onClick={handleNextQuestion}
                                >
                                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Next
                                  </span>{" "}
                                </button>

                                <div className="absolute inset-y-0 right-0 ">
                                  <button
                                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                                    onClick={() => {
                                      setShowmodalsubmission(true);
                                    }}
                                  >
                                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                      End Contest
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* <div className="pdf-body" id="pdf-body" ref={pdfBodyRef}> */}
                            {/* <div className="pdf-body" id="pdf-body">
                          <table class="table p-4 bg-white rounded-lg shadow">

                            <thead>
                              <tr>
                                <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                  Question No. | {user?.uid}
                                </th>
                                <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                  Option Selected
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {userselectedoption.map(
                                (i, index) => (

                                  <tr class="text-gray-700" key={index}>
                                    <td class="border-b-2 p-4 dark:border-dark-5">
                                      Question {index+1}: <MathJax><h1>{questions?.[index]?.[0]?.question}</h1></MathJax>
                                    </td>
                                    <td class="border-b-2 p-4 dark:border-dark-5">
                                      {userselectedoption[index]}
                                    </td>
                                  </tr>



                                )
                              )}
                            </tbody>
                          </table>
                        </div> */}
                          </div>
                        </div>
                      </section>
                    </MathJaxContext>
                  ) : (
                    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                      <div class="w-64  p-4 m-auto bg-white shadow-lg rounded-2xl dark:bg-gray-800">
                        <div class="flex flex-col justify-between h-full">
                          <p class="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">
                            User Inactivity
                          </p>
                          <p class="px-6 py-2 text-xs text-gray-600 dark:text-gray-400"></p>
                          <div class="flex items-center justify-between w-full gap-4 mt-8">
                            <button
                              onClick={() => {
                                hidewarn();
                              }}
                              type="button"
                              class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                            >
                              Resume
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <p onClick={handleVisibilityChange2}>New Tab Opening Warning.. | On second tab switching you need to submit your test as on that moment.</p> <br /> */}
                    </div>
                  )
                ) : (
                  <>
                    {tabwarn === 1 ? (
                      <>
                        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                          <div class="w-64  p-4 m-auto bg-white shadow-lg rounded-2xl dark:bg-gray-800">
                            <div class="w-full h-full text-center">
                              <div class="flex flex-col justify-between h-full">
                                <p class="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">
                                  Now Over!..
                                </p>
                                <p class="px-6 py-2 text-xs text-gray-600 dark:text-gray-400">
                                  Submit Your Test Right Now. You are being
                                  caught for using undefined means.
                                </p>
                                <div class="flex items-center justify-between w-full gap-4 mt-8">
                                  <button
                                    onClick={() => {
                                      handleVisibilityChange2();
                                    }}
                                    type="button"
                                    class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                  >
                                    Submit{" "}
                                    {loader ? (
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
                                    ) : null}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <p onClick={handleVisibilityChange2}>Submit Your Test Right Now. You are being caught for using undefined means. </p> <br /> */}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                          <div class="w-64  p-4 m-auto bg-white shadow-lg rounded-2xl dark:bg-gray-800">
                            <div class="flex flex-col justify-between h-full">
                              <p class="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">
                                Tab Opening Warning.
                              </p>
                              <p class="px-6 py-2 text-xs text-gray-600 dark:text-gray-400">
                                On second tab switching you need to submit your
                                test as on that moment.
                              </p>
                              <div class="flex items-center justify-between w-full gap-4 mt-8">
                                <button
                                  onClick={() => {
                                    handleVisibilityChange2();
                                  }}
                                  type="button"
                                  class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                >
                                  Resume
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* <p onClick={handleVisibilityChange2}>New Tab Opening Warning.. | On second tab switching you need to submit your test as on that moment.</p> <br /> */}
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )
          ) : (
            // Display login or registration form for non-logged-in users
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <GoogleButton
                onClick={() => {
                  handleSignInWithGoogle();
                }}
              />
            </div>
          )}
        </>
      ) : (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p>Wait {user?.displayName}...</p>{" "}
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
      )}

      <Toaster />
    </div>
  );
};

export default SignedPlayContest;
