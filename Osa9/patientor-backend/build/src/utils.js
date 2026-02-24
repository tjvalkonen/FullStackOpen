"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPatientSchema = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
const BaseEntrySchema = zod_1.z.object({
    id: zod_1.z.string(),
    description: zod_1.z.string().min(1),
    date: zod_1.z.string().date(),
    specialist: zod_1.z.string().min(1),
    diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional(),
});
const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: zod_1.z.literal("HealthCheck"),
    healthCheckRating: zod_1.z.number().int().min(0).max(3),
});
const HospitalEntrySchema = BaseEntrySchema.extend({
    type: zod_1.z.literal("Hospital"),
    discharge: zod_1.z.object({
        date: zod_1.z.string().date(),
        criteria: zod_1.z.string().min(1),
    }),
});
const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: zod_1.z.literal("OccupationalHealthcare"),
    employerName: zod_1.z.string().min(1),
    sickLeave: zod_1.z.object({
        startDate: zod_1.z.string().date(),
        endDate: zod_1.z.string().date(),
    }).optional(),
});
// Yhdistetään tyypit unioniksi 'type'-kentän perusteella
const EntrySchema = zod_1.z.discriminatedUnion("type", [
    HealthCheckEntrySchema,
    HospitalEntrySchema,
    OccupationalHealthcareEntrySchema,
]);
exports.NewPatientSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty(),
    ssn: zod_1.z.string().nonempty(),
    occupation: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().date(),
    gender: zod_1.z.enum(types_1.Gender),
    entries: zod_1.z.array(EntrySchema).default([]),
});
const toNewPatient = (object) => {
    return exports.NewPatientSchema.parse(object);
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
exports.default = toNewPatient;
