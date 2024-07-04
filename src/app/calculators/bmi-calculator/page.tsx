// BMICalculator.tsx
"use client"
import Sidebar from '@/components/calculators/sidebarrelated/Sidebar';
import Share_print from '@/lib/share_print';
import { useState } from 'react';
import coverImage from '../../../../public/fitness/body_mass_calculator.png'
import AngryBirdsSchema from '@/lib/Schema';
import { NextSeo } from 'next-seo';
// interfaces.ts

interface SoftwareApplicationProps {
  name: string;
  operatingSystem: string;
  applicationCategory: string;
  ratingValue: string;
  ratingCount: string;
  price: string;
  priceCurrency: string;
}


const BMICalculator = () => {
  const [gender, setGender] = useState<string>('');
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [results, setResults] = useState<any>(null);
  const angryBirdsData: SoftwareApplicationProps = {
    name: "Examise BMI Calculator",
    operatingSystem: "WEB",
    applicationCategory: "computerApplication",
    ratingValue: "4.6",
    ratingCount: "8864",
    price: "Free",
    priceCurrency: "INR",
  };



  const isMetricSystem = () => true; // Assuming metric system for simplicity

  const calculate = () => {
    if (!gender || !weight || !height || !age) return;

    const weightUnit = isMetricSystem() ? 'kgs' : 'lbs';
    const originWeight = isMetricSystem() ? weight : weight * 2.20462;
    const heightInMeters = height / 100;
    const bmiUnit = 'kg/m²';
    const bmi = +(weight / (heightInMeters * heightInMeters)).toFixed(1);
    let indicatorPosition = ((bmi - 12) * 4) > 100 ? 100 : ((bmi - 12) * 4);
    if (indicatorPosition < 0) indicatorPosition = 0;

    let range: string;
    let bmiRange: string;
    let category: string;
    let diff: any = {
      gain: '-',
      lose: '-',
      gainLabel: 'Gain to reach a BMI of 18.5 kg/m²',
      loseLabel: 'Lose to reach a BMI of 25 kg/m²',
    };
    const pi = ((weight) / (heightInMeters * heightInMeters * heightInMeters)).toFixed(2);

    if (age < 21) {
      const minBmi = childBMI[age].min[gender];
      const maxBmi = childBMI[age].max[gender];
      range = `${getWeightFromBmi(minBmi, heightInMeters).toFixed(1)} ${weightUnit} - ${getWeightFromBmi(maxBmi, heightInMeters).toFixed(1)} ${weightUnit}`;
      bmiRange = `${minBmi} ${bmiUnit} - ${maxBmi} ${bmiUnit}`;

      if (bmi < minBmi) {
        category = 'Underweight';
      } else if (bmi < maxBmi) {
        category = 'Healthy weight';
      } else {
        category = 'At risk of overweight';
      }

      diff.gainLabel = `Gain to reach a BMI of ${minBmi} ${bmiUnit}`;
      diff.loseLabel = `Lose to reach a BMI of ${maxBmi} ${bmiUnit}`;

      if (bmi < minBmi) {
        diff.gain = `${(getWeightFromBmi(minBmi, heightInMeters) - originWeight).toFixed(1)} ${weightUnit}`;
      } else if (bmi > maxBmi) {
        diff.lose = `${(originWeight - getWeightFromBmi(maxBmi, heightInMeters)).toFixed(1)} ${weightUnit}`;
      }
    } else {
      range = `${getWeightFromBmi(18.5, heightInMeters).toFixed(1)} ${weightUnit} - ${getWeightFromBmi(25, heightInMeters).toFixed(1)} ${weightUnit}`;
      bmiRange = `18.5 ${bmiUnit} - 25 ${bmiUnit}`;

      if (bmi < 18.5) {
        category = 'Underweight';
      } else if (bmi < 25) {
        category = 'Healthy weight';
      } else if (bmi < 30) {
        category = 'Overweight';
      } else {
        category = 'Obese';
      }

      if (bmi < 18.5) {
        diff.gain = `${(getWeightFromBmi(18.5, heightInMeters) - originWeight).toFixed(1)} ${weightUnit}`;
      } else if (bmi > 25) {
        diff.lose = `${(originWeight - getWeightFromBmi(25, heightInMeters)).toFixed(1)} ${weightUnit}`;
      }
    }

    setResults({
      bmi: `${bmi} ${bmiUnit}`,
      category,
      bmiRange,
      range,
      pi: `${pi} kg/m³`,
      indicatorPosition,
      diff,
    });
  };

  const getWeightFromBmi = (bmi: number, height: number) => {
    let weight = bmi * Math.pow(height, 2);
    if (!isMetricSystem()) {
      weight = weight * 2.20462;
    }
    return weight;
  };

  const childBMI: any = {
    '2': { min: { male: 14.7, female: 14.4 }, max: { male: 18.2, female: 18 } },
    '3': { min: { male: 14.3, female: 14 }, max: { male: 17.4, female: 17.2 } },
    '4': { min: { male: 14, female: 13.7 }, max: { male: 16.9, female: 16.8 } },
    '5': { min: { male: 13.8, female: 13.5 }, max: { male: 16.8, female: 16.8 } },
    '6': { min: { male: 13.7, female: 13.4 }, max: { male: 17, female: 17.1 } },
    '7': { min: { male: 13.7, female: 13.4 }, max: { male: 17.4, female: 17.6 } },
    '8': { min: { male: 13.8, female: 13.5 }, max: { male: 17.9, female: 18.3 } },
    '9': { min: { male: 14, female: 13.7 }, max: { male: 18.6, female: 19.1 } },
    '10': { min: { male: 14.2, female: 14 }, max: { male: 19.4, female: 19.9 } },
    '11': { min: { male: 14.5, female: 14.4 }, max: { male: 20.2, female: 20.8 } },
    '12': { min: { male: 15, female: 14.8 }, max: { male: 21, female: 21.7 } },
    '13': { min: { male: 15.4, female: 15.3 }, max: { male: 21.8, female: 22.5 } },
    '14': { min: { male: 16, female: 15.8 }, max: { male: 22.6, female: 23.3 } },
    '15': { min: { male: 16.5, female: 16.3 }, max: { male: 23.4, female: 24 } },
    '16': { min: { male: 17.1, female: 16.8 }, max: { male: 24.2, female: 24.6 } },
    '17': { min: { male: 17.7, female: 17.2 }, max: { male: 24.9, female: 25.2 } },
    '18': { min: { male: 18.2, female: 17.5 }, max: { male: 25.6, female: 25.7 } },
    '19': { min: { male: 18.7, female: 17.8 }, max: { male: 26.3, female: 26.1 } },
    '20': { min: { male: 19.1, female: 17.8 }, max: { male: 27, female: 26.5 } },
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(parseFloat(event.target.value));
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseFloat(event.target.value));
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(event.target.value));
  };

  return (
    <>
    <AngryBirdsSchema {...angryBirdsData} />
    {/* <NextSeo
        title="BMI Calculator: Your Guide to Healthy Living"
        description="Discover how to use a BMI calculator to optimize your diet for health and fitness. Learn about proteins, carbohydrates, fats, and how to balance them effectively."
        canonical="https://www.examise.in/calculators/bmi-calculator"
        openGraph={{
          url: 'https://www.examise.in/calculators/bmi-calculator',
          title: 'BMI Calculator: Your Guide to Healthy Living',
          description: 'Discover how to use a BMI calculator to optimize your diet for health and fitness. Learn about proteins, carbohydrates, fats, and how to balance them effectively.',
          images: [
            {
              url: 'https://www.examise.in/calculators/bmi-calculator',
              width: 1200,
              height: 630,
              alt: 'BMI Calculator Guide',
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


                <h2 className="text-3xl font-bold lg:text-5xl dark:text-white">BMI Calculator: Your Guide to Healthy Living</h2>

                <Share_print/>


                <p className="text-lg text-gray-800 dark:text-neutral-200">In today&apos;s health-conscious world, monitoring your body metrics is essential for maintaining a healthy lifestyle. One such metric that plays a crucial role in understanding your overall health is the Body Mass Index (BMI). This article will delve into the details of BMI, how to use a BMI calculator, its significance, and how it can help you achieve your health goals.</p>

                <p className="text-lg text-gray-800 dark:text-neutral-200">
                  {results && (
                    <div className="mt-5">
                      <p><strong>BMI:</strong> {results.bmi}</p>
                      <p><strong>Category:</strong> {results.category}</p>
                      <p><strong>BMI Range:</strong> {results.bmiRange}</p>
                      <p><strong>Weight Range:</strong> {results.range}</p>
                      <p><strong>Ponderal Index:</strong> {results.pi}</p>
                      {/* <p><strong>Gain to reach:</strong> {results.diff.gainLabel}</p>
                      <p>{results.diff.gain}</p>
                      <p><strong>Lose to reach:</strong> {results.diff.loseLabel}</p>
                      <p>{results.diff.lose}</p> */}
                    </div>
                  )}</p>

                <div>
                  <div className="p-6 w-full">
                    <h1 className="text-2xl font-bold mb-4">BMI Calculator: Calculate Your BMI</h1>
                    <div className="flex flex-col space-y-4 mb-4">
                      <select className="p-2 border border-gray-300" onChange={handleGenderChange}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <input type="number" placeholder="Weight (kg)" className="p-2 border border-gray-300" onChange={handleWeightChange} />
                      <input type="number" placeholder="Height (cm)" className="p-2 border border-gray-300" onChange={handleHeightChange} />
                      <input type="number" placeholder="Age" className="p-2 border border-gray-300" onChange={handleAgeChange} />
                    </div>
                    <button className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-900" onClick={calculate}>Calculate</button>
                  </div>
                </div>

                <figure>
                  <img className="w-full object-cover rounded-xl" src={coverImage.src} alt="Image Description" />
                  <figcaption className="mt-3 text-sm text-center text-gray-500 dark:text-neutral-500">
                    Body Mass Index Cover Image For The Page
                  </figcaption>
                </figure>

                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold dark:text-white">What is BMI?</h3>

                  <p className="text-lg text-gray-800 dark:text-neutral-200">
                    Body Mass Index (BMI) is a numerical value derived from an individual&apos;s height and weight. It is a widely used screening tool to categorize individuals into different weight categories, which can indicate potential health risks.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold dark:text-white">How to Use a BMI Calculator</h3>

                  <p className="text-lg text-gray-800 dark:text-neutral-200">Using a BMI calculator is straightforward. Here&apos;s a step-by-step guide:</p>
                </div>
                <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                  <li className="ps-2">Enter Your Weight: Input your weight in kilograms or pounds.
                  </li>
                  <li className="ps-2">Enter Your Height: Input your height in meters or inches.
                  </li>
                  <li className="ps-2">Calculate: Click on the &apos;Calculate&apos; button to get your BMI value.
                  </li>
                  <li className="ps-2">Interpret the Result: Compare your BMI with standard categories to understand your weight status.
                  </li>
                </ul>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold dark:text-white">BMI Categories</h3>

                  <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                    <li className="ps-2">Identifies Health Risks: A high BMI can indicate a higher risk of developing conditions like heart disease, hypertension, and diabetes.</li>
                    <li className="ps-2">Monitors Weight Status: Regular BMI checks can help track weight changes over time.
                    </li>
                    <li className="ps-2">Guides Health Goals: Knowing your BMI can help you set realistic weight management goals.
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold dark:text-white">Limitations of BMI
                  </h3>

                  <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                    <li className="ps-2">Does Not Measure Body Fat: BMI does not distinguish between muscle and fat. A muscular person may have a high BMI but low body fat.</li>
                    <li className="ps-2">Varies by Age and Gender: BMI may not accurately reflect health status in older adults or children.
                    </li>
                    <li className="ps-2">Does Not Consider Distribution: BMI does not account for the distribution of fat in the body, which can also impact health.
                    </li>
                  </ul>

                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold dark:text-white">Complementing BMI with Other Metrics
                  </h3>
                  <p className="text-lg text-gray-800 dark:text-neutral-200">To get a comprehensive understanding of your health, consider using BMI alongside other measurements:</p>
                  <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                    <li className="ps-2">Waist-to-Hip Ratio (WHR): This measures fat distribution.</li>
                    <li className="ps-2">Body Fat Percentage: Provides a more detailed view of body composition.
                    </li>
                    <li className="ps-2">Basal Metabolic Rate (BMR): Helps understand calorie needs.
                    </li>
                  </ul>
                </div>

                
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold dark:text-white">Tips for Maintaining a Healthy BMI

                  </h3>
                  <p className="text-lg text-gray-800 dark:text-neutral-200">Achieving and maintaining a healthy BMI involves lifestyle changes:

</p>
                  <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                    <li className="ps-2">Balanced Diet: Focus on a diet rich in fruits, vegetables, lean proteins, and whole grains.
                    </li>
                    <li className="ps-2">Regular Exercise: Aim for at least 150 minutes of moderate exercise per week.
                    </li>
                    <li className="ps-2">Hydration: Drink plenty of water to support metabolism.
                    </li>
                    <li className="ps-2">Sleep: Ensure adequate sleep to help regulate weight.

                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold dark:text-white">Conclusion

                  </h3>
                  <p className="text-lg text-gray-800 dark:text-neutral-200">A BMI calculator is a valuable tool for tracking your weight and assessing your risk for various health conditions. While it has its limitations, when used in conjunction with other health metrics, it provides a good starting point for making informed health decisions. Regularly monitoring your BMI and making lifestyle changes as needed can help you stay on the path to a healthier life.
</p>
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

export default BMICalculator;
