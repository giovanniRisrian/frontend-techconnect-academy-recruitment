import { useState } from "react";
import { useNavigate } from "react-router";

const ListProgramApplyBloc = (statusService) => {
  const [list, setList] = useState({});
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let { getAppliedProgram } = statusService();
  const getListAppliedProgram = async () => {
    try {
      setLoading(true);
      let response = await getAppliedProgram();
      setList(response.data.data);
      setLoading(false);
      return list;
    } catch (err) {
      throw err;
    }
  };
  return {
    list,
    loading,
    navigate,
    getListAppliedProgram,
  };
};

export default ListProgramApplyBloc;
