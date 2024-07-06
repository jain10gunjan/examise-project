"use client"

import Sidebar from "@/components/calculators/sidebarrelated/Sidebar";
import MetaDataJobs from "@/components/MetaDataJobs";
import AngryBirdsSchema, { SoftwareApplicationProps } from "@/lib/Schema";
import Share_print from "@/lib/share_print";
import coverImage from "../../../../../public/mathematics/2d-distance-calculator.png"

const page = () => {

    const calculateDistance = () => {
        const x1 = parseFloat((document.getElementById('x1') as HTMLInputElement).value);
        const y1 = parseFloat((document.getElementById('y1') as HTMLInputElement).value);
        const x2 = parseFloat((document.getElementById('x2') as HTMLInputElement).value);
        const y2 = parseFloat((document.getElementById('y2') as HTMLInputElement).value);

        if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
            (document.getElementById('result') as HTMLDivElement).innerText = 'Please enter valid numbers for both points.';
            return;
        }

        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        (document.getElementById('result') as HTMLDivElement).innerText = `Distance: ${distance.toFixed(2)}`;
    };

    const resetForm = () => {
        (document.getElementById('x1') as HTMLInputElement).value = '';
        (document.getElementById('y1') as HTMLInputElement).value = '';
        (document.getElementById('x2') as HTMLInputElement).value = '';
        (document.getElementById('y2') as HTMLInputElement).value = '';
        (document.getElementById('result') as HTMLDivElement).innerText = '';
    };
    const angryBirdsData: SoftwareApplicationProps = {
      name: "2d Distance Calculator",
      operatingSystem: "WEB",
      applicationCategory: "computerApplication",
      ratingValue: "4.6",
      ratingCount: "18890",
      price: "Free",
      priceCurrency: "INR",
    };

    return (
        <>
        <AngryBirdsSchema {...angryBirdsData} />
<MetaDataJobs seoTitle={`2d Distance Calculator - Examise.in`} seoDescription={`The 2D Distance Calculator is a simple yet powerful tool designed to calculate the distance between two points on a two-dimensional plane.`}/>

         <div className="mt-12 max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
            
            
            <div className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">
                <div className="lg:col-span-2">
                    <div className="py-8 lg:pe-8">
                        <div className="space-y-5 lg:space-y-8">


                            <h2 className="text-3xl font-bold lg:text-5xl dark:text-white">2D Distance Calculator -  Examise.in</h2>

                            <Share_print/>

                            <p className="text-lg text-gray-800 dark:text-neutral-200">The 2D Distance Calculator is a simple yet powerful tool designed to calculate the distance between two points on a two-dimensional plane.</p>
                            <div>
                                <div className="p-6 w-full">
                                    <h1 className="text-2xl font-bold">2D Distance Calculator</h1>
                                    <div className=" flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8" id="animated-text"></h1>
      <div className="p-6 rounded-lg shadow-lg w-full">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="x1">X1:</label>
          <input className="w-full px-3 py-2 border rounded-lg" type="number" id="x1" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="y1">Y1:</label>
          <input className="w-full px-3 py-2 border rounded-lg" type="number" id="y1" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="x2">X2:</label>
          <input className="w-full px-3 py-2 border rounded-lg" type="number" id="x2" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="y2">Y2:</label>
          <input className="w-full px-3 py-2 border rounded-lg" type="number" id="y2" />
        </div>
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={calculateDistance}
          >
            Calculate
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            id="resetButton"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
        <div id="result" className="text-gray-700 font-semibold"></div>
      </div>
    </div>

                                </div>
                            </div>

                            <figure>
                                <img className="w-full object-cover rounded-xl" src={coverImage.src} alt="Image Description" />
                                <figcaption className="mt-3 text-sm text-center text-gray-500 dark:text-neutral-500">
                                    2D Distance Calculator Cover Image For The Page.
                                </figcaption>
                            </figure>

                            <div className="flex flex-col items-center justify-center px-4">
  <h1 className="text-4xl font-bold mb-8 text-center" id="animated-text"></h1>
  <div className="p-6 rounded-lg w-full max-w-4xl">
    <h2 className="text-2xl font-bold mb-4">Calculate 2D Distances with Ease: Introducing the 2D Distance Calculator</h2>
    <p className="mb-4">
      In the world of geometry, calculating the distance between two points on a 2D plane is a fundamental task. Whether you're a student learning the basics, a professional working on a project, or an enthusiast diving into mathematical problems, having a reliable tool to quickly determine distances is invaluable. That's where our 2D Distance Calculator comes in.
    </p>
    <h3 className="text-xl font-semibold mb-2">What is the 2D Distance Calculator?</h3>
    <p className="mb-4">
      The 2D Distance Calculator is a simple yet powerful tool designed to calculate the distance between two points on a two-dimensional plane. By inputting the coordinates of the two points, the calculator instantly computes the distance, saving you time and effort.
    </p>
    <h3 className="text-xl font-semibold mb-2">How Does It Work?</h3>
    <p className="mb-4">
      The calculator uses the Euclidean distance formula, which is derived from the Pythagorean theorem. The formula is:
    </p>
    <p className="mb-4">
      <code className="bg-gray-200 p-2 rounded">
        Distance = √((x₂ - x₁)² + (y₂ - y₁)²)
      </code>
    </p>
    <p className="mb-4">
      Where:
      <ul className="list-disc list-inside">
        <li>(x₁, y₁) and (x₂, y₂) are the coordinates of the two points.</li>
      </ul>
    </p>
    <h3 className="text-xl font-semibold mb-2">Features and Benefits</h3>
    <ul className="list-disc list-inside mb-4">
      <li><strong>Accuracy</strong>: The calculator provides precise distance calculations.</li>
      <li><strong>Ease of Use</strong>: With a user-friendly interface, anyone can use the calculator without hassle.</li>
      <li><strong>Instant Results</strong>: Get your results immediately after entering the coordinates.</li>
      <li><strong>Educational</strong>: Great for students and educators to demonstrate and understand distance calculations.</li>
    </ul>
    <h3 className="text-xl font-semibold mb-2">How to Use the 2D Distance Calculator</h3>
    <p className="mb-4">
      1. <strong>Enter the Coordinates</strong>: Input the x and y coordinates for both points.<br/>
      2. <strong>Calculate</strong>: Click the "Calculate" button to get the distance.<br/>
      3. <strong>Reset</strong>: Use the "Reset" button to clear the inputs and start over.
    </p>
    <h3 className="text-xl font-semibold mb-2">Try Our 2D Distance Calculator</h3>
    <p className="mb-4">
      Ready to see how it works? Use our 2D Distance Calculator below and experience the convenience yourself.
    </p>
  </div>
</div>


                            {/* <div className="grid lg:flex lg:justify-between lg:items-center gap-y-5 lg:gap-y-0">
                                <div>
                                    <a className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200" href="#">
                                        Plan
                                    </a>
                                    <a className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200" href="#">
                                        Web development
                                    </a>
                                    <a className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200" href="#">
                                        Free
                                    </a>
                                    <a className="m-0.5 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200" href="#">
                                        Team
                                    </a>
                                </div>

                                 
                            </div> */}
                        </div>
                    </div>
                </div>

                <Sidebar />
            </div>
        </div>
            
    
 
            
    </>
    
            );         
};

export default page;
