import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import swal from "sweetalert2";

const VacancyDetailBloc = (programService) => {
  let params = useParams();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [programDetail, setProgramDetail] = useState({});
  let { getDetailInformationProgram, applyProgram } = programService();

  const getProgrambyId = async () => {
    try {
      setLoading(true)
      const response = await getDetailInformationProgram(params.id);
      setProgramDetail(response.data);
      setLoading(false)
      return programDetail;
    } catch (err) {
      throw err;
    }
  };
  const doApplyProgram = async (values, context) => {
    console.log("data apply", values);
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      setLoading(true)
      let res = await applyProgram(values, config);
      setLoading(false)
      return res;
    } catch (err) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      throw err;
    }
  };

  return {
    programDetail,
    params,
    loading,
    navigate,
    getProgrambyId,
    doApplyProgram,
  };
};

export default VacancyDetailBloc;
