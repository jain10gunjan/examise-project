export function getActivityValue(activity: number): number {
  switch (activity) {
      case 1: return 1.2;
      case 2: return 1.375;
      case 3: return 1.465;
      case 4: return 1.55;
      case 5: return 1.725;
      case 6: return 1.9;
      default: return 1;
  }
}

export function getGoalValue(goal: number): number {
  switch (goal) {
      case 0: return 1;
      case 1: return -250;
      case 2: return -500;
      case 3: return -1000;
      case 4: return 250;
      case 5: return 500;
      case 6: return 1000;
      default: return 0;
  }
}

export function calculate(input: any) {
  const gender = input.gender;
  const activity = input.activity;
  const formula = input.formula;
  const goal = input.goal;
  const weight = input.weight;
  const height = input.height;
  const age = input.age;
  const bodyFat = input.fat;

  let bmr = 0;
  let activityVal = getActivityValue(activity);
  let goalVal = getGoalValue(goal);

  switch (formula) {
      case 1:
          if (gender === 'male') {
              bmr = 10 * weight + 6.25 * height - 5 * age + 5;
          } else {
              bmr = 10 * weight + 6.25 * height - 5 * age - 161;
          }
          break;
      case 2:
          bmr = 370 + 21.6 * (1 - bodyFat / 100) * weight;
          break;
  }

  bmr = bmr * activityVal + goalVal;
  const protein = bmr / 4;
  const carbs = bmr / 4;
  const fat = bmr / 9;
  const sugar = (carbs * 0.5325) / 5;
  const saturatedFat = fat * 0.2564 * 0.4;

  return [
      {
          Level: 'No Activity',
          Protein: `${(protein * 0.243267).toFixed(0)} grams/day`,
          ProteinRange: `${weight} - ${(protein * 0.342).toFixed(0)} grams/day`,
          ProteinRangeLowerBound: `${weight}`,
          ProteinRangeUpperBound:`${(protein * 0.342).toFixed(0)}`,
          Carbs: `${(carbs * 0.5325).toFixed(0)} grams/day`,
          CarbsRange: `${(carbs * 0.427).toFixed(0)} - ${((bmr * 0.7) / 3.75).toFixed(0)} grams/day`,
          Fat: `${(fat * 0.2564).toFixed(0)} grams/day`,
          Fatrange: `${(fat * 0.2).toFixed(0)} - ${((bmr * 0.35) / 8.8).toFixed(0)} grams/day`,
          Sugar: `${sugar.toFixed(0)} grams/day`,
          SaturatedFat: `${saturatedFat.toFixed(0)} grams/day`,
          FoodEnergy: `${(bmr.toFixed(0))} Calories/day`,
          activity:`${activityVal}`,
          goal:`${goalVal}`,
      },
      {
          Level: 'Low Fat',
          Protein: `${(protein * 0.26878462143684942).toFixed(0)} grams/day`,
          ProteinRange: `${weight} - ${(protein * 0.342).toFixed(0)} grams/day`,
          ProteinRangeLowerBound: `${weight}`,
          ProteinRangeUpperBound:`${(protein * 0.342).toFixed(0)}`,
          Carbs: `${(carbs * 0.5596844332450851).toFixed(0)} grams/day`,
          CarbsRange: `${(carbs * 0.427).toFixed(0)} - ${((bmr * 0.7) / 3.75).toFixed(0)} grams/day`,
          Fat: `${(fat * 0.2).toFixed(0)} grams/day`,
          Fatrange: `${(fat * 0.2).toFixed(0)} - ${((bmr * 0.35) / 8.8).toFixed(0)} grams/day`,
          Sugar: `${sugar.toFixed(0)} grams/day`,
          SaturatedFat: `${saturatedFat.toFixed(0)} grams/day`,
          FoodEnergy: `${(bmr.toFixed(0))} Calories/day`,
          activity:`${activityVal}`,
          goal:`${goalVal}`,
      },
      {
          Level: 'Low Carb',
          Protein: `${(protein * 0.2926009802983424).toFixed(0)} grams/day`,
          ProteinRange: `${weight} - ${(protein * 0.342).toFixed(0)} grams/day`,
          ProteinRangeLowerBound: `${weight}`,
          ProteinRangeUpperBound:`${(protein * 0.342).toFixed(0)}`,
          Carbs: `${(carbs * 0.427).toFixed(0)} grams/day`,
          CarbsRange: `${(carbs * 0.427).toFixed(0)} - ${((bmr * 0.7) / 3.75).toFixed(0)} grams/day`,
          Fat: `${(fat * 0.3062).toFixed(0)} grams/day`,
          Fatrange: `${(fat * 0.2).toFixed(0)} - ${((bmr * 0.35) / 8.8).toFixed(0)} grams/day`,
          Sugar: `${sugar.toFixed(0)} grams/day`,
          SaturatedFat: `${saturatedFat.toFixed(0)} grams/day`,
          FoodEnergy: `${(bmr.toFixed(0))} Calories/day`,
          activity:`${activityVal}`,
          goal:`${goalVal}`,
      },
      {
          Level: 'High Protein',
          Protein: `${(protein * 0.342).toFixed(0)} grams/day`,
          ProteinRange: `${weight} - ${(protein * 0.342).toFixed(0)} grams/day`,
          ProteinRangeLowerBound: `${weight}`,
          ProteinRangeUpperBound:`${(protein * 0.342).toFixed(0)}`,
          Carbs: `${(carbs * 0.4525).toFixed(0)} grams/day`,
          CarbsRange: `${(carbs * 0.427).toFixed(0)} - ${((bmr * 0.7) / 3.75).toFixed(0)} grams/day`,
          Fat: `${(fat * 0.23).toFixed(0)} grams/day`,
          Fatrange: `${(fat * 0.2).toFixed(0)} - ${((bmr * 0.35) / 8.8).toFixed(0)} grams/day`,
          Sugar: `${sugar.toFixed(0)} grams/day`,
          SaturatedFat: `${saturatedFat.toFixed(0)} grams/day`,
          FoodEnergy: `${(bmr.toFixed(0))} Calories/day`,
          activity:`${activityVal}`,
          goal:`${goalVal}`,
      },
  ];
}

export function numberWithCommas(x: string): string {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
