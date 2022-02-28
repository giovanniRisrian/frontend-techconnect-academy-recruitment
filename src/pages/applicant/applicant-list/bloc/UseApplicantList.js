import { useState } from "react";

const UseApplicantList = () => {
  const [applicantList, setApplicantList] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [programId, setProgramId] = useState("");
  const [program, setProgram] = useState("");
  const [page, setPage] = useState(1);
  const [step, setStep] = useState(0);
  const [isProgram, setIsProgram] = useState(false);

  return {
    applicantList,
    setApplicantList,
    programList,
    setProgramList,
    program,
    setProgram,
    page,
    setPage,
    programId,
    setProgramId,
    step,
    setStep,
    isProgram,
    setIsProgram,
  };
};

export default UseApplicantList;
