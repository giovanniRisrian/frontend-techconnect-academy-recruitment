import { useNavigate } from "react-router";
import swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const DetailApplicantBloc = (viewDetailApplicantService, navigation, useDetailApplicant) => {
  let { uploadDataApplicant, updateDataApplicant, getDetailAppliedProgram, getDataApplicantbyId, acceptApplicant, rejectApplicant } =viewDetailApplicantService();
  let { paramsNav, navigateTo } = navigation();
  let {program, setProgram} = useDetailApplicant()
  let params = paramsNav();
  let applicant = {
    applicantid: params.applicantid,
    programid: params.programid,
  };
  const handleAccept = async (context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      await acceptApplicant(applicant, config);
      swal
      .fire({
        title: "Success!",
        icon: "success",
        text: "Applicant is accepted",
        confirmButtonText: "OK",
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigateTo("/recruiter/applicants");
        }
      });
    } catch (e) {

      throw e;
    }
  };

  const handleReject = async (context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      await rejectApplicant(applicant, config);
      swal
      .fire({
        title: "Success!",
        icon: "success",
        text: "Applicant is rejected",
        confirmButtonText: "OK",
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigateTo("/recruiter/applicants");
        }
      });
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
      // console.log(mock.Personal.BirthDate)
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
  const getAllProgram = async(context) => {
    try{
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      const response = await getDetailAppliedProgram(params.programid,params.applicantid, config)
      setProgram(response.data.data)
      console.log("bloc",setProgram(response.data.data));
      return response
    }catch(err){
      throw(err)
    }
  }
  return { getDataByID, handleAccept, handleReject, getAllProgram, program};
};

export default DetailApplicantBloc;
