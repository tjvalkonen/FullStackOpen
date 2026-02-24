import { Patient, Gender, Entry, Diagnosis, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import { Box } from '@mui/material';
import HealthRatingBar from "../HealthRatingBar";

interface Props {
  diagnoses : Diagnosis[]
}

 /**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => (
  <div>
    <p><strong>{entry.date}</strong>  <MedicalServicesIcon/><br/>
    <i>{entry.description}</i></p>
    <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
    <p>diagnose by {entry.specialist}</p>
  </div>
);

const Hospital = ({ entry }: { entry: HospitalEntry }) => (
  <div>
    <p><strong>{entry.date}</strong> <LocalHospitalIcon/><br/>
    <i>{entry.description}</i></p>
    <p>Discharge: {entry.discharge.date} - {entry.discharge.criteria}</p>
    <p>diagnose by {entry.specialist}</p>
  </div>
);

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => (
  <div>
    <p><strong>{entry.date}</strong>  <WorkIcon/> {entry.employerName}<br/>
    <i>{entry.description}</i></p>

    {entry.sickLeave && (
     <p>Sickleave: {entry.sickLeave.startDate} – {entry.sickLeave.endDate}</p>
    )}

    <p>diagnose by {entry.specialist}</p>
  </div>
);

const PatientPage = ({ diagnoses } : Props ) => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        return <div>bad id!</div>;
      }
      const currentPatient = await patientService.getById(id);
      setPatient(currentPatient);
    };
    void fetchPatient();
  }, [id, setPatient]);

  const genderIcon = () => {
    switch (patient?.gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

return (
  <div>
    <h1>{patient?.name} {genderIcon()}</h1>
    <p>ssn: {patient?.ssn}<br/>
    occupation: {patient?.occupation}</p>
    <h2>entries</h2>
    {patient?.entries.map((entry: Entry) => (
      <div key={entry.id} >
      <Box  component="section" sx={{ p: 1, border: '1px dashed grey' }}>
      <EntryDetails key={entry.id} entry={entry} />
      <ul>
        {entry.diagnosisCodes?.map((code: string) => {
        // 'code' on merkkijono, esim. "M24.2"
        const diagnosis = diagnoses.find(d => d.code === code);  
        return (
         <li key={code}>
           {code} {diagnosis?.name}
         </li>
        );
        })}
      </ul>
      </Box>
    </div>
    ))}
  </div>
  );
};

export default PatientPage;


