import { useState } from "react";

const UseProgramForm = () => {
  const [skills, setSkills] = useState([]);
  return { skills, setSkills };
};

export default UseProgramForm;
