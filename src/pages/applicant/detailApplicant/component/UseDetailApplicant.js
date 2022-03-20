import { useState } from "react";

const UseDetailApplicant = () => {
  const [program, setProgram] = useState({});
  const [applicantStatus, setApplicantStatus] = useState({});

  return {
    program,
    setProgram,
    applicantStatus,
    setApplicantStatus,
  };
};
export default UseDetailApplicant;
