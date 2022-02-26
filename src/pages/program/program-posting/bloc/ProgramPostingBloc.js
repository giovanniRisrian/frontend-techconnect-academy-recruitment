const ProgramFormBloc = (useProgramForm, programRepository, navigation) => {
  let { skills, setSkills, image, setImage } = useProgramForm();
  let { createProgram, getSkills } = programRepository();
  const { paramsNav, navigateTo } = navigation();

  const getListSkill = async () => {
    try {
      const response = await getSkills();
      setSkills(response.data.skill);
    } catch (e) {
      setSkills({});
    }
  };

  const handleSubmit = async (values, context) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${context.userInfo}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("imiage", values.image);
      formData.append("data", values);
     const response =  await createProgram(formData, config);
     return response;
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = async () => {
    navigateTo("..");
  };

  return { skills, handleSubmit, handleCancel, getListSkill, image, setImage };
};

export default ProgramFormBloc;
