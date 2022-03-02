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
  let { postUpload, postGetDataByListId,putUpdateProfile,getDataApplicantbyId } = UploadService();
  const [loading, setLoading] = useState(false);
  const doUpload = async (file, context, setInfo) => {
    let userInfo = jwt_decode(context.userInfo);
    console.log(userInfo)
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
      let res2 = await postGetDataByListId(
        { ID: res.data.data.matchId },
        config
      );
      setLoading(false);
      let summary = res.data.data.summary;
      let SkillSet = []
      console.log("ini sumari ",res.data.data.summary)
      for (let i = 0; i < summary.skill.length; i++) {
        SkillSet.push({Skill:summary.skill[i],ApplicantID:userInfo.ID})
      }
      console.log(SkillSet)
      var jsonData = new FormData();
      let resp3 = await getDataApplicantbyId(null,config)
      let dataReceive = resp3.data.data
      // console.log("INi data",mocks)
      // let mock = {
      //   Personal: {
      //     Name: userInfo.FullName,
      //     Gender: "",
      //     BirthDate: new Date(),
      //     Domicile: "",
      //     Email: userInfo.Email,
      //     TelephoneNo: summary.phone_number[0],
      //     TotalWorkingExperience: "",
      //     SalaryExpectation: "",
      //   },
      //   Education: [
      //     {
      //       Title: "",
      //       Institution:summary.academic[0],
      //       Major: "",
      //       YearIn: "",
      //       YearOut: "",
      //       GPA: summary.gpa[0],
      //     },
      //   ],
      //   Organization: [
      //     {
      //       Organization: "",
      //       Scope: "",
      //       Duration: "",
      //       Description: "",
      //       Position: "",
      //     },
      //   ],
      //   WorkExperience: [
      //     {
      //       CompanyName: "",
      //       Position: "",
      //       Level: "",
      //       Industry: "",
      //       YearIn: "",
      //       YearOut: "",
      //       Description: "",
      //     },
      //   ],
      //   SkillSet: SkillSet,
      // };
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
      mock.Personal.TelephoneNo = summary.phone_number[0]
      mock.Personal.Email = summary.email[0]
      mock.Personal.ResumeFile =file.file.name
  
      mock.Education = dataReceive.Education
      // mock.Education[0].Institution=summary.academic[0]
      mock.Education[0].GPA=summary.gpa[0]
      // mock.SkillSet = SkillSet
      mock.SkillSet = SkillSet
      mock.WorkExperience = dataReceive.WorkExperience
      mock.Organization = dataReceive.Organization
      mock.ID = dataReceive.ID
      mock.UserAccountID = dataReceive.UserAccountID
      console.log("Ini MOCK",mock)
      const jsonText = JSON.stringify(mock);
      const jsonPretendFile = new Blob([jsonText], {
        type: "application/json",
      });
      jsonData.append("json", jsonPretendFile);
    let res3 =  putUpdateProfile(jsonData, config)
    console.log(res3)

    Swal
    .fire({
      title: "Upload CV Success!",
      text:"Please, complete your profile first before apply this program",
      icon: "success",
      confirmButtonText: "Show Recommendation Program",
      cancelButtonColor: '#f5c842',
      cancelButtonText: 'Go to Profile',
      showCancelButton: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        navigate("/vacancy", { state: res2.data.data })
        // window.location.reload()
      }
      else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        navigate('/applicant/profile')
      }
    });
      
     ;
      // console.log(res2);
    } catch (err) {
      alert(err);
      console.log(err)
    }
  };
  return { doUpload, loading };
};
export default UploadButtonBloc;
