interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (dailyHours: number[], targetValue: number): Result => {
    // const days = 2
    const periodLength = dailyHours.length
    // check zero days
    const trainingDays = dailyHours.filter(val => val !==0).length
    
    const totalTime = dailyHours.reduce((acc, curr) => acc + curr, 0)
    const average = totalTime/periodLength

    let ratingDescription
    let rating

    if(average < (targetValue/2)) {
        rating = 1
        ratingDescription = 'not good. You can do better :)'
    } else if(average >= (targetValue/2) && average < targetValue) {
        rating = 2
        ratingDescription = 'not too bad but could be better'
    } else if (average >= targetValue) {
        rating = 3
        ratingDescription = 'Target met! Most excellent!'
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: (average >= targetValue),
        rating: rating,
        ratingDescription: ratingDescription,
        // check zero days
        target: targetValue,
        average: average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))