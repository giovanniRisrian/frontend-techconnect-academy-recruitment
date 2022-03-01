import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import swal from "sweetalert2";
import jwt_decode from "jwt-decode";

const VacancyDetailBloc = (programService) => {
  let params = useParams();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [programDetail, setProgramDetail] = useState({});
  let { getDetailInformationProgram, applyProgram } = programService();

  const getProgrambyId = async () => {
    try {
      setLoading(true);
      console.log(params);
      const response = await getDetailInformationProgram(params.id);
      console.log(response);
      setProgramDetail(response.data.data);
      setLoading(false);
      return programDetail;
    } catch (err) {
      throw err;
    }
  };
  const doApplyProgram = async (values, context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      setLoading(true);
      let res = await applyProgram(values, config);
      setLoading(false);
      swal
        .fire({
          title: "Success!",
          icon: "success",
          confirmButtonText: "OK",
        })
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/applicant/status");
          }
        });
      return res;
      
    } catch (err) {
      let user = jwt_decode(context.userInfo);
      if(user.Role === "recruiter" || user.Role ==="administrator"){
        swal.fire({
          icon: "error",
          title: "",
          text: "Your role can't apply this program",
        });
      }else{
        swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You've already apply this program",
        });
      }
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
