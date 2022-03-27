import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const ViewProfileBloc = (viewViewProfileService) => {
  let { updateDataApplicant, getDataApplicantbyId } = viewViewProfileService();
  let navigate = useNavigate();
  const addProfile = async (values, file, context) => {
    // // console.log("ini context", context);
    // // console.log("handleApplicant", values);

    values.Personal.TotalWorkingExperience =
      values.Personal.TotalWorkingExperience + "";
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${context.userInfo}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };
      let userInfo = jwt_decode(context.userInfo);
      // console.log("Ini Values : ",values)
      const formData = new FormData();
      let filepath =
        values.Personal.ResumeFile.split(":")[0].split("_")[
          values.Personal.ResumeFile.split(":")[0].split("_").length - 1
        ];
  
      values.Personal.ResumeFile = filepath;
      const jsonText = JSON.stringify(values);
      console.log("data profile",values);
      const jsonPretendFile = new Blob([jsonText], {
        type: "application/json",
      });
      formData.append("json", jsonPretendFile);
      formData.append("file", file);
      const response = await updateDataApplicant(formData, config);
      Swal.fire({
        title: "Success!",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/applicant/profile");
          window.location.reload();
        }
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  const getDataByID = async (id, context, changeInitial) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };

      const data = { id: id };
      const formData = new FormData();
      formData.append("id", id);
      const response = await getDataApplicantbyId(formData, config);
      // // console.log("reposne",response.data.data)
      let dataReceive = response.data.data;

      let mock = {
        Personal: {
          Name: "zizki",
          Gender: "",
          BirthDate: new Date(),
          Domicile: "",
          Email: "",
          TelephoneNo: "",
          TotalWorkingExperience: "",
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
      };

      // console.log("resp:",dataReceive)
      // console.log("mock:",mock)
      mock.Personal = dataReceive.Personal;

      if (
        mock.Personal.BirthDate === "0001-01-01T07:07:12+07:07" ||
        mock.Personal.BirthDate === "1-01-01" ||
        mock.Personal.BirthDate == null
      ) {
        mock.Personal.BirthDate = null;
      } else {
        mock.Personal.BirthDate = mock.Personal.BirthDate = dayjs(
          dataReceive.Personal.BirthDate
        ).format("YYYY-MM-DD");
      }
      console.log("birthdate", mock.Personal)
      mock.Education = dataReceive.Education;
      mock.SkillSet = dataReceive.SkillSet;
      mock.WorkExperience = dataReceive.WorkExperience;
      for (let i = 0; i < mock.WorkExperience.length; i++) {
        mock.WorkExperience[i].YearIn = dayjs(
          dataReceive.WorkExperience[i].YearIn
        ).format("YYYY-MM-DD");
        mock.WorkExperience[i].YearOut = dayjs(
          dataReceive.WorkExperience[i].YearOut
        ).format("YYYY-MM-DD");
      }

      mock.Organization = dataReceive.Organization;
      mock.ID = dataReceive.ID;
      mock.UserAccountID = dataReceive.UserAccountID;
      // let combine =
      changeInitial(mock);
      return response;
    } catch (err) {
      throw err;
    }
  };
  return { addProfile, getDataByID };
};

export default ViewProfileBloc;
