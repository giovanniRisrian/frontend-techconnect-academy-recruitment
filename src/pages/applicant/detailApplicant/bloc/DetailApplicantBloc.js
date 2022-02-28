import { useNavigate } from "react-router";

import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
const DetailApplicantBloc = (viewDetailApplicantService, navigation) => {
  let { uploadDataApplicant, updateDataApplicant, getDataApplicantbyId, acceptApplicant, rejectApplicant } =viewDetailApplicantService();
  let { paramsNav } = navigation();
  let params = paramsNav();
  let applicant = {
    applicantId: params.applicantId,
    programId: params.programId,
  };
  const handleAccept = async () => {
    try {
      await acceptApplicant(applicant);
    } catch (e) {
      throw e;
    }
  };

  const handleReject = async () => {
    try {
      await rejectApplicant(applicant);
    } catch (e) {
      throw e;
    }
  };


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
      changeInitial(mock)
      return response;
    } catch (err) {
      throw err;
    }
  };
  return { getDataByID, handleAccept, handleReject};
};

export default DetailApplicantBloc;
