const calculateBmi = (height: number, mass: number) => {
  const bmi = mass/((height/100)*(height/100))
  var resultText
  if(bmi < 16 ){
    resultText = "Underweight (Severe thinness)"
  } else if (16 <= bmi && bmi < 17) {
    resultText = "Underweight (Moderate thinness)"
  } else if (17 <= bmi && bmi < 18.5) {
    resultText = "Underweight (Mild thinness)"
  } else if (18.5 <= bmi && bmi < 25) {
    resultText = "Normal range"
  } else if (25 <= bmi && bmi < 30) {
    resultText = "Overweight (Pre-obese)"
  } else if (30 <= bmi && bmi < 35) {
    resultText = "Obese (Class I)"
  } else if (35 <= bmi && bmi < 40) {
    resultText = "Obese (Class II)"
  } else if (40 <= bmi) {
    resultText = "Obese (Class III)"
  } 

  /*
  if(bmi < 16 ){
    return "Underweight (Severe thinness)"
  } else if (16 <= bmi && bmi < 17) {
    return "Underweight (Moderate thinness)"
  } else if (17 <= bmi && bmi < 18.5) {
    return "Underweight (Mild thinness)"
  } else if (18.5 <= bmi && bmi < 25) {
    return "Normal range"
  } else if (25 <= bmi && bmi < 30) {
    return "Overweight (Pre-obese)"
  } else if (30 <= bmi && bmi < 35) {
    return "Obese (Class I)"
  } else if (35 <= bmi && bmi < 40) {
    return "Obese (Class II)"
  } else if (40 <= bmi) {
    return "Obese (Class III)"
  }
  */
  console.log(resultText);
}

const height: number = Number(process.argv[2])
const mass: number = Number(process.argv[3])

calculateBmi(height, mass)

// console.log(calculateBmi(180, 74));