import { useState } from "react";
import { useNavigate } from "react-router";

const ListProgramApplyBloc = (statusService) => {
  const [list, setList] = useState({});
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let { getAppliedProgram } = statusService();
  const getListAppliedProgram = async (params, context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      setLoading(true);
      let response = await getAppliedProgram(params, config);
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
