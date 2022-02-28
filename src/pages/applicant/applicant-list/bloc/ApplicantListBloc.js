const ApplicantListBloc = (
  useApplicantList,
  applicantRepository,
  navigation
) => {
  let {
    applicantList,
    setApplicantList,
    programList,
    setProgramList,
    program,
    setProgram,
    page,
    setPage,
    programId,
    setProgramId,
    step,
    setStep,
    isProgram,
    setIsProgram,
  } = useApplicantList();

  let { getApplicantsByProgram, getApplicant, getPrograms, getProcess } =
    applicantRepository();
  const { navigateTo, paramsNav } = navigation();
  const params = paramsNav();

  const getListProgram = async () => {
    try {
      const response = await getPrograms();
      setProgramList(response.data.data);
    } catch (e) {
      setProgramList([]);
    }
  };

  const getListApplicantByPage = async () => {
    try {
      const response = await getApplicantsByProgram(programId, page);
      setApplicantList(response.data.data.ApplicantInfo);
    } catch (e) {
      setApplicantList([]);
    }
  };

  const handleProgram = (programId, program) => {
    getApplicantsByProgram(programId, page);
    setPage(1);
    setProgramId(programId);
    setIsProgram(true);
    setProgram(program.props.children);
  };

  const handlePage = (page) => {
    getApplicantsByProgram(programId, Number(page));
    setPage(Number(page));
  };

  const handleSeeDetail = (applicantId) => {
    navigateTo(`details/${programId}/${applicantId}`);
  };

  const handleStepUp = () => {
    setStep((prevValue) => prevValue + 1);
  };

  const handleStepDown = () => {
    setStep((prevValue) => prevValue - 1);
  };

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const steps = [
    "Administration",
    "Assesment",
    "Interview",
    "Offering Letter",
    "Welcome to SMM",
  ];

  return {
    applicantList,
    setApplicantList,
    programList,
    setProgramList,
    program,
    setProgram,
    page,
    setPage,
    programId,
    setProgramId,
    step,
    setStep,
    isProgram,
    setIsProgram,
    steps,
    getAge,
    handlePage,
    handleSeeDetail,
    handleProgram,
    handleStepUp,
    handleStepDown,
    getListProgram,
    getListApplicantByPage,
  };
};
export default ApplicantListBloc;
