import { useNavigate } from "react-router";

import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
const ViewProfileBloc = (viewViewProfileService) => {
  let { uploadDataApplicant, updateDataApplicant, getDataApplicantbyId } =
    viewViewProfileService();

  const handleSubmit = async (values, file, context) => {
    console.log("ini context", context);
    console.log("handleApplicant", values);

    values.Personal.TotalWorkingExperience = values.Personal.TotalWorkingExperience +""
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${context.userInfo}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };
      let userInfo = jwt_decode(context.userInfo);
      
      const formData = new FormData();
      const jsonText = JSON.stringify(values);
      const jsonPretendFile = new Blob([jsonText], {
        type: "application/json",
      });
      formData.append("json", jsonPretendFile);
      formData.append("file", file);
      
      const response = await updateDataApplicant(formData, config);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const getDataByID = async (id, context,changeInitial) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      
      const data ={ id:id}
      const formData = new FormData();
      formData.append('id',id)
      console.log('oioioi')
      const response = await getDataApplicantbyId(formData, config);
      console.log("reposne",response.data.data)
      let dataReceive =response.data.data
      let mock = {
        Personal:{
          Name: "zizki",
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

      console.log("resp:",dataReceive)
      console.log("mock:",mock)
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
  return { handleSubmit ,getDataByID};
};

export default ViewProfileBloc;