// const express = require('express');

import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';


const app = express();

app.use(express.json());

// import qs from 'qs';

// app.set('query parser', (str: string) => qs.parse(str));

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  // console.log(_req.query.height)
  // console.log(_req.query.weight)
  // const {height, weight} = _req.query
  const heightNumber = Number(_req.query.height);
  const weightNumber = Number(_req.query.weight);

  if(isNaN(heightNumber) || isNaN(weightNumber) || heightNumber === 0 || weightNumber === 0) {
    return res.status(400).send({ error: 'malformatted parameters'});
  }

  // console.log("Get: h "+heightNumber)
  // console.log("Get: m "+weightNumber)
  return res.send(calculateBmi(heightNumber, weightNumber));
});

app.post('/exercises', (_req, res) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = _req.body;

  if ( !target || !daily_exercises ) {
    return res.status(400).send({ error: 'parameters missing'});
  }

  // console.log(Number(target) + daily_exercises);

  const result = calculateExercises(
    [2,3,4,5], Number(target)
  );
  
  return res.json({ result });

});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});