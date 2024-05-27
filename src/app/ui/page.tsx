"use client"
import { useState } from "react";

export default function JobForm() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
    const mockData = [
        { id: 1, name:"Name - 1", content2:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit velit risus sit sed massa. Vivamus vel lorem egestas",  content: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat.", image:"https://shuffle.dev/flaro-assets/images/team/bg3.png" },
        { id: 2,name:"Name - 2", content2:"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit velit risus sit sed massa. Vivamus vel lorem egestas.",image:"https://shuffle.dev/flaro-assets/images/team/bg3.png" },
        { id: 3, name:"Name - 3",content2:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit velit risus sit sed massa. Vivamus vel lorem egestas",content: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",image:"https://shuffle.dev/flaro-assets/images/team/bg3.png" },
      ];

      const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === mockData.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? mockData.length - 1 : prevIndex - 1));
  };
    return (
        <>
            {/* FAQ */}
            <section className="py-32 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -m-8">
          <div className="w-full md:w-1/2 p-8">
            <div className="md:max-w-md">
              <h2 className="mb-7 text-6xl md:text-7xl font-bold font-heading tracking-px-n leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="mb-11 text-gray-600 font-medium leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit olutpat tempor.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8">
            <div className="md:max-w-2xl ml-auto">
              <div className="flex flex-wrap">
                <div className="w-full">
                  <div className="pb-5 border-b border-gray-300">
                    <div className="flex flex-wrap -m-1.5">
                      <div className="w-auto p-1.5">
                        <svg className="relative top-1" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.14229 5.625C5.48549 4.89675 6.41152 4.375 7.50003 4.375C8.88075 4.375 10 5.21447 10 6.25C10 7.12465 9.20152 7.85942 8.12142 8.06662C7.78242 8.13166 7.50003 8.40482 7.50003 8.75M7.5 10.625H7.50625M13.125 7.5C13.125 10.6066 10.6066 13.125 7.5 13.125C4.3934 13.125 1.875 10.6066 1.875 7.5C1.875 4.3934 4.3934 1.875 7.5 1.875C10.6066 1.875 13.125 4.3934 13.125 7.5Z" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                      <div className="flex-1 p-1.5">
                        <h3 className="mb-4 font-semibold leading-normal">How does App help people in problems?</h3>
                        {openIndex === 0 && (
                          <>
                            <p className="mb-5 text-gray-600 font-medium leading-relaxed">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat, tempor condimentum commodo tincidunt sit dictumst. Eu placerat to a arcu at sem vitae eros, purus nonprofit organizations for all,
                            </p>
                            <p className="text-gray-600 font-medium leading-relaxed">
                              Lorem ipsum dolor sit amet, to the consectr adipiscing elit. Volutpat to the full tempor to the condimentum vitae vel purus.
                            </p>
                          </>
                        )}
                      </div>
                      <div className="w-auto p-1.5">
                        <button onClick={() => toggleItem(0)}>
                          <svg className="relative top-1" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.21967 3.21967C3.51256 2.92678 3.98744 2.92678 4.28033 3.21967L7.5 6.43934L10.7197 3.21967C11.0126 2.92678 11.4874 2.92678 11.7803 3.21967C12.0732 3.51256 12.0732 3.98744 11.7803 4.28033L8.56066 7.5L11.7803 10.7197C12.0732 11.0126 12.0732 11.4874 11.7803 11.7803C11.4874 12.0732 11.0126 12.0732 10.7197 11.7803L7.5 8.56066L4.28033 11.7803C3.98744 12.0732 3.51256 12.0732 3.21967 11.7803C2.92678 11.4874 2.92678 11.0126 3.21967 10.7197L6.43934 7.5L3.21967 4.28033C2.92678 3.98744 2.92678 3.51256 3.21967 3.21967Z" fill="black"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="block border-b border-gray-300">
                    <div className="flex flex-wrap justify-between py-7 -m-1.5" onClick={() => toggleItem(1)}>
                      <div className="flex-1 p-1.5">
                        <div className="flex flex-wrap -m-1.5">
                          <div className="w-auto p-1.5">
                            <svg className="relative top-1" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.14229 5.625C5.48549 4.89675 6.41152 4.375 7.50003 4.375C8.88075 4.375 10 5.21447 10 6.25C10 7.12465 9.20152 7.85942 8.12142 8.06662C7.78242 8.13166 7.50003 8.40482 7.50003 8.75M7.5 10.625H7.50625M13.125 7.5C13.125 10.6066 10.6066 13.125 7.5 13.125C4.3934 13.125 1.875 10.6066 1.875 7.5C1.875 4.3934 4.3934 1.875 7.5 1.875C10.6066 1.875 13.125 4.3934 13.125 7.5Z" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </div>
                          <div className="flex-1 p-1.5">
                            <h3 className="font-semibold leading-normal">What happens if I go over my subscription limits?</h3>
                          </div>
                        </div>
                      </div>
                      <div className="w-auto p-1.5">
                        <svg className="relative top-1" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M7.5 2.25C7.91421 2.25 8.25 2.58579 8.25 3V6.75H12C12.4142 6.75 12.75 7.08579 12.75 7.5C12.75 7.91421 12.4142 8.25 12 8.25H8.25V12C8.25 12.4142 7.91421 12.75 7.5 12.75C7.08579 12.75 6.75 12.4142 6.75 12V8.25H3C2.58579 8.25 2.25 7.91421 2.25 7.5C2.25 7.08579 2.58579 6.75 3 6.75H6.75V3C6.75 2.58579 7.08579 2.25 7.5 2.25Z" fill="#000000"></path>
                        </svg>
                      </div>
                    </div>
                    {openIndex === 1 && (
                      <div className="px-1.5 pb-5">
                        <p className="text-gray-600 font-medium leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat, tempor condimentum commodo tincidunt sit dictumst.</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <div className="block border-b border-gray-300">
                    <div className="flex flex-wrap justify-between py-7 -m-1.5" onClick={() => toggleItem(2)}>
                      <div className="flex-1 p-1.5">
                        <div className="flex flex-wrap -m-1.5">
                          <div className="w-auto p-1.5">
                            <svg className="relative top-1" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.14229 5.625C5.48549 4.89675 6.41152 4.375 7.50003 4.375C8.88075 4.375 10 5.21447 10 6.25C10 7.12465 9.20152 7.85942 8.12142 8.06662C7.78242 8.13166 7.50003 8.40482 7.50003 8.75M7.5 10.625H7.50625M13.125 7.5C13.125 10.6066 10.6066 13.125 7.5 13.125C4.3934 13.125 1.875 10.6066 1.875 7.5C1.875 4.3934 4.3934 1.875 7.5 1.875C10.6066 1.875 13.125 4.3934 13.125 7.5Z" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </div>
                          <div className="flex-1 p-1.5">
                            <h3 className="font-semibold leading-normal">Does Smart cover large-scale enterprise solutions?</h3>
                          </div>
                        </div>
                      </div>
                      <div className="w-auto p-1.5">
                        <svg className="relative top-1" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M7.5 2.25C7.91421 2.25 8.25 2.58579 8.25 3V6.75H12C12.4142 6.75 12.75 7.08579 12.75 7.5C12.75 7.91421 12.4142 8.25 12 8.25H8.25V12C8.25 12.4142 7.91421 12.75 7.5 12.75C7.08579 12.75 6.75 12.4142 6.75 12V8.25H3C2.58579 8.25 2.25 7.91421 2.25 7.5C2.25 7.08579 2.58579 6.75 3 6.75H6.75V3C6.75 2.58579 7.08579 2.25 7.5 2.25Z" fill="#000000"></path>
                        </svg>
                      </div>
                    </div>
                    {openIndex === 2 && (
                      <div className="px-1.5 pb-5">
                        <p className="text-gray-600 font-medium leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat, tempor condimentum commodo tincidunt sit dictumst.</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <div className="block">
                    <div className="flex flex-wrap justify-between py-7 -m-1.5" onClick={() => toggleItem(3)}>
                      <div className="flex-1 p-1.5">
                        <div className="flex flex-wrap -m-1.5">
                          <div className="w-auto p-1.5">
                            <svg className="relative top-1" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.14229 5.625C5.48549 4.89675 6.41152 4.375 7.50003 4.375C8.88075 4.375 10 5.21447 10 6.25C10 7.12465 9.20152 7.85942 8.12142 8.06662C7.78242 8.13166 7.50003 8.40482 7.50003 8.75M7.5 10.625H7.50625M13.125 7.5C13.125 10.6066 10.6066 13.125 7.5 13.125C4.3934 13.125 1.875 10.6066 1.875 7.5C1.875 4.3934 4.3934 1.875 7.5 1.875C10.6066 1.875 13.125 4.3934 13.125 7.5Z" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </div>
                          <div className="flex-1 p-1.5">
                            <h3 className="font-semibold leading-normal">What platforms does the software support?</h3>
                          </div>
                        </div>
                      </div>
                      <div className="w-auto p-1.5">
                        <svg className="relative top-1" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M7.5 2.25C7.91421 2.25 8.25 2.58579 8.25 3V6.75H12C12.4142 6.75 12.75 7.08579 12.75 7.5C12.75 7.91421 12.4142 8.25 12 8.25H8.25V12C8.25 12.4142 7.91421 12.75 7.5 12.75C7.08579 12.75 6.75 12.4142 6.75 12V8.25H3C2.58579 8.25 2.25 7.91421 2.25 7.5C2.25 7.08579 2.58579 6.75 3 6.75H6.75V3C6.75 2.58579 7.08579 2.25 7.5 2.25Z" fill="#000000"></path>
                        </svg>
                      </div>
                    </div>
                    {openIndex === 3 && (
                      <div className="px-1.5 pb-5">
                        <p className="text-gray-600 font-medium leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat, tempor condimentum commodo tincidunt sit dictumst.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

{/* Internships and Placements */}
<section className="bg-blueGray-50">
  <div className="overflow-hidden pt-16">
    <div className="container px-4 mx-auto">
      <div className="flex flex-wrap -m-8">
        <div className="w-full md:w-1/2 p-8">
          <div className="inline-block mb-6 px-2 py-1 font-semibold bg-green-100 rounded-full">
            <div className="flex flex-wrap items-center -m-1">
              <div className="w-auto p-1"><a className="text-sm" href="">👋 We are hiring! View open roles</a></div>
              <div className="w-auto p-1">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.66667 3.41675L12.75 7.50008M12.75 7.50008L8.66667 11.5834M12.75 7.50008L2.25 7.50008" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </div>
            </div>
          </div>
          <h1 className="mb-6 text-6xl md:text-8xl lg:text-10xl font-bold font-heading md:max-w-xl leading-none">Internships and Placements</h1>
          <p className="mb-11 text-lg text-gray-900 font-medium md:max-w-md">We conduct monthly drives to identify and recruit the best talent from colleges. These drives include assessments, interviews, and selection processes to match candidates with the right opportunities within our company. Next Drive Date: [Date] Application Deadline: [Date]</p>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <img className="transform hover:-translate-y-16 transition ease-in-out duration-1000 rounded-xl h-full w-full" src="https://img.freepik.com/free-vector/co-workers-concept-landing-page_23-2148322670.jpg?t=st=1716792035~exp=1716795635~hmac=abed15e3684718b247b5185e6f222e9f14d34b65a814e9d85fc4988808cc4a83&w=740" alt=""/>
        </div>
      </div>
    </div>
  </div>
</section>

{/* open position */}
<section className="relative pt-24 pb-36 bg-blueGray-50 overflow-hidden">
  <img className="absolute left-1/2 bottom-0 transform -translate-x-1/2" src="flaro-assets/images/career/gradient2.svg" alt=""/>
  <div className="relative z-10 container px-4 mx-auto">
    <p className="mb-6 text-sm text-indigo-600 font-bold uppercase tracking-px">Join with us</p>
    <h2 className="mb-5 text-6xl md:text-7xl font-bold font-heading tracking-px-n leading-tight animate-bounce">Open Positions</h2>
    <p className="mb-20 text-gray-600 font-medium leading-relaxed md:max-w-md">Lorem ipsum dolor sit amet, to the consectr adipiscing elit. Volutpat tempor to the condimentum vitae.</p>
    <div className="justify-evenly flex flex-nowrap -m-2 mb-1.5">
      <div className="flex-shrink-0 max-w-md p-2">
        <a className="group" href={`/`}>
          <div className="p-8 h-full bg-white bg-opacity-80 border group-hover:border-gray-300 rounded-xl">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-16">
                <h3 className="mb-4 text-xl font-bold font-heading leading-snug">Front-end Developer</h3>
                <p className="text-gray-500 font-medium leading-relaxed">Lorem ipsum dolor sit amet, consectrtur adipiscing elit. Volutpat tempor vitae.</p>
              </div>
              <div className="flex flex-wrap justify-between items-center -m-2">
                <div className="w-auto p-2">
                  <div className="flex flex-wrap -m-3">
                    <div className="w-auto p-3">
                      <div className="flex flex-wrap items-center -m-1">
                        <div className="w-auto p-1">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.2426 12.4926C12.6185 13.1168 11.3891 14.3462 10.4137 15.3216C9.63264 16.1026 8.36745 16.1027 7.5864 15.3217C6.62886 14.3641 5.42126 13.1565 4.75736 12.4926C2.41421 10.1495 2.41421 6.35051 4.75736 4.00736C7.10051 1.66421 10.8995 1.66421 13.2426 4.00736C15.5858 6.35051 15.5858 10.1495 13.2426 12.4926Z" stroke="#A1A1AA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M11.25 8.25C11.25 9.49264 10.2426 10.5 9 10.5C7.75736 10.5 6.75 9.49264 6.75 8.25C6.75 7.00736 7.75736 6 9 6C10.2426 6 11.25 7.00736 11.25 8.25Z" stroke="#A1A1AA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </div>
                        <div className="w-auto p-1">
                          <p className="font-sans leading-relaxed">New York, USA</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-auto p-3">
                      <div className="flex flex-wrap items-center -m-1">
                        <div className="w-auto p-1">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.2426 12.4926C12.6185 13.1168 11.3891 14.3462 10.4137 15.3216C9.63264 16.1026 8.36745 16.1027 7.5864 15.3217C6.62886 14.3641 5.42126 13.1565 4.75736 12.4926C2.41421 10.1495 2.41421 6.35051 4.75736 4.00736C7.10051 1.66421 10.8995 1.66421 13.2426 4.00736C15.5858 6.35051 15.5858 10.1495 13.2426 12.4926Z" stroke="#A1A1AA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M11.25 8.25C11.25 9.49264 10.2426 10.5 9 10.5C7.75736 10.5 6.75 9.49264 6.75 8.25C6.75 7.00736 7.75736 6 9 6C10.2426 6 11.25 7.00736 11.25 8.25Z" stroke="#A1A1AA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </div>
                        <div className="w-auto p-1">
                          <p className="font-sans leading-relaxed">Full-time</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-auto p-2">
                  <div className="text-indigo-600 group-hover:text-indigo-700">
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.83333 3.33337L14.5 8.00004M14.5 8.00004L9.83333 12.6667M14.5 8.00004L2.5 8.00004" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className="flex-shrink-0 max-w-md p-2">
        <a className="group" href={`/`}>
          <div className="p-8 h-full bg-white bg-opacity-80 border group-hover:border-gray-300 rounded-xl shadow-13xl">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-16">
                <h3 className="mb-4 text-xl font-bold font-heading leading-snug">Senior Digital Marketer</h3>
                <p className="text-gray-500 font-medium leading-relaxed">Lorem ipsum dolor sit amet, consectrtur adipiscing elit. Volutpat tempor vitae.</p>
              </div>
              <div className="flex flex-wrap justify-between items-center -m-2">
                <div className="w-auto p-2">
                  <div className="flex flex-wrap -m-3">
                    <div className="w-auto p-3">
                      <div className="flex flex-wrap items-center -m-1">
                        <div className="w-auto p-1">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.2426 12.4926C12.6185 13.1168 11.3891 14.3462 10.4137 15.3216C9.63264 16.1026 8.36745 16.1027 7.5864 15.3217C6.62886 14.3641 5.42126 13.1565 4.75736 12.4926C2.41421 10.1495 2.41421 6.35051 4.75736 4.00736C7.10051 1.66421 10.8995 1.66421 13.2426 4.00736C15.5858 6.35051 15.5858 10.1495 13.2426 12.4926Z" stroke="#A1A1AA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M11.25 8.25C11.25 9.49264 10.2426 10.5 9 10.5C7.75736 10.5 6.75 9.49264 6.75 8.25C6.75 7.00736 7.75736 6 9 6C10.2426 6 11.25 7.00736 11.25 8.25Z" stroke="#A1A1AA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </div>
                        <div className="w-auto p-1">
                          <p className="font-sans leading-relaxed">New York, USA</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-auto p-3">
                      <div className="flex flex-wrap items-center -m-1">
                        <div className="w-auto p-1">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.2426 12.4926C12.6185 13.1168 11.3891 14.3462 10.4137 15.3216C9.63264 16.1026 8.36745 16.1027 7.5864 15.3217C6.62886 14.3641 5.42126 13.1565 4.75736 12.4926C2.41421 10.1495 2.41421 6.35051 4.75736 4.00736C7.10051 1.66421 10.8995 1.66421 13.2426 4.00736C15.5858 6.35051 15.5858 10.1495 13.2426 12.4926Z" stroke="#A1A1AA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M11.25 8.25C11.25 9.49264 10.2426 10.5 9 10.5C7.75736 10.5 6.75 9.49264 6.75 8.25C6.75 7.00736 7.75736 6 9 6C10.2426 6 11.25 7.00736 11.25 8.25Z" stroke="#A1A1AA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </div>
                        <div className="w-auto p-1">
                          <p className="font-sans leading-relaxed">Full-time</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-auto p-2">
                  <div className="text-indigo-600 group-hover:text-indigo-700">
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.83333 3.33337L14.5 8.00004M14.5 8.00004L9.83333 12.6667M14.5 8.00004L2.5 8.00004" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
       
       
    </div>
  </div>
</section>

<div className="relative overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out -translate-x-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {mockData.map((slide, index) => (
          <div key={slide.id} className="flex-shrink-0 w-full flex justify-center items-center h-full">
            

            <section className="py-36 bg-blueGray-50 overflow-hidden">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap lg:items-center -m-8 lg:-m-14">
                        <div className="w-full md:w-1/2 p-8 lg:p-14">
                            <div className="relative max-w-max mx-auto lg:ml-auto lg:mr-0 overflow-hidden rounded-4xl">
                                <img className="transform hover:scale-105 transition ease-in-out duration-1000" src={slide.image} alt=""/>
                                <div className="absolute bottom-0 left-0 w-full px-16 pb-10">
                                    <div className="overflow-hidden rounded-lg" style={{ backdropFilter: 'blur(8px)' }}>
                                        <div className="flex flex-wrap sm:divide-x divide-y sm:divide-y-0 divide-gray-300">
                                            <div className="w-full sm:w-1/3">
                                                <a className="flex justify-center items-center h-full py-6 bg-white bg-opacity-80 hover:bg-opacity-60 transition ease-in-out duration-200" href={`/`}>
                                                    <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.0405 1.94343C15.439 2.21077 14.804 2.37786 14.1357 2.47812C14.804 2.0771 15.3387 1.44217 15.5726 0.67356C14.9377 1.04115 14.2359 1.3085 13.4673 1.47558C12.8658 0.840649 11.997 0.439636 11.0613 0.439636C9.2567 0.439636 7.78632 1.91001 7.78632 3.71457C7.78632 3.98191 7.81974 4.21584 7.88658 4.44976C5.17974 4.31609 2.74025 3.0128 1.10278 1.00774C0.835443 1.509 0.668354 2.04369 0.668354 2.6452C0.668354 3.78141 1.23646 4.78394 2.13873 5.38546C1.60405 5.35204 1.10278 5.21837 0.634936 4.98444V5.01786C0.634936 6.62191 1.77114 7.95862 3.27494 8.25938C3.00759 8.32621 2.70683 8.35963 2.40607 8.35963C2.20557 8.35963 1.97164 8.32621 1.77114 8.2928C2.20557 9.59609 3.40861 10.5652 4.84557 10.5652C3.70937 11.4341 2.30582 11.9687 0.768607 11.9687C0.501266 11.9687 0.233924 11.9687 0 11.9353C1.47038 12.871 3.17468 13.4057 5.04607 13.4057C11.0947 13.4057 14.403 8.39305 14.403 4.04875C14.403 3.91508 14.403 3.74799 14.403 3.61432C15.038 3.17989 15.6061 2.61179 16.0405 1.94343Z" fill="black"></path>
                                                    </svg>
                                                </a>
                                            </div>
                                            <div className="w-full sm:w-1/3">
                                                <a className="flex justify-center items-center h-full py-6 bg-white bg-opacity-80 hover:bg-opacity-60 transition ease-in-out duration-200" href={`/`}>
                                                    <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.72336 18.3242V10.3519H0.0405273V7.24494H2.72336V4.95365C2.72336 2.29463 4.3474 0.846741 6.71944 0.846741C7.85566 0.846741 8.83219 0.931335 9.11678 0.969146V3.74798L7.47165 3.74873C6.1816 3.74873 5.93182 4.36174 5.93182 5.26129V7.24494H9.00845L8.60786 10.3519H5.93182V18.3242H2.72336Z" fill="black"></path>
                                                    </svg>
                                                </a>
                                            </div>
                                            <div className="w-full sm:w-1/3">
                                                <a className="flex justify-center items-center h-full py-6 bg-white bg-opacity-80 hover:bg-opacity-60 transition ease-in-out duration-200" href={`/`}>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.84125 2.30226C12.4377 2.30226 12.7452 2.31198 13.7709 2.35875C14.3876 2.3663 14.9985 2.47954 15.5769 2.69356C15.9964 2.85533 16.3773 3.10314 16.6952 3.42105C17.0131 3.73895 17.2609 4.1199 17.4227 4.53937C17.6367 5.1178 17.75 5.72865 17.7575 6.34536C17.8038 7.37107 17.814 7.67855 17.814 10.275C17.814 12.8715 17.8043 13.1789 17.7575 14.2046C17.75 14.8214 17.6367 15.4322 17.4227 16.0106C17.2609 16.4301 17.0131 16.8111 16.6952 17.129C16.3773 17.4469 15.9964 17.6947 15.5769 17.8564C14.9985 18.0705 14.3876 18.1837 13.7709 18.1912C12.7457 18.2376 12.4382 18.2477 9.84125 18.2477C7.24433 18.2477 6.93685 18.238 5.91161 18.1912C5.2949 18.1837 4.68405 18.0705 4.10562 17.8564C3.68615 17.6947 3.3052 17.4469 2.98729 17.129C2.66939 16.8111 2.42158 16.4301 2.25981 16.0106C2.04579 15.4322 1.93255 14.8214 1.925 14.2046C1.8787 13.1789 1.86851 12.8715 1.86851 10.275C1.86851 7.67855 1.87823 7.37107 1.925 6.34536C1.93255 5.72865 2.04579 5.1178 2.25981 4.53937C2.42158 4.1199 2.66939 3.73895 2.98729 3.42105C3.3052 3.10314 3.68615 2.85533 4.10562 2.69356C4.68405 2.47954 5.2949 2.3663 5.91161 2.35875C6.93732 2.31245 7.2448 2.30226 9.84125 2.30226ZM9.84125 0.549988C7.20173 0.549988 6.86924 0.561102 5.83196 0.608335C5.02484 0.624389 4.22629 0.777209 3.47028 1.0603C2.82174 1.30464 2.23433 1.68756 1.74904 2.18232C1.25382 2.6678 0.870581 3.25554 0.626081 3.90449C0.342994 4.66051 0.190174 5.45906 0.17412 6.26617C0.127813 7.30253 0.116699 7.63502 0.116699 10.2745C0.116699 12.9141 0.127813 13.2465 0.175047 14.2838C0.1911 15.0909 0.343921 15.8895 0.627007 16.6455C0.871236 17.2944 1.25416 17.8821 1.74904 18.3677C2.2346 18.8626 2.82234 19.2455 3.47121 19.4897C4.22722 19.7728 5.02577 19.9256 5.83288 19.9417C6.87017 19.988 7.20127 20 9.84218 20C12.4831 20 12.8142 19.9889 13.8515 19.9417C14.6586 19.9256 15.4571 19.7728 16.2132 19.4897C16.8589 19.2394 17.4454 18.857 17.935 18.3671C18.4246 17.8772 18.8065 17.2905 19.0564 16.6446C19.3395 15.8886 19.4923 15.09 19.5084 14.2829C19.5547 13.2465 19.5658 12.9141 19.5658 10.2745C19.5658 7.63502 19.5547 7.30253 19.5075 6.26524C19.4914 5.45813 19.3386 4.65958 19.0555 3.90357C18.8113 3.2547 18.4283 2.66696 17.9335 2.1814C17.4479 1.68652 16.8602 1.3036 16.2113 1.05937C15.4553 0.776283 14.6567 0.623463 13.8496 0.607409C12.8133 0.561102 12.4808 0.549988 9.84125 0.549988Z" fill="black"></path>
                                                        <path d="M9.83852 5.28125C8.85084 5.28125 7.88534 5.57413 7.06412 6.12286C6.24289 6.67158 5.60283 7.4515 5.22486 8.364C4.84689 9.27649 4.748 10.2806 4.94068 11.2493C5.13337 12.218 5.60898 13.1078 6.30738 13.8062C7.00577 14.5046 7.89558 14.9802 8.86428 15.1729C9.83298 15.3656 10.8371 15.2667 11.7496 14.8887C12.6621 14.5107 13.442 13.8707 13.9907 13.0494C14.5394 12.2282 14.8323 11.2627 14.8323 10.275C14.8323 8.9506 14.3062 7.68041 13.3697 6.7439C12.4331 5.80738 11.163 5.28125 9.83852 5.28125ZM9.83852 13.5166C9.19741 13.5166 8.57069 13.3264 8.03763 12.9703C7.50456 12.6141 7.08909 12.1078 6.84375 11.5155C6.5984 10.9232 6.53421 10.2714 6.65929 9.64265C6.78436 9.01386 7.09308 8.43627 7.54642 7.98294C7.99975 7.52961 8.57734 7.22088 9.20613 7.09581C9.83492 6.97073 10.4867 7.03492 11.079 7.28027C11.6713 7.52561 12.1776 7.94108 12.5337 8.47415C12.8899 9.00721 13.08 9.63393 13.08 10.275C13.08 11.1347 12.7385 11.9592 12.1306 12.5671C11.5227 13.175 10.6982 13.5166 9.83852 13.5166Z" fill="black"></path>
                                                        <path d="M15.0336 6.25046C15.6781 6.25046 16.2006 5.728 16.2006 5.08351C16.2006 4.43902 15.6781 3.91656 15.0336 3.91656C14.3892 3.91656 13.8667 4.43902 13.8667 5.08351C13.8667 5.728 14.3892 6.25046 15.0336 6.25046Z" fill="black"></path>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 p-8 lg:p-14">
                            <div className="md:max-w-sm">
                                <p className="mb-8 font-sans text-sm text-indigo-600 font-semibold uppercase tracking-px">👋 Meet new Flaro</p>
                                <h2 className="mb-8 text-6xl md:text-8xl xl:text-10xl font-bold font-heading tracking-px-n leading-none">{slide.name}</h2>
                                <p className="mb-7 text-lg text-gray-900 font-medium">{slide.content}</p>
                                <p className="text-gray-600 font-medium">{slide.content2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

          </div>
        ))}
      </div>
      <button className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-black text-white px-4 py-2 rounded-full" onClick={goToPrevSlide}>&#10094;</button>
      <button className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-black text-white px-4 py-2 rounded-full" onClick={goToNextSlide}>&#10095;</button>
    </div>
            {/* components */}
            

            {/* components */}
            <section className="py-36 bg-white overflow-hidden">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap md:max-w-xl lg:max-w-7xl mx-auto">
                        <div className="w-full md:w-1/2">
                            <div className="flex flex-col justify-between h-full">
                                <div className="mb-16 md:max-w-md mx-auto">
                                    <p className="mb-6 font-sans text-sm text-indigo-600 font-semibold uppercase">Meet The Team</p>
                                    <h2 className="mb-8 text-6xl md:text-8xl xl:text-10xl font-bold font-heading tracking-px-n leading-none">The team behind Flaro</h2>
                                    <p className="text-lg text-gray-600 font-medium leading-normal md:max-w-sm">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-1/2">
                                        <img className="mx-auto" src="https://shuffle.dev/flaro-assets/images/team/team-circle3.png" alt=""/>
                                    </div>
                                    <div className="w-full lg:w-1/2">
                                        <img className="mx-auto" src="https://shuffle.dev/flaro-assets/images/team/team-circle4.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="flex flex-col justify-end h-full">
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-1/2">
                                        <img className="mx-auto" src="https://shuffle.dev/flaro-assets/images/team/team-circle.png" alt=""/>
                                    </div>
                                    <div className="w-full lg:w-1/2">
                                        <img className="mx-auto" src="https://shuffle.dev/flaro-assets/images/team/team-circle2.png" alt=""/>
                                    </div>
                                    <div className="w-full lg:w-1/2">
                                        <img className="mx-auto" src="https://shuffle.dev/flaro-assets/images/team/team-circle5.png" alt=""/>
                                    </div>
                                    <div className="w-full lg:w-1/2">
                                        <img className="mx-auto" src="https://shuffle.dev/flaro-assets/images/team/team-circle6.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}