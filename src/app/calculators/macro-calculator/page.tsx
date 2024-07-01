"use client";
import React, { useState, useEffect } from 'react';
import { calculate } from '../../../lib/calculators';

const CreateYourOwnTable: React.FC = () => {
  const initialInput = {
    gender: 'male',
    activity: 1,
    formula: 1,
    goal: 0,
    weight: 65,
    height: 180,
    age: 25,
    fat: 20,
  };

  const data = calculate(initialInput);
  const initialProtein =  parseInt(data[0].Protein);
  const initialCarbs = parseInt(data[0].Carbs);
  const initialFat = parseInt(data[0].Fat);
  const totalCalories = parseFloat(data[0].FoodEnergy);

  const [protein, setProtein] = useState<number>(initialProtein);
  const [carbs, setCarbs] = useState<number>(initialCarbs);
  const [fat, setFat] = useState<number>(initialFat);
  const [tableData, setTableData] = useState<any[]>(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleProteinChange = (value: number) => {
    const remainingCalories = totalCalories - (value * 4);
    const newCarbs = remainingCalories / 4;
    const newFat = ( remainingCalories) / 36;
  
    setProtein(value);
    setCarbs(newCarbs);
    setFat(newFat);
  };
  
  const handleCarbsChange = (value: number) => {
    const remainingCalories = totalCalories - (value * 4);
    const newProtein = remainingCalories / 4;
    const newFat = (remainingCalories - (newProtein * 4)) / 9;
  
    setCarbs(value);
    setProtein(newProtein);
    setFat(newFat);
  };
  
  const handleFatChange = (value: number) => {
    const remainingCalories = totalCalories - (value * 9);
    const newProtein = remainingCalories / 4;
    const newCarbs = (remainingCalories - (newProtein * 4)) / 4;
  
    setFat(value);
    setProtein(newProtein);
    setCarbs(newCarbs);
  };
  

//   const calculateBMR = (protein: number, carbs: number, fat: number) => {
//     return protein * 4 + carbs * 4 + fat * 9;
//   };

  const bmr = parseFloat(data[0].FoodEnergy);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Your Own</h2>
      
      <div className="mb-4">
        <label htmlFor="proteinSlider" className="block text-sm font-medium text-gray-700">
          Protein: <span>{protein.toFixed(0)} grams/day</span>
        </label>
        <input
          type="range"
          id="proteinSlider"
          min="0"
          max={initialProtein * 2}
          step="1"
          value={protein}
          onChange={(e) => handleProteinChange(Number(e.target.value))}
          className="w-full mt-1"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="carbsSlider" className="block text-sm font-medium text-gray-700">
          Carbs: <span>{carbs.toFixed(0)} grams/day</span>
        </label>
        <input
          type="range"
          id="carbsSlider"
          min="0"
          max={initialCarbs * 2}
          step="1"
          value={carbs}
          onChange={(e) => handleCarbsChange(Number(e.target.value))}
          className="w-full mt-1"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="fatSlider" className="block text-sm font-medium text-gray-700">
          Fat: <span>{fat.toFixed(0)} grams/day</span>
        </label>
        <input
          type="range"
          id="fatSlider"
          min="0"
          max={initialFat * 2}
          step="1"
          value={fat}
          onChange={(e) => handleFatChange(Number(e.target.value))}
          className="w-full mt-1"
        />
      </div>

      <h3 className="text-lg font-semibold mt-4">Results:</h3>
      <table className="min-w-full bg-white mb-4">
        <tbody>
          <tr>
            <td className="border px-4 py-2">Protein:</td>
            <td className="border px-4 py-2">{protein.toFixed(0)} grams/day</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Carbs:</td>
            <td className="border px-4 py-2">{carbs.toFixed(0)} grams/day</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Fat:</td>
            <td className="border px-4 py-2">{fat.toFixed(0)} grams/day</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Food Energy:</td>
            <td className="border px-4 py-2">{bmr.toFixed(0)} Calories/day</td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-4">Standard Diet Plans:</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Level</th>
            <th className="border px-4 py-2">Protein</th>
            <th className="border px-4 py-2">Protein Range</th>
            <th className="border px-4 py-2">Carbs</th>
            <th className="border px-4 py-2">Carbs Range</th>
            <th className="border px-4 py-2">Fat</th>
            <th className="border px-4 py-2">Fat Range</th>
            <th className="border px-4 py-2">Sugar</th>
            <th className="border px-4 py-2">Saturated Fat</th>
            <th className="border px-4 py-2">Food Energy</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{row.Level}</td>
              <td className="border px-4 py-2">{row.Protein}</td>
              <td className="border px-4 py-2">{row.ProteinRange}</td>
              <td className="border px-4 py-2">{row.Carbs}</td>
              <td className="border px-4 py-2">{row.CarbsRange}</td>
              <td className="border px-4 py-2">{row.Fat}</td>
              <td className="border px-4 py-2">{row.Fatrange}</td>
              <td className="border px-4 py-2">{row.Sugar}</td>
              <td className="border px-4 py-2">{row.SaturatedFat}</td>
              <td className="border px-4 py-2">{row.FoodEnergy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateYourOwnTable;
