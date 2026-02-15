"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
//const id = uuid();
const getNonSensitivePatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ 
        // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: (0, uuid_1.v1)() }, entry);
    patients_1.default.push(newPatient);
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
exports.default = {
    // getPatients,
    getNonSensitivePatients,
    addPatient
};
