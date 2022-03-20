import { useState } from "react";

const UseApplicantList = () => {
  const [applicantList, setApplicantList] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [programId, setProgramId] = useState("");
  const [program, setProgram] = useState("");
  const [page, setPage] = useState(1);
  const [step, setStep] = useState(1);
  const [actualStep, setActualStep] = useState(0);
  const [isProgram, setIsProgram] = useState(false);
  const [isAccepted, setIsAccepted] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [lastPage, setLastPage] = useState(1);
  const [searchBy, setSearchBy] = useState("");

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
    actualStep,
    setActualStep,
    isAccepted,
    setIsAccepted,
    searchValue,
    setSearchValue,
    lastPage,
    setLastPage,
    searchBy,
    setSearchBy,
  };
};

export default UseApplicantList;
