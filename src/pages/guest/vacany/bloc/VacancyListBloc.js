import { useState } from "react";
import { useNavigate } from "react-router";

const VacancyListBloc = (programService,useVacancyList) => {
  let { list, setList } = useVacancyList()
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate();
  let { getInformationProgram } = programService();
  const getListJobInformation = async (params) => {
    try {
      setLoading(true)
      const response = await getInformationProgram(params);
      setList(response.data.data);
      setPagination(response.data.pagination)
      setLoading(false)
      return list;
    } catch (err) {
      throw err;
    }
  };
  return {
    list,
    loading,
    pagination,
    navigate,
    getListJobInformation,
  };
};

export default VacancyListBloc;
