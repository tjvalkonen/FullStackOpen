import patients from "../../data/patients";
import { NonSensitivePatient, NewPatient } from "../types";
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,

    }));
};

const addPatient = (entry: NewPatient): NewPatient => {
    const newPatient = {
      id: uuid(),
      ...entry
    };

    patients.push(newPatient);
    return newPatient;
};

/*
const addPatient = (
    name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string
    ): Patient => {

    const newPatient ={
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      id: uuid(),
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
    };

    patients.push(newPatient);
    return newPatient;

};
*/
export default {
    // getPatients,
    getNonSensitivePatients,
    addPatient
};