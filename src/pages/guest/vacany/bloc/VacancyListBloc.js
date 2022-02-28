import { useState } from "react";
import { useNavigate } from "react-router";

const VacancyListBloc = (programService,useVacancyList) => {
  let { list, setList } = useVacancyList()
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate();
  let { getInformationProgram } = programService();
  const getListJobInformation = async (page) => {
    try {
      setLoading(true)
      const response = await getInformationProgram(page);
      setList(response.data.data);
      setLoading(false)
      return list;
    } catch (err) {
      throw err;
    }
  };
  return {
    list,
    loading,
    navigate,
    getListJobInformation,
  };
};

export default VacancyListBloc;
