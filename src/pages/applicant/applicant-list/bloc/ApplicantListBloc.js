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
    actualStep,
    setActualStep,
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

  const getListApplicantByPage = async (data1, data2) => {
    try {
      const response = await getApplicantsByProgram(data1, data2);
      if (response.data.data.ApplicantInfo === null) {
        setApplicantList([]);
      } else {
        setApplicantList(response.data.data.ApplicantInfo);
      }
    } catch (e) {
      setApplicantList([]);
    }
  };

  const handleProgram = (programId, program) => {
    getListApplicantByPage(programId, step);
    setPage(1);
    setProgramId(programId);
    setIsProgram(true);
    setProgram(program.props.children);
  };

  // const handlePage = (page) => {
  //   getApplicantsByProgram(programId, Number(page));
  //   setPage(Number(page));
  // };

  const handleSeeDetail = (applicantId) => {
    console.log("applicant id", applicantId);
    navigateTo(`details/${programId}/${applicantId}`);
  };

  const handleStepUp = () => {
    let stepUp = step + 1;
    getListApplicantByPage(programId, stepUp);
    setStep((prevValue) => prevValue + 1);
    setActualStep((prevValue) => prevValue + 1);
  };

  const handleStepDown = () => {
    let stepDown = step - 1;
    getListApplicantByPage(programId, stepDown);
    setStep((prevValue) => prevValue - 1);
    setActualStep((prevValue) => prevValue - 1);
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
    { title: "Administration" },
    { title: "Assesment" },
    { title: "Interview" },
    { title: "Offering Letter" },
    { title: "Welcome to SMM" },
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
    // handlePage,
    handleSeeDetail,
    handleProgram,
    handleStepUp,
    handleStepDown,
    getListProgram,
    getListApplicantByPage,
    actualStep,
    setActualStep,
  };
};
export default ApplicantListBloc;
