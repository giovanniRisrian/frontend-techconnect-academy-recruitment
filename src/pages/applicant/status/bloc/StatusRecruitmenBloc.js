import { useState } from "react";
import { useParams, useNavigate } from "react-router";

const StatusRecruitmentBloc = (statusService) => {
  let params = useParams();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [statusProgram, setStatusProgram] = useState({});
  let {getDetailAppliedProgram} = statusService();

  const getStatusbyId = async (id, context) => {
   
    try {
      setLoading(true)
      const response = await getDetailAppliedProgram(id, context);
      setStatusProgram(response.data.data);
      setLoading(false)
      return statusProgram;
    } catch (err) {
      throw err;
    }
  };

  return {
    statusProgram,
    params,
    loading,
    navigate,
    getStatusbyId,
  };
};

export default StatusRecruitmentBloc;
