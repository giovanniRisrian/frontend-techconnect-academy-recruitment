import { useState } from "react";

const UseApplicantList = () => {
  const [applicantList, setApplicantList] = useState([]);
  return { applicantList, setApplicantList };
};

export default UseApplicantList;
