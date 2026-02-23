import { z } from 'zod';
import { NewPatientSchema } from './utils';

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
};



// export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
};

export type NewPatientEntry = z.infer<typeof NewPatientSchema>; 


export interface Entry {
    id: string;
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation?: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries' >;

/*
export interface Patient extends NewPatientEntry{
    id: string;
    entries: Entry[];
//    name: string;
//    dateOfBirth: string;
//    ssn: string;
//    gender: Gender;
//    occupation: string;
};
*/