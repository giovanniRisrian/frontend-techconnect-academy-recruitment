import { useState } from "react";
import { useParams, useNavigate } from "react-router";

const VacancyDetailBloc = (programService) => {
  let params = useParams();
  let navigate = useNavigate();
  const[programDetail, setProgramDetail]= useState({})
  let {getDetailInformationProgram, applyProgram } = programService();

  const getProgrambyId = async () => {
    try {
      const response = await getDetailInformationProgram(params.id);
      setProgramDetail(response.data)
      return programDetail
    } catch (err) {
      throw err;
    }
  };
  const doApplyProgram = async (values, context) =>{
      try{
        const config = {
          headers: { Authorization: `Bearer ${context.userInfo}` },
        };
        let res = await applyProgram(values,config);
        return res
      }catch(err){
        throw(err)
      }
  }
  
  return {
    programDetail,
    navigate,
    getProgrambyId,
    doApplyProgram
  };
};

export default VacancyDetailBloc;
