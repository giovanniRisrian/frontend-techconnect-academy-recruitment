import { useState } from "react";

const UseDetailApplicant = () => {
  const [program, setProgram] = useState({});
  const [applicantStatus, setApplicantStatus] = useState({});
  const [action, setAction] = useState(false);

  return {
    program,
    setProgram,
    applicantStatus,
    setApplicantStatus,
    action,
    setAction,
  };
};
export default UseDetailApplicant;
