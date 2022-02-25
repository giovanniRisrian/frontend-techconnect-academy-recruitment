import { useState } from "react";
import { useNavigate } from "react-router";

const VacancyListBloc = (programService) => {
  const [list, setList] = useState([]);
  let navigate = useNavigate();
  let { getInformationProgram } = programService();
  const getListJobInformation = async () => {
    try {
      const response = await getInformationProgram();
      setList(response.data.data);
      return list;
    } catch (err) {
      throw err;
    }
  };
  return {
    list,
    navigate,
    getListJobInformation,
  };
};

export default VacancyListBloc;
