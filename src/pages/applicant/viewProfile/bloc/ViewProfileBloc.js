import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useState } from "react";

const ViewProfileBloc = (viewViewProfileService) => {
  let {
    updateDataApplicant,
    getDataApplicantbyId,
    postGettingDataLinkedinProfile,
  } = viewViewProfileService();
  let navigate = useNavigate();
  const [linkedin, setLinkedin] = useState("");

  const putProfileLinkedin = async (values, context) => {
    // console.log(linkedin)
    // console.log(values,context)
    const config = {
      headers: {
        Authorization: `Bearer ${context.userInfo}`,
      },
    };
    const resp = await postGettingDataLinkedinProfile(
      { profile_id: linkedin },
      config
    );
    console.log(resp.data);
    let mock = values;

    let profile = resp.data.data;
    // console.log("ketemukah : ", profile.length);
    // console.log("ketemukah : ", profile === null);
    console.log(profile);
    console.log("LASTNAMENYA ADALAH", profile.lasttname);
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
          tempEducation.YearIn = education[i].period.startDate.year.toString();
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
    let min = 10000000;
    let max = 0;
    let minDate = "2000-01-01",
      maxDate;
    let nowStartYear, nowStartMonth, nowEndYear, nowEndMonth, now, end;
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
      let tempArr = [];
      let tempArrDate = [];
      for (let i = 0; i < experience.length; i++) {
        tempExperience.CompanyName = experience[i].company;
        tempExperience.Position = experience[i].title;

        experience[i].period?.startDate?.year
          ? (nowStartYear = experience[i].period.startDate.year)
          : (nowStartYear = 10000000);
        experience[i].period?.startDate?.month
          ? (nowStartMonth = experience[i].period.startDate.month)
          : (nowStartMonth = 1);
        experience[i].period?.endDate?.year
          ? (nowEndYear = experience[i].period.endDate.year)
          : (nowEndYear = 0);
        experience[i].period?.endDate?.month
          ? (nowEndMonth = experience[i].period.endDate.month)
          : (nowEndMonth = 1);

        now = nowStartYear * 100 + nowStartMonth;
        end = nowEndYear * 100 + nowEndMonth;
        if (now !== 1) tempArr.push(now);
        if (end !== 1) tempArr.push(end);
        if (experience[i].period.startDate) {
          if (
            experience[i].period.startDate.year &&
            experience[i].period.startDate.month
          ) {
            experience[i].period.startDate.month =
              experience[i].period.startDate.month.toString();
            if (experience[i].period.startDate.month.length == 1) {
              experience[i].period.startDate.month =
                "0" + experience[i].period.startDate.month;
            }
            tempExperience.YearIn =
              experience[i].period.startDate.year.toString() +
              "-" +
              experience[i].period.startDate.month +
              "-01";
          } else {
            tempExperience.YearIn =
              experience[i].period.startDate.year.toString() + "-01-01";
          }
        }
        if (experience[i].period.endDate) {
          if (
            experience[i].period.endDate.year &&
            experience[i].period.endDate.month
          ) {
            experience[i].period.endDate.month =
              experience[i].period.endDate.month.toString();
            if (experience[i].period.endDate.month.length == 1) {
              experience[i].period.endDate.month =
                "0" + experience[i].period.endDate.month;
            }
            tempExperience.YearOut =
              experience[i].period.endDate.year.toString() +
              "-" +
              experience[i].period.endDate.month +
              "-01";
          } else {
            tempExperience.YearOut =
              experience[i].period.endDate.year.toString();
          }
        }
        if (now !== 1) tempArrDate.push(tempExperience.YearIn);
        if (end !== 1) tempArrDate.push(tempExperience.YearOut);
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
      console.log("ini Semua Tanggal Int:", tempArr);
      console.log("ini Semua Tanggal Date:", tempArrDate);
      mock.WorkExperience = tempExperienceArr;

      if (!maxDate) {
        maxDate = minDate;
      }

      const max = Math.max(...tempArr);
      const indexMax = tempArr.indexOf(max);
      const min = Math.min(...tempArr);
      const indexMin = tempArr.indexOf(min);
      console.log(max, min, indexMax, indexMin);
      console.log("MINIMUM ADALAH : ", tempArr[indexMin]);
      console.log("MAXIMUM ADALAH : ", tempArr[indexMax]);

      let date1 = new Date(tempArrDate[indexMin]);
      let date2 = new Date(tempArrDate[indexMax]);

      // To calculate the time difference of two dates
      let Difference_In_Time = date2.getTime() - date1.getTime();

      // To calculate the no. of days between two dates
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      let Different_In_Year = Difference_In_Days/365
      console.log("Differentnya", Difference_In_Days);
      mock.Personal.TotalWorkingExperience =  Different_In_Year.toFixed(2).toString();
    }
    console.log(mock);


     const formData = new FormData();
      let filepath =
        values.Personal.ResumeFile.split(":")[0].split("_")[
          values.Personal.ResumeFile.split(":")[0].split("_").length - 1
        ];

      values.Personal.ResumeFile = filepath;
      const jsonText = JSON.stringify(values);
      const jsonPretendFile = new Blob([jsonText], {
        type: "application/json",
      });
      formData.append("json", jsonPretendFile);
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
  };

  const addProfile = async (values, file, context) => {
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
      mock.Personal.BirthDate = dayjs(dataReceive.Personal.BirthDate).format(
        "YYYY-MM-DD"
      );

      // console.log(mock.Personal.BirthDate)
      mock.Education = dataReceive.Education;
      mock.SkillSet = dataReceive.SkillSet;
      mock.WorkExperience = dataReceive.WorkExperience;
      mock.WorkExperience[0].YearIn = dayjs(
        dataReceive.WorkExperience[0].YearIn
      ).format("YYYY-MM-DD");
      mock.WorkExperience[0].YearOut = dayjs(
        dataReceive.WorkExperience[0].YearOut
      ).format("YYYY-MM-DD");
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
  return { addProfile, getDataByID, putProfileLinkedin, setLinkedin, linkedin };
};

export default ViewProfileBloc;
