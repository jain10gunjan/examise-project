"use client"
import { useState } from 'react';
import { calculate, numberWithCommas } from '../../../lib/calculators';
import Sidebar from '@/components/calculators/sidebarrelated/Sidebar';
import Image from "../../../../public/fitness/macro_nutrient_calculator.png"
import { NextSeo } from 'next-seo';
import Share_print from '@/lib/share_print';
import AngryBirdsSchema from '@/lib/Schema';
interface SoftwareApplicationProps {
  name: string;
  operatingSystem: string;
  applicationCategory: string;
  ratingValue: string;
  ratingCount: string;
  price: string;
  priceCurrency: string;
}


const CalculatorForm: React.FC = () => {
  const angryBirdsData: SoftwareApplicationProps = {
    name: "Examise Macro Calculator",
    operatingSystem: "WEB",
    applicationCategory: "computerApplication",
    ratingValue: "4.6",
    ratingCount: "8800",
    price: "Free",
    priceCurrency: "INR",
  };

  const [input, setInput] = useState<any>({
    gender: 'male',
    activity: 1,
    formula: 1,
    goal: 0,
    weight: 0,
    height: 0,
    age: 0,
    fat: 0,
  });

  const [results, setResults] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const calculatedResults = calculate(input);
    setResults(calculatedResults);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
    <AngryBirdsSchema {...angryBirdsData} />

    {/* <NextSeo
        title="Macro Nutrient Calculator: Calculate Your Daily Macro Nutrient Intake Easily"
        description="Discover how to use a macronutrient calculator to optimize your diet for health and fitness. Learn about proteins, carbohydrates, fats, and how to balance them effectively."
        canonical="https://www.examise.in/calculators/macro-calculator"
        openGraph={{
          url: 'https://www.examise.in/calculators/macro-calculator',
          title: 'Macro Nutrient Calculator: Calculate Your Daily Macro Nutrient Intake Easily',
          description: 'Discover how to use a macronutrient calculator to optimize your diet for health and fitness. Learn about proteins, carbohydrates, fats, and how to balance them effectively.',
          images: [
            {
              url: 'https://www.examise.in/calculators/macro-calculator',
              width: 1200,
              height: 630,
              alt: 'Macronutrient Calculator Guide',
            },
          ],
          site_name: 'Examise.in',
        }}
        twitter={{
          handle: '@examise',
          site: '@examise',
          cardType: 'summary_large_image',
        }}
      /> */}
    <div className="mt-12 max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
    <div className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">
        <div className="lg:col-span-2">
            <div className="py-8 lg:pe-8">
                <div className="space-y-5 lg:space-y-8">


                    <h2 className="text-3xl font-bold lg:text-5xl dark:text-white">Macro Nutrient Calculator: Calculate Your Daily Macro Nutrient Intake Easily</h2>

                    <Share_print/>

                    <p className="text-lg text-gray-800 dark:text-neutral-200">This calculator can provide a range of suggested values for a person&apos;s macronutrient and Calorie needs under normal conditions.

</p>

                    {/* <p className="text-lg text-gray-800 dark:text-neutral-200">{results && (
                        <div className="mt-4 space-y-2">
                            <div>
                                <span className="font-semibold">American Dietetic Association ADA:</span> {results.ada}
                            </div>
                            <div>
                                <span className="font-semibold">The Centers for Disease Control and Prevention CDC:</span> {results.cdc}
                            </div>
                            <div>
                                <span className="font-semibold">World Health Organization safe lower limit WHO:</span> {results.who}
                            </div>
                        </div>
                    )}</p> */}

                    <div>
                    <div className="max-w-4xl mx-auto mt-8 p-4 bg-gray-100 rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
            Weight (kg)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="weight"
            type="number"
            placeholder="Enter weight"
            name="weight"
            value={input.weight}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
            Height (cm)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="height"
            type="number"
            placeholder="Enter height"
            name="height"
            value={input.height}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
            Age
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="age"
            type="number"
            placeholder="Enter age"
            name="age"
            value={input.age}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fat">
            Body Fat (%)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fat"
            type="number"
            placeholder="Enter body fat percentage"
            name="fat"
            value={input.fat}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Gender
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="gender"
            name="gender"
            value={input.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="activity">
            Activity Level
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="activity"
            name="activity"
            value={input.activity}
            onChange={handleChange}
          >
            <option value={1}>Sedentary (little or no exercise)</option>
            <option value={2}>Lightly active (light exercise/sports 1-3 days/week)</option>
            <option value={3}>Moderately active (moderate exercise/sports 3-5 days/week)</option>
            <option value={4}>Active (Daily Exercise)</option>
            <option value={5}>Very active (hard exercise/sports 6-7 days a week)</option>
            <option value={6}>Super active (very hard exercise/sports & physical job)</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formula">
            Formula
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="formula"
            name="formula"
            value={input.formula}
            onChange={handleChange}
          >
            <option value={1}>Mifflin-St Jeor</option>
            <option value={2}>Katch-McArdle</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goal">
            Goal
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="goal"
            name="goal"
            value={input.goal}
            onChange={handleChange}
          >
            <option value={0}>Maintain weight</option>
            <option value={1}>Mild weight loss (0.25 kg/week)</option>
            <option value={2}>Weight loss (0.5 kg/week)</option>
            <option value={3}>Extreme weight loss (1 kg/week)</option>
            <option value={4}>Mild weight gain (0.25 kg/week)</option>
            <option value={5}>Weight gain (0.5 kg/week)</option>
            <option value={6}>Extreme weight gain (1 kg/week)</option>
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Calculate
        </button>
      </form>

      <div className="mt-8">
        {results.map((result, index) => (
          <div key={index} className="mt-4 p-4 bg-white shadow-md rounded-md">
            <h2 className="text-lg font-bold mb-2">{result.Level}</h2>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Nutrient</th>
                  <th className="px-4 py-2">Value</th>
                  <th className="px-4 py-2">Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Protein</td>
                  <td className="border px-4 py-2">{result.Protein}</td>
                  <td className="border px-4 py-2">
                    {result.ProteinRange}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Carbs</td>
                  <td className="border px-4 py-2">{result.Carbs}</td>
                  <td className="border px-4 py-2">
                    {result.CarbsRange}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Fat</td>
                  <td className="border px-4 py-2">{result.Fat}</td>
                  <td className="border px-4 py-2">
                    {result.Fatrange}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Sugar</td>
                  <td colSpan={2} className="border px-4 py-2">{result.Sugar}</td>
                   
                </tr>
                <tr>
                  <td className="border px-4 py-2">SaturatedFat</td>
                  <td colSpan={2} className="border px-4 py-2">{result.SaturatedFat}</td>
                    
                </tr>
                <tr>
                  <td className="border px-4 py-2">Food Energy</td>
                  <td colSpan={2} className="border px-4 py-2">{result.FoodEnergy}</td>
                   
                </tr>
                
                {/* Repeat similar rows for Carbs, Fat, Sugar, etc. */}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
                    </div>

                    <figure>
                        <img className="w-full object-cover rounded-xl" src={Image.src} alt="MacroNutrient Calculator" />
                        <figcaption className="mt-3 text-sm text-center text-gray-500 dark:text-neutral-500">
                          Macro Nutrient Calculator
                        </figcaption>
                    </figure>

                    <div className="space-y-3">
                        <h3 className="text-2xl font-semibold dark:text-white">Introduction</h3>

                        <p className="text-lg text-gray-800 dark:text-neutral-200">In the pursuit of a healthy lifestyle, understanding the balance of macronutrients in your diet is crucial. Macronutrients, often referred to as &apos;macros,&apos; include proteins, carbohydrates, and fats. These are the primary nutrients required by the body in large amounts for energy, growth, and overall health. A macronutrient calculator can be an invaluable tool for anyone looking to optimize their diet, whether for weight loss, muscle gain, or simply maintaining a healthy lifestyle. This article will provide a detailed guide on what macronutrient calculators are, how they work, and how to use them effectively.</p>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-2xl font-semibold dark:text-white">What is a Macronutrient Calculator?
                        </h3>

                        <p className="text-lg text-gray-800 dark:text-neutral-200">A macronutrient calculator is a tool designed to help you determine the ideal distribution of macronutrients in your diet based on your specific goals and individual characteristics. By inputting information such as age, gender, weight, height, activity level, and dietary goals, the calculator provides a personalized recommendation of daily macronutrient intake. These recommendations typically include the amount of protein, carbohydrates, and fats you should consume to meet your health and fitness objectives.</p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-2xl font-semibold dark:text-white">How Does a Macronutrient Calculator Work?
                        </h3>

                        <p className="text-lg text-gray-800 dark:text-neutral-200">Macronutrient calculators use a series of algorithms and formulas to analyze your personal data and generate tailored recommendations. Here&apos;s a step-by-step breakdown of the process:</p>
                    </div>
                    <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                        <li className="ps-2">Input Personal Data: You start by entering basic personal information such as age, gender, weight, and height. This helps the calculator understand your body&apos;s basic needs.</li>
                        <li className="ps-2">Determine Basal Metabolic Rate (BMR): The calculator uses your personal data to estimate your Basal Metabolic Rate, which is the number of calories your body needs to maintain basic physiological functions while at rest.</li>
                        <li className="ps-2">Adjust for Activity Level: You then input your activity level, ranging from sedentary to very active. The calculator adjusts your BMR based on this information to account for the calories burned through physical activity.</li>
                        <li className="ps-2">Set Dietary Goals: Finally, you select your dietary goals, such as weight loss, muscle gain, or maintenance. The calculator uses this information to fine-tune your macronutrient distribution, ensuring it aligns with your objectives.</li>
                    </ul>
                    <div className="space-y-3">
                        <h3 className="text-2xl font-semibold dark:text-white">Key Macronutrients Explained</h3>

                        <p className="text-lg text-gray-800 dark:text-neutral-200">Before diving into the specifics of using a macronutrient calculator, it&apos;s essential to understand the role of each macronutrient:</p>
                    </div>
                    <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                        <li className="ps-2">Protein: Proteins are the building blocks of the body, essential for repairing tissues, building muscle, and supporting immune function. They are made up of amino acids, some of which are essential, meaning they must be obtained through diet.</li>
                        <li className="ps-2">Carbohydrates: Carbs are the body&apos;s primary source of energy. They can be simple (sugars) or complex (starches and fibers). Carbohydrates are broken down into glucose, which fuels your cells, tissues, and organs.</li>
                        <li className="ps-2">Fats: Fats are a concentrated source of energy and are vital for hormone production, brain function, and the absorption of fat-soluble vitamins (A, D, E, and K). They can be saturated, unsaturated, or trans fats, with unsaturated fats generally being the healthiest option.</li>
                    </ul>
                    <div className="space-y-3">
                        <h3 className="text-2xl font-semibold dark:text-white">Using a Macronutrient Calculator
                        </h3>

                        <p className="text-lg text-gray-800 dark:text-neutral-200">Here’s a detailed guide on how to use a macronutrient calculator effectively:</p>

                     </div>
                     <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                        <li className="ps-2">Step 1: Gather Your Data
                        <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                        <li className="ps-2">Age: Your age impacts your metabolic rate.</li>
                        <li className="ps-2">Gender: Men and women have different nutritional needs.</li>
                        <li className="ps-2">Weight: Current body weight is necessary for accurate calculations.</li>
                        <li className="ps-2">Height: Height is used to determine your BMR.
                        </li>
                        <li className="ps-2">Activity Level: Choose from sedentary, lightly active, moderately active, very active, or extra active.</li>
                        <li className="ps-2">Dietary Goals: Specify if you want to lose weight, gain muscle, or maintain your current weight.
                        </li>

                    </ul>
                        </li>
                        <li className="ps-2">Step 2: Input Your Data
                        Enter the collected data into the macronutrient calculator. Many online calculators are user-friendly and require you to fill out fields in a straightforward manner.</li>
                        <li className="ps-2">Step 3: Review Your Results
                        After inputting your data, the calculator will provide a detailed breakdown of your recommended daily intake of protein, carbohydrates, and fats. For example, it might suggest that you consume 150 grams of protein, 250 grams of carbohydrates, and 70 grams of fats daily.</li>
                        <li className="ps-2">Step 4: Implement Your Plan
                        Use the recommended macronutrient distribution to plan your meals. Ensure you are meeting your macro goals by tracking your food intake using apps or journals. Adjust your diet as needed to stay on track with your goals.</li>
                    </ul>

<div className="space-y-3">
                        <h3 className="text-2xl font-semibold dark:text-white">Conclusion
                        </h3>

                        <p className="text-lg text-gray-800 dark:text-neutral-200">A macronutrient calculator is a powerful tool that can help you optimize your diet based on your unique needs and goals. By understanding and properly balancing your intake of proteins, carbohydrates, and fats, you can enhance your overall health, support your fitness objectives, and improve your quality of life. Remember, while the calculator provides a valuable starting point, personal experimentation and adjustments are key to finding the perfect balance that works for you.</p>
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

export default CalculatorForm;