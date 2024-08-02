"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../components/context/Authcontext";

function JobsForm() {
  const { user } = useAuth();

  const filters = [
    "banking%20operations",
    "general%20insurance",
    "lending",
    "life%20insurance",
    "back%20office",
    "customer%20success",
    "non%20voice",
    "operations",
    "operations%20support",
    "service%20delivery",
    "voice%20/%20blended",
    "hardware",
    "it%20network",
    "telecom",
    "hardware%20and%20networks%20-%20other",
    "dba%20/%20data%20warehousing",
    "devops",
    "quality%20assurance%20and%20testing",
    "software%20development",
    "accounting%20&%20taxation",
    "audit%20&%20control",
    "finance",
    "payroll%20&%20transactions",
    "treasury",
    "compensation%20&%20benefits",
    "employee%20relations",
    "hr%20business%20advisory",
    "hr%20operations",
    "recruitment%20&%20talent%20acquisition",
    "recruitment%20marketing%20&%20branding",
    "it%20infrastructure%20services",
    "it%20security",
    "it%20support",
    "advertising%20&%20creative",
    "corporate%20communication",
    "digital%20marketing",
    "market%20research%20&%20insights",
    "marketing",
    "product%20management",
    "engineering",
    "management",
    "construction%20/%20manufacturing",
    "technology%20/%20it",
    "other%20program%20/%20project%20management",
    "business%20process%20quality",
    "production%20&%20manufacturing",
    "bd%20/%20pre%20sales",
    "enterprise%20&%20b2b%20sales",
    "retail%20&%20b2c%20sales",
    "sales%20support%20&%20operations",
    "architecture%20&%20interior%20design",
    "fashion%20&%20accessories",
    "ui%20/%20ux",
    "other%20design",
    "administration",
    "facility%20management",
    "airline%20services",
    "aviation%20engineering",
    "flight%20&%20airport%20operations",
    "pilot",
    "construction%20engineering",
    "surveying",
    "it%20consulting",
    "management%20consulting",
    "other%20consulting",
    "journalism",
    "csr%20&%20sustainability",
    "social%20&%20public%20service",
    "downstream",
    "midstream",
    "mining",
    "power%20generation",
    "power%20supply%20and%20distribution",
    "upstream",
    "community%20health%20&%20safety",
    "occupational%20health%20&%20safety",
    "events%20&%20banquet",
    "f&b%20service",
    "front%20office%20&%20guest%20services",
    "housekeeping%20&%20laundry",
    "tourism%20services",
    "doctor",
    "health%20informatics",
    "imaging%20&%20diagnostics",
    "nursing",
    "other%20hospital%20staff",
    "corporate%20affairs",
    "crime%20/%20arbitration",
    "legal%20operations",
    "animation%20/%20effects",
    "artists",
    "direction",
    "editing",
    "make%20up%20/%20costume",
    "production",
    "sound%20/%20light%20/%20technical%20support",
    "category%20management%20&%20operations",
    "ecommerce%20operations",
    "merchandising%20&%20planning",
    "retail%20store%20operations",
    "import%20&%20export",
    "procurement%20&%20purchase",
    "scm%20&%20logistics",
    "stores%20&%20material%20management",
    "engineering%20&%20manufacturing",
    "pharmaceutical%20&%20biotechnology",
    "assessment%20/%20advisory",
    "business",
    "operations%20/%20strategy",
    "security%20/%20fraud",
    "security%20officer",
    "port%20&%20maritime%20operations",
    "shipping%20deck",
    "shipping%20engineering%20&%20technical",
    "beauty%20&%20personal%20care",
    "health%20&%20fitness",
    "sports%20science%20&%20medicine",
    "sports%20staff%20and%20management",
    "strategic%20management",
    "top%20management",
    "strategic%20&%20top%20management%20-%20other",
    "administration%20&%20staff",
    "corporate%20training",
    "language%20teacher",
    "life%20skills%20/%20eca%20teacher",
    "preschool%20&%20primary%20education",
    "subject%20/%20specialization%20teacher",
    "university%20level%20educator",
  ];

  const [formData, setFormData] = useState({
    searchid: "null",
    companyName: "",
    companyLocation: "",
    salary: "",
    type: "",
    requirements: "",
    image: "",
    link: "",
    applyBefore: null,
    description: "null",
  });

  console.log("rendering");

  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        "https://unstop.com/api/workrelationship/workfunction/getAll"
      );
      setCategories(response?.data?.data);
    };
    fetchCategories();
  }, []);

  const fetchDataUnstop = async (name: string) => {
    try {
      // Fetch new data
      toast.success(`Fetching ${name} Job Post`);
      const response = await axios.get(
        `https://unstop.com/api/public/opportunity/search-result?opportunity=jobs&page=1&per_page=15&oppstatus=open&category=${name}`
      );
      const newJobs = response?.data?.data?.data;

      if (newJobs) {
        // Process and post new data
        const transformedJobs = await Promise.all(
          newJobs.map(async (job: any) => {
            try {
              const searchIdResponse = await axios.get(
                `https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/searchIdFromSearchId?searchIds=${job?.id}`
              );
              const exists = searchIdResponse.data.status === "exists";

              if (!exists) {
                const competitionResponse = await axios.get(
                  `https://unstop.com/api/public/competition/${job?.id}`
                );
                return {
                  searchid: job?.id.toString(),
                  title: job?.title,
                  experience: job?.filters[0]?.name,
                  companyName: job?.organisation?.name,
                  sharetext: `${job?.organisation?.name} Hiring ${job?.filters[0]?.name} For ${job?.title} `,
                  companyLocation: job?.jobDetail?.locations[0],
                  category: name,
                  salary: job?.jobDetail?.not_disclosed
                    ? false
                    : "Not Disclosed",
                  type:
                    job?.jobDetail?.type === "in_office" ? "In Office" : null,
                  applyBefore: new Date(
                    job?.regnRequirements?.end_regn_dt
                  ).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }),
                  requirements: null,
                  link:
                    competitionResponse?.data?.data?.competition?.regn_url ===
                    null
                      ? job?.seo_url
                      : competitionResponse?.data?.data?.competition?.regn_url,
                  image: job?.logoUrl2,
                  createdat: new Date().toDateString(),
                  description:
                    competitionResponse?.data?.data?.competition?.details,
                };
              } else {
                return null;
              }
            } catch (error: any) {
              console.error("Error transforming job:", error.message);
              return null;
            }
          })
        );

        const filteredTransformedJobs = transformedJobs.filter(
          (job) => job !== null
        );

        if (filteredTransformedJobs.length === 0) {
          toast.success("No new jobs to post.");
          return;
        }

        const postDataResponse = await axios.post(
          "https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/jobsform",
          { data: filteredTransformedJobs }
        );
        toast.success(
          filteredTransformedJobs.length + "Jobs Posted Successfully"
        );
        console.log(filteredTransformedJobs);
      }
    } catch (error: any) {
      console.error("Error fetching or posting data:", error.message);
    }
  };

  return (
    <div>
      {user?.uid == process.env.NEXT_PUBLIC_ADMIN_USERID && (
        <>
          <h2 className="text-2xl font-bold mb-4">Job Posting Dashboard</h2>
          <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-base text-blueGray-700">
                        Page Visits
                      </h3>
                    </div>
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                      <button
                        className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        See all
                      </button>
                    </div>
                  </div>
                </div>

                <div className="block w-full overflow-x-auto">
                  <table className="items-center bg-transparent w-full border-collapse ">
                    <thead>
                      <tr>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Cateogory Name
                        </th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Click To Fetch
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {categories.map((name: any, index) => {
                        return (
                          <tr key={index}>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                              {name?.name}
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                              <button
                                onClick={() => {
                                  fetchDataUnstop(name?.name);
                                }}
                              >
                                Fetch Data
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      <Toaster />
    </div>
  );
}

export default JobsForm;
