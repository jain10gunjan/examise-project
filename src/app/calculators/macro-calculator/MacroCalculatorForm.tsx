"use client"
import { useState } from 'react';
import { calculate } from '../../../lib/calculators';

const MacroCalculatorForm: React.FC = () => {
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
            <option value={4}>Very active (hard exercise/sports 6-7 days a week)</option>
            <option value={5}>Super active (very hard exercise/sports & physical job)</option>
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
  );
};

export default MacroCalculatorForm;