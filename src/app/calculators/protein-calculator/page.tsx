'use client'
import Sidebar from '@/components/calculators/sidebarrelated/Sidebar';
import Share_print from '@/lib/share_print';
import { Share } from 'next/font/google';
import { useState } from 'react';
import coverImage from '../../../../public/fitness/protien_calculator.png';
import { NextSeo } from 'next-seo';
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

  
const angryBirdsData: SoftwareApplicationProps = {
    name: "Examise Protein Calculator",
    operatingSystem: "WEB",
    applicationCategory: "computerApplication",
    ratingValue: "4.6",
    ratingCount: "8890",
    price: "Free",
    priceCurrency: "INR",
  };
const calculateBMR = (
    gender: string,
    activity: number,
    formula: number,
    weight: number,
    height: number,
    age: number,
    bodyFat: number
) => {
    let bmr = 0;
    let activityVal = 1;

    switch (activity) {
        case 1:
            activityVal = 1.2;
            break;
        case 2:
            activityVal = 1.375;
            break;
        case 3:
            activityVal = 1.465;
            break;
        case 4:
            activityVal = 1.55;
            break;
        case 5:
            activityVal = 1.725;
            break;
        case 6:
            activityVal = 1.9;
            break;
    }

    switch (formula) {
        case 0:
            if (gender === 'male') {
                bmr = 10 * weight + 6.25 * height - 5 * age + 5;
            } else {
                bmr = 10 * weight + 6.25 * height - 5 * age - 161;
            }
            break;
        case 1:
            if (gender === 'male') {
                bmr = 13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
            } else {
                bmr = 9.247 * weight + 3.098 * height - 4.33 * age + 447.593;
            }
            break;
        case 2:
            bmr = 370 + 21.6 * (1 - bodyFat / 100) * weight;
            break;
    }

    bmr *= activityVal;

    return {
        ada: `${weight.toFixed(0)} - ${(weight * 1.8).toFixed(0)} grams/day`,
        cdc: `${((bmr / 4.11) / 10).toFixed(0)} - ${((bmr / 4.11) * 0.35).toFixed(0)} grams/day (10-35% of daily caloric intake)`,
        who: `${(weight * 0.84).toFixed(0)} grams/day`
    };
};

