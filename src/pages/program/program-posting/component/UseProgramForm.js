import { useState } from "react";

const UseProgramForm = () => {
  // const [skills, setSkills] = useState([]);
  const [image, setImage] = useState(null);
  const [programType, setProgramType] = useState([]);
  return { image, setImage, programType, setProgramType };
};

export default UseProgramForm;
