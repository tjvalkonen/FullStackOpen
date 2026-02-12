interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface InputValues {
    targetValue: number;
    dailyHours: Array<number>;
}

const parseArguments = (args: string[]): InputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');


    const daysSplice = args.splice(3);
    // console.log(daysSplice)

    const days = daysSplice.map(Number);
    // Check if numbers!
    // console.log(days.some((d) => typeof d !== "number" || isNaN(d)))
    // console.log(days)
    // if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    if (!isNaN(Number(args[2])) && !(days.some((d) => typeof d !== "number" || isNaN(d)))) {
      return {
        targetValue: Number(args[2]),
        dailyHours: days
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

export const calculateExercises = (dailyHours: number[], targetValue: number): Result => {

    const periodLength = dailyHours.length;
    // check zero days
    // console.log(dailyHours)
    const trainingDays = dailyHours.filter(val => val !==0).length;
    
    const totalTime = dailyHours.reduce((acc, curr) => acc + curr, 0);
    const average = totalTime/periodLength;

    let ratingDescriptionNew = "";
    let rating = 0;

    if(average < (targetValue/2)) {
        rating = 1;
        ratingDescriptionNew = 'Not good. Under halve of the target. You can do better :)';
    } else if(average >= (targetValue/2) && average < targetValue) {
        rating = 2;
        ratingDescriptionNew = 'not too bad but could be better';
    } else if (average >= targetValue) {
        rating = 3;
        ratingDescriptionNew = 'Target met! Most excellent!';
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: (average >= targetValue),
        rating: rating,
        ratingDescription: ratingDescriptionNew,
        target: targetValue,
        average: average
    };
};

// const targetValue: number = Number(process.argv[2])
// let dailyHours: Array<number>,(process.argv[3])
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

if (require.main === module) { 

try {
  const { targetValue, dailyHours } = parseArguments(process.argv);

  console.log(calculateExercises(dailyHours, targetValue));

} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
}

export default calculateExercises;