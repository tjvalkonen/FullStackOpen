import { Patient, Gender } from "../../types";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';


import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientPage = () => {
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
    </div>

  );
};

export default PatientPage;
