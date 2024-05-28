"use client"
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";


export default function Navbar(){
  const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        

        <div className="mb-20">
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10 mb-10">
          <nav className="bg-gray-5 00">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-lg px-4">
                    <Link href="/">Examise <sub>.in</sub></Link>
                  </div>
                  <div className="absolute right-0 hidden md:block">
                    <div className="mx-4 flex space-x-4 ">
                      <div

                        className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        <a href="/jobs">Find Jobs</a>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    {!isOpen ? (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Transition
              show={isOpen}
              enter="transition ease-out duration-100 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {() => (

                <div className="md:hidden" id="mobile-menu">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <div

                      className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <a href="/jobs">Find Jobs</a>
                    </div>
                    
                  </div>

                </div>
              )}
            </Transition>
          </nav>
        </header>
      </div>

        </>
    )
}