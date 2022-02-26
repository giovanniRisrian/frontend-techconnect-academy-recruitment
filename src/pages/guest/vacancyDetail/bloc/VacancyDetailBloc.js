import { useState } from "react";
import { useParams, useNavigate } from "react-router";

const VacancyDetailBloc = (programService) => {
  let params = useParams();
  let navigate = useNavigate();
  const[programDetail, setProgramDetail]= useState({})
  let {getDetailInformationProgram } = programService();

  const getProgrambyId = async () => {
    try {
      const response = await getDetailInformationProgram(params.id);
      setProgramDetail(response.data)
      return programDetail
    } catch (err) {
      throw err;
    }
  };
  return {
    programDetail,
    navigate,
    getProgrambyId,
  };
};

export default VacancyDetailBloc;
