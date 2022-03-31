import swal from "sweetalert2";

const ProgramFormBloc = (useProgramForm, programRepository, navigation) => {
  let { image, setImage, programType, setProgramType } = useProgramForm();
  let { createProgram, getProgramTypes } = programRepository();
  const { navigateTo } = navigation();

  // const getListSkill = async () => {
  //   try {
  //     const response = await getSkills();
  //     setSkills(response.data.skill);
  //   } catch (e) {
  //     setSkills({});
  //   }
  // };

  const getListProgramType = async () => {
    try {
      const response = await getProgramTypes();
      // console.log(response.data.data);
      let result = response.data.data.filter((item) => {
        return item?.ProgramName !== "All";
      });
      // console.log("program type",result);
      setProgramType(result);
    } catch (e) {
      setProgramType([]);
    }
  };

  const createNewProgram = async (values, context) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${context.userInfo}`,
          "Content-Type": "multipart/form-data",
        },
      };
      values.age = values.age + "";
      values.gpa = values.gpa + "";

      const response = await createProgram(values, config);
      swal
        .fire({
          title: "Success!",
          icon: "success",
          text: "Program is created",
          confirmButtonText: "OK",
        })
        .then((result) => {
          if (result.isConfirmed) {
            navigateTo("/recruiter");
          }
        });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getTodayDate = () => {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return `${year}-${month <= 10 ? "0" + month : month}-${
      day <= 10 ? "0" + day : day
    }`;
  };

  const handleCancel = async () => {
    navigateTo("..");
  };

  return {
    createNewProgram,
    handleCancel,
    image,
    setImage,
    getTodayDate,
    getListProgramType,
    programType,
  };
};

export default ProgramFormBloc;
