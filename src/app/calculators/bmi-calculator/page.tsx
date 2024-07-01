// BMICalculator.tsx
"use client"
import { useState } from 'react';

const BMICalculator = () => {
  const [gender, setGender] = useState<string>('');
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [results, setResults] = useState<any>(null);

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
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">BMI Calculator</h1>
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
      <button className="bg-blue-500 text-white p-2 rounded" onClick={calculate}>Calculate</button>
      {results && (
        <div className="mt-5">
          <p><strong>BMI:</strong> {results.bmi}</p>
          <p><strong>Category:</strong> {results.category}</p>
          <p><strong>BMI Range:</strong> {results.bmiRange}</p>
          <p><strong>Weight Range:</strong> {results.range}</p>
          <p><strong>Ponderal Index:</strong> {results.pi}</p>
          <p><strong>Gain to reach:</strong> {results.diff.gainLabel}</p>
          <p>{results.diff.gain}</p>
          <p><strong>Lose to reach:</strong> {results.diff.loseLabel}</p>
          <p>{results.diff.lose}</p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
