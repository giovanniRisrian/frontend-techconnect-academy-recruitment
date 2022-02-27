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
  } = useApplicantList();

  let { getApplicantsByProgram, getApplicant, getPrograms } =
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
      setApplicantList(response.data.data);
    } catch (e) {
      setApplicantList([]);
    }
  };

  const handleProgram = (programId, program) => {
    getApplicantsByProgram(programId, page);
    setProgramId(programId);
    setProgram(program.props.children);
  };

  const handlePage = (page) => {
    getApplicantsByProgram(programId, Number(page));
    setPage(Number(page));
  };

  const handleSeeDetail = (applicantId) => {
    navigateTo(`details/${programId}/${applicantId}`);
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
    getAge,
    handlePage,
    handleSeeDetail,
    handleProgram,
    getListProgram,
    getListApplicantByPage,
  };
};
export default ApplicantListBloc;
