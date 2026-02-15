
import express from 'express';
import patientService from '../services/patientService';

import { Response } from 'express';
import { NonSensitivePatient } from "../types";

import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

  /*
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient = patientService.addPatient(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  );
  */
});

/*
        "name": "John McClane",
        "dateOfBirth": "1986-07-09",
        "ssn": "090786-122X",
        "gender": "male",
        "occupation": "New york city cop"
*/

export default router;