import { Gender, NewPatientEntry } from "./types";
import { z } from 'zod';

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string().min(1),
  date: z.string().date(),
  specialist: z.string().min(1),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.number().int().min(0).max(3),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string().min(1),
  }),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date(),
  }).optional(),
});

// Yhdistetään tyypit unioniksi 'type'-kentän perusteella
const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

export const NewPatientSchema = z.object({
  name: z.string().nonempty(),
  ssn: z.string().nonempty(),
  occupation: z.string().optional(),
  dateOfBirth: z.string().date(),
  gender: z.enum(Gender),
  entries: z.array(EntrySchema).default([]),
});

const toNewPatient = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};


/*
const toNewPatient = (object: unknown): NewPatient => {

  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 
    'ssn' in object && 'gender' in object && 'occupation' in object ) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
  return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};
*/
/*
const parseName = (name: unknown): string => {

  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  // return comment;

  // Using Zod
  return z.string().parse(name);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};


const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};
*/

/*

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth');
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isGender = (param:string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

*/

/*
const toNewPatient = (object: unknown): NewPatient => {

 console.log(object); // now object is no longer unused
 const newEntry: NewPatient = {
   name: 'Testi Heppu', // fake the return value
   dateOfBirth: '1986-07-09',
   ssn: '300179-77A',
   gender: 'male',
   occupation: 'Fake news reporter',
 };

 return newEntry;
};
*/


export default toNewPatient;