const ProgramFormBloc = (useProgramForm, programRepository, navigation) => {
  let { skills, setSkills } = useProgramForm();
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

  const handleSubmit = async (values) => {
    try {
      await createProgram(values);
      navigateTo("..");
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = async () => {
    navigateTo("..");
  };

  return { skills, handleSubmit, handleCancel, getListSkill };
};

export default ProgramFormBloc;
