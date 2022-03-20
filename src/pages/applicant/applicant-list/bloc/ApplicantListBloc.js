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
    isAccepted,
    setIsAccepted,
    searchValue,
    setSearchValue,
    lastPage,
    setLastPage,
    searchBy,
    setSearchBy,
  } = useApplicantList();

  let {
    getApplicantsByProgram,
    getPrograms,
    getRejectedApplicantsByProgram,
    searchApplicantByName,
    searchApplicantByInstitution,
    searchApplicantByGpa,
    searchApplicantByAge,
    searchApplicantByWorkExp,
  } = applicantRepository();
  const { navigateTo, paramsNav } = navigation();

  const getListProgram = async () => {
    try {
      const response = await getPrograms();
      console.log(response);
      setProgramList(response.data.data.ProgramList);
    } catch (e) {
      setProgramList([]);
    }
  };

  const getListApplicantByPage = async (data1, data2, context, data3) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };

      const response = await getApplicantsByProgram(
        data1,
        data2,
        config,
        data3
      );
      setLastPage(response.data.data.LastPage);
      console.log(response);
      if (response.data.data.ApplicantInfo === null) {
        setApplicantList([]);
      } else {
        setApplicantList(response.data.data.ApplicantInfo);
      }
    } catch (e) {
      setApplicantList([]);
    }
  };

  const getListRejectedApplicantByPage = async (
    data1,
    data2,
    context,
    data3
  ) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      const response = await getRejectedApplicantsByProgram(
        data1,
        data2,
        config,
        data3
      );
      setLastPage(response.data.data.LastPage);
      if (response.data.data.ApplicantInfo === null) {
        setApplicantList([]);
      } else {
        setApplicantList(response.data.data.ApplicantInfo);
      }
    } catch (e) {
      setApplicantList([]);
    }
  };

  const handleSubmitSearch = async (e, context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };

      if (e.keyCode === 13) {
        let response;
        console.log("Udah masuk bloc", searchValue);
        switch (searchBy) {
          case "Name":
            response = await searchApplicantByName(
              programId,
              config,
              page,
              step,
              searchValue
            );
            break;
          case "Institution":
            response = await searchApplicantByInstitution(
              programId,
              config,
              page,
              step,
              searchValue
            );
            break;
          case "GPA":
            response = await searchApplicantByGpa(
              programId,
              config,
              page,
              step,
              searchValue
            );
            break;
          case "Age":
            response = await searchApplicantByAge(
              programId,
              config,
              page,
              step,
              searchValue
            );
            break;
          case "Work Experience":
            response = await searchApplicantByWorkExp(
              programId,
              config,
              page,
              step,
              searchValue
            );
            break;
        }
        console.log("response output", response);
        if (response.data.data.ApplicantInfo === null) {
          setApplicantList([]);
        } else {
          setApplicantList(response.data.data.ApplicantInfo);
        }
      }
    } catch (e) {
      setApplicantList([]);
    }
  };

  const setInputSearchValue = (text) => {
    setSearchValue(text);
  };

  const handleProgram = (programId, program, header) => {
    let step = 1;
    if (isAccepted) {
      getListApplicantByPage(programId, step, header, 1);
    } else {
      getListRejectedApplicantByPage(programId, step, header, 1);
    }
    setActualStep(0);
    setStep(1);
    setPage(1);
    setProgramId(programId);
    setIsProgram(true);
    setProgram(program.props.children);
  };

  const handleAccept = (header) => {
    getListApplicantByPage(programId, step, header, page);
    setIsAccepted(true);
  };

  const handleReject = (header) => {
    getListRejectedApplicantByPage(programId, step, header, page);
    setIsAccepted(false);
  };

  const handlePage = (page, header) => {
    if (isAccepted) {
      getListApplicantByPage(programId, step, header, Number(page));
    } else {
      getListRejectedApplicantByPage(programId, step, header, Number(page));
    }
    setPage(Number(page));
  };

  const handleSeeDetail = (applicantId) => {
    navigateTo(`details/${programId}/${applicantId}`);
  };

  const handleStepUp = (header) => {
    let stepUp = step + 1;
    if (isAccepted) {
      getListApplicantByPage(programId, stepUp, header, page);
    } else {
      getListRejectedApplicantByPage(programId, stepUp, header, page);
    }
    setStep((prevValue) => prevValue + 1);
    setActualStep((prevValue) => prevValue + 1);
  };

  const handleStepDown = (header) => {
    let stepDown = step - 1;
    if (isAccepted) {
      getListApplicantByPage(programId, stepDown, header, page);
    } else {
      getListRejectedApplicantByPage(programId, stepDown, header, page);
    }
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
    handlePage,
    handleSeeDetail,
    handleProgram,
    handleStepUp,
    handleStepDown,
    getListProgram,
    getListApplicantByPage,
    actualStep,
    setActualStep,
    handleAccept,
    handleReject,
    isAccepted,
    handleSubmitSearch,
    setInputSearchValue,
    lastPage,
    searchBy,
    setSearchBy,
  };
};
export default ApplicantListBloc;
