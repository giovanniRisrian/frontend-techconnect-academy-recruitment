const ProgramFormBloc = (useProgramForm, programRepository, navigation) => {
  let { image, setImage } = useProgramForm();
  let { createProgram } = programRepository();
  const { navigateTo } = navigation();

  // const getListSkill = async () => {
  //   try {
  //     const response = await getSkills();
  //     setSkills(response.data.skill);
  //   } catch (e) {
  //     setSkills({});
  //   }
  // };

  const handleSubmit = async (values, context) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${context.userInfo}`,
          "Content-Type": "multipart/form-data",
        },
      };
      // const formData = new FormData();
      // formData.append("image", values.image);
      // formData.append("data", values);
      const response = await createProgram(values, config);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = async () => {
    navigateTo("..");
  };

  return { handleSubmit, handleCancel, image, setImage };
};

export default ProgramFormBloc;