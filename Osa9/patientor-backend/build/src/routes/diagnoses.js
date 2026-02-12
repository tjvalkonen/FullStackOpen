"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoseService_1 = __importDefault(require("../services/diagnoseService"));
// import { Response } from 'express';
// import { Diagnosis } from "../types";
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    // res.send('Fetching all diagnoses!');
    res.send(diagnoseService_1.default.getDiagnoses());
});
/*
router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});
*/
exports.default = router;
