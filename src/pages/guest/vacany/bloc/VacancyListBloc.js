import { useState } from "react";
import { useNavigate } from "react-router";

import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
const VacancyListBloc = (programService,useVacancyList) => {

  const {state} = useLocation();
  let { list, setList } = useVacancyList()
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate();
  let { getInformationProgram } = programService();
  const getListJobInformation = async (page) => {
    // console.log(page, created);
console.log(state)
    try {
      setLoading(true)
      if(!state){

      const response = await getInformationProgram(page);
      console.log(response.data.data)
      setList(response.data.data);

      }else{
        setList({ProgramList:state,LastPage:1})
      }
      
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
