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
      let arrayNotFill = [];
      if (data.Personal.Name) {
        counter += 1;
      }else{
        arrayNotFill.push("Name")
      }
      if (data.Personal.Email) {
        counter += 1;
      }else{
        arrayNotFill.push("Email")
      }
      if (data.Personal.Domicile) {
        counter += 1;
      }else{
        arrayNotFill.push("Domicile")
      }
      if (data.Personal.TelephoneNo) {
        counter += 1;
      }else{
        arrayNotFill.push("Phone")
      }
      if (data.Personal.BirthDate) {
        counter += 1;
      }else{
        arrayNotFill.push("BirthDate")
      }
      if (data.Personal.Gender) {
        counter += 1;
      }else{
        arrayNotFill.push("Gender")
      }
      if(data.SkillSet[0].Skill){
        counter += 1;
      }else{
        arrayNotFill.push("Skill")
      }
      if (data.Education[0].Title) {
        counter += 1;
      }else{
        arrayNotFill.push("Title in Education")
      }
      if (data.Education[0].Major) {
        counter += 1;
      }else{
        arrayNotFill.push("Major in Education")
      }
      if (data.Education[0].Institution) {
        counter += 1;
      }else{
        arrayNotFill.push("Institution in Education")
      }
      if (data.Education[0].YearIn) {
        counter += 1;
      }else{
        arrayNotFill.push("Year In")
      }
      if (data.Education[0].YearOut) {
        counter += 1;
      }else{
        arrayNotFill.push("Year Out")
      }
      if (data.Education[0].GPA) {
        counter += 1;
      }else{
        arrayNotFill.push("GPA")
      }
      if (counter >= 13) {
        return true
      } else {
        return {status:false, notFill:arrayNotFill};
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
    console.log("",status);
      if (status === true) {
        res = await applyProgram(values, config);
        swal.fire("Saved!", "", "success").then(() => {
          navigate("/applicant/status");
        });
      } else {
        swal
          .fire({
            icon: "warning",
            text: `You must fill mandatory field, and Unfilled fields are ${status?.notFill}`,
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
