import { useState } from "react";

const UseProgramForm = () => {
  const [skills, setSkills] = useState([]);
  const [image, setImage] = useState(null);
  return { skills, setSkills, image, setImage };
};

export default UseProgramForm;
