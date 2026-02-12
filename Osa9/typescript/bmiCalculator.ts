

interface Result {
  weight: number;
  height: number;
  bmi: string;
}

export const calculateBmi = (height: number, mass: number): Result => {
  const bmi = mass/((height/100)*(height/100));
  let resultText = "";
  if(bmi < 16 ){
    resultText = "Underweight (Severe thinness)";
  } else if (16 <= bmi && bmi < 17) {
    resultText = "Underweight (Moderate thinness)";
  } else if (17 <= bmi && bmi < 18.5) {
    resultText = "Underweight (Mild thinness)";
  } else if (18.5 <= bmi && bmi < 25) {
    resultText = "Normal range";
  } else if (25 <= bmi && bmi < 30) {
    resultText = "Overweight (Pre-obese)";
  } else if (30 <= bmi && bmi < 35) {
    resultText = "Obese (Class I)";
  } else if (35 <= bmi && bmi < 40) {
    resultText = "Obese (Class II)";
  } else if (40 <= bmi) {
    resultText = "Obese (Class III)";
  } 

  //console.log(resultText);
  /*
  return {
    weight: mass,
    height: height,
    bmi: resultText
  }
*/
  if (!isNaN(height) && !isNaN(mass) && height !== 0 && mass !== 0) {
    return {
      weight: mass,
      height: height,
      bmi: resultText
    };
  } else {
      throw new Error('malformatted parameters');
  }
};

if (require.main === module) { 
  const height: number = Number(process.argv[2]);
  const mass: number = Number(process.argv[3]);
  console.log(calculateBmi(height, mass));
}
//const height: number = Number(process.argv[2])
//const mass: number = Number(process.argv[3])

// calculateBmi(height, mass)

export default calculateBmi;

// console.log(calculateBmi(180, 74));