export default function Home() {
    const [gender, setGender] = useState('male');
    const [activity, setActivity] = useState(0);
    const [formula, setFormula] = useState(0);
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [age, setAge] = useState(0);
    const [bodyFat, setBodyFat] = useState(0);
    const [results, setResults] = useState<{ ada: string, cdc: string, who: string } | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = calculateBMR(gender, activity, formula, weight, height, age, bodyFat);
        setResults(result);
    };

    return (
<>
<AngryBirdsSchema {...angryBirdsData} />

<NextSeo
        title="Protein Calculator: Calculate Your Daily Protein Intake Easily"
        description="Discover how to use a Protein calculator to optimize your diet for health and fitness. Learn about proteins, carbohydrates, fats, and how to balance them effectively."
        canonical="https://www.examise.in/calculators/bmi-calculator"
        openGraph={{
          url: 'https://www.examise.in/calculators/protein-calculator',
          title: 'Protein Calculator: Calculate Your Daily Protein Intake Easily',
          description: 'Discover how to use a Protein calculator to optimize your diet for health and fitness. Learn about proteins, carbohydrates, fats, and how to balance them effectively.',
          images: [
            {
              url: 'https://www.examise.in/calculators/protein-calculator',
              width: 1200,
              height: 630,
              alt: 'Protein Calculator Guide',
            },
          ],
          site_name: 'Examise.in',
        }}
        twitter={{
          handle: '@examise',
          site: '@examise',
          cardType: 'summary_large_image',
        }}
      />
        <div className="mt-12 max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
            
            
            <div className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">
                <div className="lg:col-span-2">
                    <div className="py-8 lg:pe-8">
                        <div className="space-y-5 lg:space-y-8">


                            <h2 className="text-3xl font-bold lg:text-5xl dark:text-white">Protein Calculator: Calculate Your Daily Protein Intake Easily</h2>

                            <Share_print/>

                            <p className="text-lg text-gray-800 dark:text-neutral-200">Protein puzzle solved! Experts weigh in on your daily needs.
                                Four lines tell you all: grams you crave, sources to choose.
                                Let&apos;s build that healthy you, one protein bite at a time.</p>

                            <p className="text-lg text-gray-800 dark:text-neutral-200">{results && (
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
                            )}</p>

                            <div>
                                <div className="p-6 w-full">
                                    <h1 className="text-2xl font-bold mb-4">Protein Intake Calculator</h1>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                                            <select value={gender} onChange={(e) => setGender(e.target.value)} className="p-2 block w-full">
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Activity Level</label>
                                            <select value={activity} onChange={(e) => setActivity(parseInt(e.target.value))} className="p-2 block w-full">
                                                <option value={1}>Sedentary</option>
                                                <option value={2}>Lightly active</option>
                                                <option value={3}>Moderately active</option>
                                                <option value={4}>Active Daily</option>
                                                <option value={5}>Very active</option>
                                                <option value={6}>Super active</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Formula</label>
                                            <select value={formula} onChange={(e) => setFormula(parseInt(e.target.value))} className="p-2 block w-full">
                                                <option value={0}>Mifflin-St Jeor</option>
                                                <option value={1}>Harris-Benedict</option>
                                                <option value={2}>Katch-McArdle</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                                            <input type="number" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} className="p-2 block w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                                            <input type="number" value={height} onChange={(e) => setHeight(parseFloat(e.target.value))} className="p-2 block w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Age</label>
                                            <input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value))} className="p-2 block w-full" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Body Fat (%)</label>
                                            <input type="number" value={bodyFat} onChange={(e) => setBodyFat(parseFloat(e.target.value))} className="p-2 block w-full" />
                                        </div>
                                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Calculate</button>
                                    </form>

                                </div>
                            </div>

                            <figure>
                                <img className="w-full object-cover rounded-xl" src={coverImage.src} alt="Image Description" />
                                <figcaption className="mt-3 text-sm text-center text-gray-500 dark:text-neutral-500">
                                    Protein Calculator Cover Image For The Page.
                                </figcaption>
                            </figure>

                            <div className="space-y-3">
                                <h3 className="text-2xl font-semibold dark:text-white">What is a Protein Calculator?</h3>

                                <p className="text-lg text-gray-800 dark:text-neutral-200">A protein calculator is an online tool that helps you estimate your daily protein needs based on various factors like age, weight, activity level, and fitness goals.  These calculators utilize formulas and recommendations from reputable health institutions to provide personalized protein intake suggestions.</p>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-semibold dark:text-white">Why Use a Protein Calculator?</h3>

                                <p className="text-lg text-gray-800 dark:text-neutral-200">Protein is crucial for building and repairing tissues, supporting a healthy metabolism, and promoting satiety.  However, determining the optimal protein intake can be confusing. A protein calculator simplifies this process by:</p>
                            </div>
                            <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                                <li className="ps-2">Personalization: It considers your unique needs and goals.</li>
                                <li className="ps-2">Guidance: It provides a starting point for your protein intake journey.</li>
                                <li className="ps-2">Awareness: It helps you understand your body&apos;s protein requirements.</li>
                            </ul>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-semibold dark:text-white">Factors Affecting Protein Needs</h3>

                                <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                                <li className="ps-2">Age: Protein needs generally decrease with age.</li>
                                <li className="ps-2">Weight: Heavier individuals typically require more protein.</li>
                                <li className="ps-2">Activity Level: Highly active individuals and athletes need more protein for muscle repair and growth.</li>
                                <li className="ps-2">Fitness Goals: Building muscle mass often requires a higher protein intake.</li>

                            </ul>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-semibold dark:text-white">Conclusion</h3>

                                <p className="text-lg text-gray-800 dark:text-neutral-200">Protein calculators are a helpful tool for estimating your daily protein needs. Use the provided information as a starting point,  fine-tune your intake based on your specific circumstances, and consult a healthcare professional if needed. With the right approach, you can leverage protein to optimize your health and achieve your fitness goals.</p>

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
}
