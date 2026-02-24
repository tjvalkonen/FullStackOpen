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

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Sickleave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: Sickleave;
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}


export type Entry = | HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

/*
export interface Entry {
    id: string;
}
*/

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