import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import swal from "sweetalert2";

const VacancyDetailBloc = (programService) => {
  let params = useParams();
  let navigate = useNavigate();
  const [programDetail, setProgramDetail] = useState({});
  let { getDetailInformationProgram, applyProgram } = programService();

  const getProgrambyId = async () => {
    try {
      const response = await getDetailInformationProgram(params.id);
      setProgramDetail(response.data);
      return programDetail;
    } catch (err) {
      throw err;
    }
  };
  const doApplyProgram = async (values) => {
    console.log("data apply", values);
    try {
      // const config = {
      //   headers: { Authorization: `Bearer ${context.userInfo}` },
      // };
      let res = await applyProgram(values);
     
      navigate("/applicant/status");
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
    navigate,
    getProgrambyId,
    doApplyProgram,
  };
};

export default VacancyDetailBloc;
