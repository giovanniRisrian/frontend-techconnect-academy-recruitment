// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { RootContext } from "../../../../App";
// import ActionType from "../../../../Context/ActionType";

import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { RootContext } from "../../../../App";
const UploadButtonBloc = (UploadService) => {
  const navigate = useNavigate();
  const data = useContext(RootContext);
  let {
    postUpload,
    postGetDataByListId,
    putUpdateProfile,
    getDataApplicantbyId,
  } = UploadService();
  const [loading, setLoading] = useState(false);
  const doUpload = async (file, context, setInfo) => {
    let userInfo = jwt_decode(context.userInfo);
    // console.log(userInfo)
    var formData = new FormData();
    formData.append("file", file.file);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${context.userInfo}`,
          "Content-Type": "multipart/form-data",
        },
      };
      setLoading(true);
      let res = await postUpload(formData, config);
      // setInfo(res.data.data.matchId)
      console.log("Profile Linkin : ", res.data.data.summary.profile);
      let res2 = await postGetDataByListId(
        { ID: res.data.data.matchId },
        config
      );
      setLoading(false);
      let summary = res.data.data.summary;
      let SkillSet = [];
      // console.log("ini sumari ",res.data.data.summary)
      for (let i = 0; i < summary.skill.length; i++) {
        SkillSet.push({ Skill: summary.skill[i], ApplicantID: userInfo.ID });
      }
      // console.log(SkillSet)
      var jsonData = new FormData();
      let resp3 = await getDataApplicantbyId(null, config);
      let dataReceive = resp3.data.data;
      let mock = {
        Personal: {
          Name: "",
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

      mock.Personal = dataReceive.Personal;
      mock.Personal.TelephoneNo = summary.phone_number[0];
      mock.Personal.Email = summary.email[0];
      mock.Personal.ResumeFile = file.file.name;

      mock.Education = dataReceive.Education;
      // mock.Education[0].Institution=summary.academic[0]
      mock.Education[0].GPA = summary.gpa[0];
      // mock.SkillSet = SkillSet
      mock.SkillSet = SkillSet;
      mock.WorkExperience = dataReceive.WorkExperience;
      mock.Organization = dataReceive.Organization;
      mock.ID = dataReceive.ID;
      mock.UserAccountID = dataReceive.UserAccountID;
      const profile = res.data.data.summary.profile;
      // console.log("ketemukah : ", profile.length);
      // console.log("ketemukah : ", profile === null);
      console.log(profile.lasttname);
      if (profile != null) {
        console.log("terupdate");
        mock.Personal.Name = profile.firstname + " " + profile.lasttname;
        mock.Personal.Domicile = profile.country + " " + profile.province;
        if (profile.education != null) {
          let education = profile.education;
          let tempEducationArr = [];
          let tempEducation = {
            Title: "",
            Institution: "",
            Major: "",
            YearIn: "",
            YearOut: "",
            GPA: "",
          };
          for (let i = 0; i < education.length; i++) {
            console.log(education[i].period.endDate.year);
            tempEducation.Title = education[i].degree;
            tempEducation.Institution = education[i].school;
            tempEducation.Major = education[i].field;
            tempEducation.YearIn =
              education[i].period.startDate.year.toString();
            tempEducation.YearOut = education[i].period.endDate.year.toString();
            tempEducationArr.push(tempEducation);
            tempEducation = {
              Title: "",
              Institution: "",
              Major: "",
              YearIn: "",
              YearOut: "",
              GPA: "",
            };
          }
          mock.Education = tempEducationArr;
        }
      } else {
        console.log("Tidak Terupdate");
      }
      if (profile.experience != null) {
        let experience = profile.experience;
        let tempExperienceArr = [];
        let tempExperience = {
          CompanyName: "",
          Position: "",
          Level: "",
          Industry: "",
          YearIn: "",
          YearOut: "",
          Description: "",
        };
        for (let i = 0; i < experience.length; i++) {
          tempExperience.CompanyName = experience[i].company;
          tempExperience.Position = experience[i].title;
          if (experience[i].period.startDate) {
            tempExperience.YearIn =
              experience[i].period.startDate.year.toString();
          }
          if (experience[i].period.endDate) {
            tempExperience.YearOut =
              experience[i].period.endDate.year.toString();
          }
          tempExperienceArr.push(tempExperience);
          tempExperience = {
            CompanyName: "",
            Position: "",
            Level: "",
            Industry: "",
            YearIn: "",
            YearOut: "",
            Description: "",
          };
        }
        mock.WorkExperience = tempExperienceArr;
        mock.Personal.TotalWorkingExperience =(
          experience[0].period.startDate.year - 
          (experience[experience.length - 1].period.endDate?.year ||
            experience[experience.length - 1].period.startDate)).toString();
      }
      const jsonText = JSON.stringify(mock);
      const jsonPretendFile = new Blob([jsonText], {
        type: "application/json",
      });
      jsonData.append("json", jsonPretendFile);
      let res3 = putUpdateProfile(jsonData, config);
      // console.log(res3)

      Swal.fire({
        title: "Upload CV Success!",
        text: "Please, complete your profile first before apply this program",
        icon: "success",
        confirmButtonText: "Show Recommendation Program",
        cancelButtonColor: "#f5c842",
        cancelButtonText: "Go to Profile",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/vacancy", { state: res2.data.data });
          // window.location.reload()
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          navigate("/applicant/profile");
          window.location.reload()
        }
      });
      // // console.log(res2);
    } catch (err) {
      alert(err);
      // console.log(err)
    }
  };
  return { doUpload, loading };
};
export default UploadButtonBloc;
