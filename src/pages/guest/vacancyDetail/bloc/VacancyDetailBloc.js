import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import swal from "sweetalert2";
import jwt_decode from "jwt-decode";

const VacancyDetailBloc = (programService) => {
  let params = useParams();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [programDetail, setProgramDetail] = useState({});
  let { getDetailInformationProgram, applyProgram, getDataApplicantbyId } =
    programService();

  const getUserbyId = async (context) => {
    try {
      const res = await getDataApplicantbyId(context);
      let counter = 0;
      let data = res.data.data;
      if (data.Personal.Name) {
        counter += 1;
      }
      if (data.Personal.Email) {
        counter += 1;
      }
      if (data.Personal.Domicile) {
        counter += 1;
      }
      if (data.Personal.TelephoneNo) {
        counter += 1;
      }
      if (data.Personal.BirthDate) {
        counter += 1;
      }
      if (data.Personal.Gender) {
        counter += 1;
      }
      if (data.Education[0].Title) {
        counter += 1;
      }
      if (data.Education[0].Major) {
        counter += 1;
      }
      if (data.Education[0].Institution) {
        counter += 1;
      }
      if (data.Education[0].YearIn) {
        counter += 1;
      }
      if (data.Education[0].YearOut) {
        counter += 1;
      }
      if (data.Education[0].GPA) {
        counter += 1;
      }
      if (counter >= 12) {
        return true;
      } else {
        return false;
      }
      // return res
    } catch (err) {
      throw err;
    }
  };

  const getProgrambyId = async () => {
    try {
      setLoading(true);
      // console.log(params);
      const response = await getDetailInformationProgram(params.id);
      // console.log(response);
      setProgramDetail(response.data.data);
      console.log(" Ini response",response.data.data);
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
      let res;
      let status = await getUserbyId(config);
      // console.log("cekkk", status);
      if (status === true) {
        res = await applyProgram(values, config);
        swal.fire("Saved!", "", "success").then(() => {
          navigate("/applicant/status");
        });
      } else {
        swal
          .fire({
            icon: "warning",
            text: "You must fill mandatory field",
          })
          .then(() => {
            navigate("/applicant/profile");
          });
      }
      setLoading(false);
      return res;
    } catch (err) {
      let user = jwt_decode(context.userInfo);
      if (user.Role === "recruiter" || user.Role === "administrator") {
        swal.fire({
          icon: "error",
          title: "",
          text: "Your role can't apply this program",
        });
      } else {
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
    getUserbyId,
  };
};

export default VacancyDetailBloc;
