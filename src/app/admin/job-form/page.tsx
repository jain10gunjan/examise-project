"use client";
// Import necessary modules and components
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../../components/context/Authcontext";

// Define TypeScript interface for form data
interface JobFormData {
  searchid: string;
  title: string;
  experience: string; // Changed to string
  sharetext: string;
  createdat: string;
  companyName: string;
  companyLocation: string;
  category: string;
  salary: string;
  type: string;
  requirements: string;
  applyBefore: string;
  link: string;
  image: string;
  description: string;
}

const JobsForm = () => {
  const { user } = useAuth();

  // State variable to hold form data
  const [submittedIds, setSubmittedIds] = useState([]);
  const [formData, setFormData] = useState<JobFormData>({
    searchid: "",
    title: "",
    experience: "", // Changed to empty string
    sharetext: "",
    createdat: "",
    companyName: "",
    companyLocation: "",
    category: "",
    salary: "",
    type: "",
    requirements: "",
    applyBefore: "",
    link: "",
    image: "",
    description: "",
  });

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send POST request to your API endpoint
      const response = await axios.post(
        "https://us-east-1.aws.data.mongodb-api.com/app/aptitude_tracker_api-fjroz/endpoint/jobsform",
        {
          data: [formData],
        }
      );

      const data = response.data;
      console.log(response.data);
      // Check for success and handle response
      if (data.message === "Jobs submitted successfully!") {
        toast.success("Job submitted successfully!");
        setSubmittedIds(data.ids); // Store the returned IDs
      } else {
        toast.error("Error submitting job. Please try again.");
      }
    } catch (error) {
      toast.error("Error submitting job. Please try again.");
    }
  };

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {user?.uid == process.env.NEXT_PUBLIC_ADMIN_USERID && (
        <>
          <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Submit a Job
            </h2>
            {submittedIds ? submittedIds : null}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields */}
              {Object.keys(formData).map((key) => (
                <div key={key} className="mb-4">
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-gray-700 capitalize"
                  >
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <input
                    type={key === "salary" ? "text" : "text"} // Set type to number only for salary
                    id={key}
                    name={key}
                    value={formData[key as keyof JobFormData]}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              ))}

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  Submit Job
                </button>
              </div>
            </form>
            {/* Toast Container */}
            <Toaster />
          </div>
        </>
      )}
    </>
  );
};

export default JobsForm;
