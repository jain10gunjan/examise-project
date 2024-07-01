// AgeCalculator.tsx
"use client"
import { useState } from 'react';

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

    resultsArray.unshift(plural(seconds, 's'));
    resultsArray.unshift(plural(minutes, 'm'));
    resultsArray.unshift(plural(hours, 'h'));
    resultsArray.unshift(plural(days, 'd'));

    // Calculate weeks
    const weeks = Math.trunc(days / 7);
    const weekRemainDays = days % 7;
    let weekResult = '';
    if (weeks > 0) weekResult = plural(weeks, 'w');
    if (weeks > 0 && weekRemainDays > 0) weekResult += ` ${plural(weekRemainDays, 'd')}`;
    if (weekResult.length) resultsArray.unshift(weekResult);

    // Calculate months
    let monthsResult = '';
    let months = 12 * diff.y + diff.m;
    if (months > 0) monthsResult = plural(months, 'mo');
    if (months > 0 && diff.d > 0) monthsResult += ` ${plural(diff.d, 'd')}`;
    if (monthsResult.length) resultsArray.unshift(monthsResult);

    // Calculate years
    let yearsResult = '';
    const years = diff.y;
    if (years > 0) {
      yearsResult = `${plural(diff.y, 'y')} ${plural(diff.m, 'mo')} ${plural(diff.w, 'w')} ${plural(diff.d, 'd')}`;
    }
    if (yearsResult.length) resultsArray.unshift(yearsResult);

    setResults(resultsArray);
  };

  const plural = (number: number, label: string) => {
    switch (label) {
      case 'd':
        return number === 1 ? `${number} day` : `${number} days`;
      case 'w':
        return number === 1 ? `${number} week` : `${number} weeks`;
      case 'mo':
        return number === 1 ? `${number} month` : `${number} months`;
      case 'y':
        return number === 1 ? `${number} year` : `${number} years`;
      case 'h':
        return number === 1 ? `${number} hour` : `${number} hours`;
      case 'm':
        return number === 1 ? `${number} minute` : `${number} minutes`;
      case 's':
        return number === 1 ? `${number} second` : `${number} seconds`;
      default:
        return '';
    }
  };

  const dateDiff = (startDate: Date, endDate: Date) => {
    const startYear = startDate.getFullYear();
    const february =
      (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    const daysInMonth = [
      31,
      february,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

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

  return (
    <div className="container mx-auto mt-10">
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
    </div>
  );
};

export default AgeCalculator;
