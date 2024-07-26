// AgeCalculator.tsx
"use client";
import Sidebar from "@/components/calculators/sidebarrelated/Sidebar";
import MetaDataJobs from "@/components/MetaDataJobs";
import AngryBirdsSchema, { SoftwareApplicationProps } from "@/lib/Schema";
import Share_print from "@/lib/share_print";
import { useState } from "react";
import coverImage from "../../../../public/age_calculator.png";

const AgeCalculator = () => {
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [results, setResults] = useState<string[]>([]);

  const calculate = () => {
    if (!birthday || !date) return;

    const seconds = (date.getTime() - birthday.getTime()) / 1000;

    let resultsArray: string[] = [];

    // Calculate different units of time
    const diff = dateDiff(birthday, date);
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = Math.trunc(hours / 24);

    resultsArray.unshift(plural(seconds, "s"));
    resultsArray.unshift(plural(minutes, "m"));
    resultsArray.unshift(plural(hours, "h"));
    resultsArray.unshift(plural(days, "d"));

    // Calculate weeks
    const weeks = Math.trunc(days / 7);
    const weekRemainDays = days % 7;
    let weekResult = "";
    if (weeks > 0) weekResult = plural(weeks, "w");
    if (weeks > 0 && weekRemainDays > 0)
      weekResult += ` ${plural(weekRemainDays, "d")}`;
    if (weekResult.length) resultsArray.unshift(weekResult);

    // Calculate months
    let monthsResult = "";
    let months = 12 * diff.y + diff.m;
    if (months > 0) monthsResult = plural(months, "mo");
    if (months > 0 && diff.d > 0) monthsResult += ` ${plural(diff.d, "d")}`;
    if (monthsResult.length) resultsArray.unshift(monthsResult);

    // Calculate years
    let yearsResult = "";
    const years = diff.y;
    if (years > 0) {
      yearsResult = `${plural(diff.y, "y")} ${plural(diff.m, "mo")} ${plural(
        diff.w,
        "w"
      )} ${plural(diff.d, "d")}`;
    }
    if (yearsResult.length) resultsArray.unshift(yearsResult);

    setResults(resultsArray);
  };

  const plural = (number: number, label: string) => {
    switch (label) {
      case "d":
        return number === 1 ? `${number} day` : `${number} days`;
      case "w":
        return number === 1 ? `${number} week` : `${number} weeks`;
      case "mo":
        return number === 1 ? `${number} month` : `${number} months`;
      case "y":
        return number === 1 ? `${number} year` : `${number} years`;
      case "h":
        return number === 1 ? `${number} hour` : `${number} hours`;
      case "m":
        return number === 1 ? `${number} minute` : `${number} minutes`;
      case "s":
        return number === 1 ? `${number} second` : `${number} seconds`;
      default:
        return "";
    }
  };

  const dateDiff = (startDate: Date, endDate: Date) => {
    const startYear = startDate.getFullYear();
    const february =
      (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0
        ? 29
        : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let yearDiff = endDate.getFullYear() - startYear;
    let monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    let dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[startDate.getMonth()];
    }

    return {
      y: yearDiff,
      m: monthDiff,
      w: Math.trunc(dayDiff / 7),
      d: dayDiff % 7,
    };
  };

  const handleBirthdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBirthday(value ? new Date(value) : null);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDate(value ? new Date(value) : null);
  };

  const angryBirdsData: SoftwareApplicationProps = {
    name: "Examise Age Calculator",
    operatingSystem: "WEB",
    applicationCategory: "computerApplication",
    ratingValue: "4.6",
    ratingCount: "11864",
    price: "Free",
    priceCurrency: "INR",
  };

  return (
    <>
      {/* <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-5">Age Calculator</h1>
        <div className="flex space-x-4 mb-4">
          <input
            type="date"
            className="p-2 border border-gray-300"
            onChange={handleBirthdayChange}
          />
          <input
            type="date"
            className="p-2 border border-gray-300"
            onChange={handleDateChange}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={calculate}
          >
            Calculate
          </button>
        </div>
        <div className="space-y-2">
          {results.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-md">
              {results.map((result, index) => (
                <div key={index}>{result}</div>
              ))}
            </div>
          )}
        </div>
      </div> */}

      <>
        <AngryBirdsSchema {...angryBirdsData} />
        <MetaDataJobs
          seoTitle={`Age Calculator - Examise.in`}
          seoDescription={`An online age calculator calculates age and date of birth by adding and subtracting time, including years, days, hours, minutes, and seconds.`}
        />

        <div className="mt-12 max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid lg:grid-cols-3 gap-y-8 lg:gap-y-0 lg:gap-x-6">
            <div className="lg:col-span-2">
              <div className="py-8 lg:pe-8">
                <div className="space-y-5 lg:space-y-8">
                  <h2 className="text-3xl font-bold lg:text-5xl dark:text-white">
                    Age Calculator: The Ultimate Guide to Accurate Age
                    Determination
                  </h2>

                  <Share_print />

                  <p className="text-lg text-gray-800 dark:text-neutral-200">
                    Age calculators are versatile tools that help you determine
                    age based on a specific date of birth. From financial
                    planning to health assessments, these calculators offer
                    valuable insights into various aspects of life.
                  </p>

                  <figure>
                    <img
                      className="w-auto object-contain rounded-xl mx-auto"
                      src={coverImage.src}
                      alt="Age Calculator"
                    />
                    <figcaption className="mt-3 text-sm text-center text-gray-500 dark:text-neutral-500">
                      An Age Calculator Helps Determine Precise Age
                    </figcaption>
                  </figure>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold dark:text-white">
                      What is an Age Calculator?
                    </h3>
                    <p className="text-lg text-gray-800 dark:text-neutral-200">
                      An age calculator computes a person's age based on their
                      birth date and the current date. It can also consider leap
                      years and different month lengths to provide accurate
                      results.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold dark:text-white">
                      Why Use an Age Calculator?
                    </h3>
                    <p className="text-lg text-gray-800 dark:text-neutral-200">
                      Age calculators are used for a variety of reasons,
                      including:
                    </p>
                    <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                      <li>
                        Financial Planning: Helps in calculating retirement age,
                        and pension eligibility, and planning for financial
                        milestones.
                      </li>
                      <li>
                        Health Assessments: Useful in determining health risks,
                        and life expectancy, and monitoring biological age.
                      </li>
                      <li>
                        Legal Documentation: Assists in determining the age for
                        legal contracts, licenses, and age-restricted services.
                      </li>
                      <li>
                        Personal Use: Tracks personal milestones such as
                        birthdays and anniversaries.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold dark:text-white">
                      How Does an Age Calculator Work?
                    </h3>
                    <p className="text-lg text-gray-800 dark:text-neutral-200">
                      Age calculators use algorithms to determine the difference
                      between the current date and the date of birth:
                    </p>
                    <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                      <li>
                        Input Date: Users input their date of birth into the
                        calculator.
                      </li>
                      <li>
                        Verification: The tool verifies the format and validity
                        of the input date.
                      </li>
                      <li>
                        Calculation: It calculates the difference, accounting
                        for leap years and different month lengths.
                      </li>
                      <li>
                        Output: The result shows the exact age in years, months,
                        and days.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold dark:text-white">
                      Types of Age Calculators
                    </h3>
                    <p className="text-lg text-gray-800 dark:text-neutral-200">
                      Different types of age calculators serve various purposes:
                    </p>
                    <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                      <li>Basic Age Calculator: Computes age in years.</li>
                      <li>
                        Detailed Age Calculator: Provides age in years, months,
                        and days.
                      </li>
                      <li>
                        Biological Age Calculator: Estimates biological age
                        based on health data.
                      </li>
                      <li>
                        Retirement Age Calculator: Calculates optimal retirement
                        age based on financial and health inputs.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold dark:text-white">
                      Benefits of Using an Age Calculator
                    </h3>
                    <table className="min-w-full bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 bg-gray-100 dark:bg-neutral-700 font-semibold text-gray-800 dark:text-white">
                            Benefit
                          </th>
                          <th className="py-2 px-4 bg-gray-100 dark:bg-neutral-700 font-semibold text-gray-800 dark:text-white">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-4 text-gray-800 dark:text-neutral-200">
                            Accuracy
                          </td>
                          <td className="py-2 px-4 text-gray-800 dark:text-neutral-200">
                            Provides precise calculations considering leap years
                            and month variations.
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-800 dark:text-neutral-200">
                            Convenience
                          </td>
                          <td className="py-2 px-4 text-gray-800 dark:text-neutral-200">
                            Fast and easy to use with minimal inputs.
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-800 dark:text-neutral-200">
                            Versatility
                          </td>
                          <td className="py-2 px-4 text-gray-800 dark:text-neutral-200">
                            Useful in various fields including finance, health,
                            and legal.
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-800 dark:text-neutral-200">
                            Accessibility
                          </td>
                          <td className="py-2 px-4 text-gray-800 dark:text-neutral-200">
                            Available online and often free of charge.
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-gray-800 dark:text-neutral-200">
                            Educational
                          </td>
                          <td className="py-2 px-4 text-gray-800 dark:text-neutral-200">
                            Helps understand time measurement and calendar
                            calculations.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold dark:text-white">
                      SEO Benefits of Age Calculators
                    </h3>
                    <p className="text-lg text-gray-800 dark:text-neutral-200">
                      Integrating age calculators into websites can enhance SEO
                      performance:
                    </p>
                    <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">
                      <li>
                        Keyword Optimization: Use relevant keywords to attract
                        targeted traffic.
                      </li>
                      <li>
                        Meta Descriptions: Include informative meta descriptions
                        for better search engine visibility.
                      </li>
                      <li>
                        Rich Content: Detailed content can improve user
                        engagement and time spent on the page.
                      </li>
                      <li>
                        Mobile Optimization: Ensure mobile compatibility to
                        cater to a broader audience.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold dark:text-white">
                      Conclusion
                    </h3>
                    <p className="text-lg text-gray-800 dark:text-neutral-200">
                      Age calculators are powerful tools for accurately
                      determining age for various purposes, from personal
                      milestones to professional planning. Their ease of use,
                      accuracy, and versatility make them an essential tool in
                      today's digital world. Whether you're planning your
                      future, assessing health risks, or simply curious about
                      age calculations, using an age calculator can provide you
                      with quick and precise results.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Sidebar />
          </div>
        </div>
      </>
    </>
  );
};

export default AgeCalculator;
