import { config } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";

const ListProgramApplyBloc = (statusService) => {
  const [list, setList] = useState({});
  const [loading, setLoading] = useState(false);
  let { getAppliedProgram, getDetailAppliedProgram } = statusService();
  const [statusProgram, setStatusProgram] = useState({});
  let [pages, setPage] = useState(1);

  const getStatusbyId = async (idProgram, idApplicant, context) => {
   
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      setLoading(true)
      const response = await getDetailAppliedProgram(idProgram, idApplicant, config);
      setStatusProgram(response.data.data);
      setLoading(false)
      return statusProgram;
    } catch (err) {
      throw err;
    }
  };
  const getListAppliedProgram = async (page,params, context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      setLoading(true);
      let response = await getAppliedProgram(page,params, config);
      setList(response.data.data);
      setLoading(false);
      return list;
    } catch (err) {
      throw err;
    }
  };
  const handlePage = (page) => {
    getListAppliedProgram(page);
    setPage(page);
  };
  
  return {
    list,
    loading,
    getListAppliedProgram,
    statusProgram,
    getStatusbyId,
    handlePage
  };
};

export default ListProgramApplyBloc;
