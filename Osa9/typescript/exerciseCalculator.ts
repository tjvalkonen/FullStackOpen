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


    const daysSplice = args.splice(3)
    // console.log(daysSplice)

    const days = daysSplice.map(Number);
    // Check if numbers! Not done?
    // console.log(days.some((d) => typeof d !== "number" || isNaN(d)))


    // typeof x === "number"
    // console.log(days)

    // if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    if (!isNaN(Number(args[2])) && !(days.some((d) => typeof d !== "number" || isNaN(d)))) {
      return {
        targetValue: Number(args[2]),
        // only first of array must fix!
        dailyHours: days
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }

}

const calculateExercises = (dailyHours: number[], targetValue: number): Result => {
    // const days = 2
    const periodLength = dailyHours.length
    // check zero days
    // console.log(dailyHours)
    const trainingDays = dailyHours.filter(val => val !==0).length
    
    const totalTime = dailyHours.reduce((acc, curr) => acc + curr, 0)
    const average = totalTime/periodLength

    let ratingDescription
    let rating

    if(average < (targetValue/2)) {
        rating = 1
        ratingDescription = 'Not good. You can do better :)'
    } else if(average >= (targetValue/2) && average < targetValue) {
        rating = 2
        ratingDescription = 'not too bad but could be better'
    } else if (average >= targetValue) {
        rating = 3
        ratingDescription = 'Target met! Most excellent!'
    }

    
    // --> console log
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: (average >= targetValue),
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetValue,
        average: average
    }
    /*
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: (average >= targetValue),
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetValue,
        average: average
    }
    */
}

// const targetValue: number = Number(process.argv[2])
// let dailyHours: Array<number>,(process.argv[3])

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))


try {
  const { targetValue, dailyHours } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, targetValue));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}