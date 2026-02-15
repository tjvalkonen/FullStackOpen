"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object &&
        'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry = {
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
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error('Incorrect or missing dateOfBirth');
    }
    return dateOfBirth;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
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
