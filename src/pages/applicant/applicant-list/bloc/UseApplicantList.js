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
  const [isAccepted, setIsAccepted] = useState("true");
  const [searchValue, setSearchValue] = useState("");
  const [lastPage, setLastPage] = useState(1);
  const [searchBy, setSearchBy] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [pageSize2, setPageSize2] = useState(5);
  const [showModal, setShowModal] = useState(false);

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
    error,
    setError,
    isLoading,
    setIsLoading,
    pageSize,
    setPageSize,
    pageSize2,
    setPageSize2,
    showModal,
    setShowModal,
  };
};

export default UseApplicantList;
