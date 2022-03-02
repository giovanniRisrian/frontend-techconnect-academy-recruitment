import { useNavigate } from "react-router";

import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
const DetailApplicantBloc = (viewDetailApplicantService) => {
  let { uploadDataApplicant, updateDataApplicant, getDataApplicantbyId } =viewDetailApplicantService();

  const getDataByID = async (id, context,changeInitial) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      
      const response = await getDataApplicantbyId(id, config);
      let dataReceive =response.data.data
      let mock = {
        Personal:{
          Name: "",
          Gender: "",
          BirthDate: new Date(),
          Domicile: "",
          Email: "",
          TelephoneNo: "",
          TotalWorkingExperience:"",
          SalaryExpectation: "",
        },
        Education: [
          {
            Title: "",
            Institution: "",
            Major: "",
            YearIn: "",
            YearOut: "",
            GPA: "",
          },
        ],
        Organization: [
          {
            Organization: "",
            Scope: "",
            Duration: "",
            Description: "",
            Position: "",
          },
        ],
        WorkExperience: [
          {
            CompanyName: "",
            Position: "",
            Level: "",
            Industry: "",
            YearIn: "",
            YearOut: "",
            Description: "",
          },
        ],
        SkillSet: [
          {
            Skill: "",
          },
        ],
      }
      mock.Personal=dataReceive.Personal
      mock.Personal.BirthDate = dayjs(dataReceive.Personal.BirthDate).format("YYYY-MM-DD")
      console.log(mock.Personal.BirthDate)
      mock.Education = dataReceive.Education
      mock.SkillSet = dataReceive.SkillSet
      mock.WorkExperience = dataReceive.WorkExperience
      mock.Organization = dataReceive.Organization
      mock.ID = dataReceive.ID
      mock.UserAccountID = dataReceive.UserAccountID
      // let combine = 
      console.log("siniii",mock)
      changeInitial(mock)
      return response;
    } catch (err) {
      throw err;
    }
  };
  return { getDataByID};
};

export default DetailApplicantBloc;
