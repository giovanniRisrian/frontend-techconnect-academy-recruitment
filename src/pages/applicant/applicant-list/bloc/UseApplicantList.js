import { useState } from "react";

const UseApplicantList = () => {
  const [applicantList, setApplicantList] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [programId, setProgramId] = useState("");
  const [program, setProgram] = useState("");
  const [page, setPage] = useState(1);

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
  };
};

export default UseApplicantList;
