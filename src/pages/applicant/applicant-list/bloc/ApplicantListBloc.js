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
    error,
    setError,
  } = useApplicantList();

  let {
    getApplicantsByProgram,
    getPrograms,
    getUnqualifiedApplicantsByProgram,
    getRejectedApplicantsByProgram,
    searchApplicantByName,
    searchApplicantByInstitution,
    searchApplicantByGpa,
    searchApplicantByAge,
    searchApplicantByWorkExp,
    searchUnderApplicantByName,
    searchUnderApplicantByInstitution,
    searchUnderApplicantByGpa,
    searchUnderApplicantByAge,
    searchUnderApplicantByWorkExp,
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

  const getListUnqualifiedApplicantByPage = async (
    data1,
    data2,
    context,
    data3
  ) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      const response = await getUnqualifiedApplicantsByProgram(
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

  const handleSubmitSearch = async (e, context, page) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };

      if (e.keyCode === 13) {
        let response;
        console.log("Udah masuk bloc", searchValue);
        if (isAccepted === "true") {
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
            case "College":
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
            case "":
              setError("error");
              setApplicantList([]);
              return;
          }
        } else if (isAccepted === "unqualified") {
          switch (searchBy) {
            case "Name":
              response = await searchUnderApplicantByName(
                programId,
                config,
                page,
                step,
                searchValue
              );
              break;
            case "College":
              response = await searchUnderApplicantByInstitution(
                programId,
                config,
                page,
                step,
                searchValue
              );
              break;
            case "GPA":
              response = await searchUnderApplicantByGpa(
                programId,
                config,
                page,
                step,
                searchValue
              );
              break;
            case "Age":
              response = await searchUnderApplicantByAge(
                programId,
                config,
                page,
                step,
                searchValue
              );
              break;
            case "Work Experience":
              response = await searchUnderApplicantByWorkExp(
                programId,
                config,
                page,
                step,
                searchValue
              );
              break;
            case "":
              setError("error");
              setApplicantList([]);
              return;
          }
        }

        console.log("response output", response);
        setLastPage(response.data.data.LastPage);
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
    if (isAccepted === "true") {
      getListApplicantByPage(programId, step, header, 1);
    } else if (isAccepted === "unqualified") {
      getListUnqualifiedApplicantByPage(programId, step, header, 1);
    } else if (isAccepted === "false") {
      getListRejectedApplicantByPage(programId, step, header, 1);
    }
    setSearchBy("");
    setError("");
    setSearchValue("");
    setActualStep(0);
    setStep(1);
    setPage(1);
    setProgramId(programId);
    setIsProgram(true);
    setProgram(program.props.children);
  };

  const handleAccept = (header) => {
    getListApplicantByPage(programId, step, header, page);
    setIsAccepted("true");
    setSearchBy("");
    setError("");
    setSearchValue("");
  };

  const handleUnqualified = (header) => {
    getListUnqualifiedApplicantByPage(programId, step, header, page);
    setIsAccepted("unqualified");
    setSearchBy("");
    setError("");
    setSearchValue("");
  };

  const handleReject = (header) => {
    getListRejectedApplicantByPage(programId, step, header, page);
    setIsAccepted("false");
    setSearchBy("");
    setError("");
    setSearchValue("");
  };

  const handlePage = (page, header) => {
    if (searchBy) {
      handleSubmitSearch({ keyCode: 13 }, header, Number(page));
    } else {
      if (isAccepted === "true") {
        getListApplicantByPage(programId, step, header, Number(page));
      } else if (isAccepted === "unqualified") {
        getListUnqualifiedApplicantByPage(
          programId,
          step,
          header,
          Number(page)
        );
      } else if (isAccepted === "false") {
        getListRejectedApplicantByPage(programId, step, header, Number(page));
      }
    }

    setPage(Number(page));
  };

  const handleSeeDetail = (applicantId) => {
    navigateTo(`details/${programId}/${applicantId}`);
  };

  const handleStepUp = (header) => {
    let stepUp = step + 1;
    if (isAccepted === "true") {
      getListApplicantByPage(programId, stepUp, header, page);
    } else if (isAccepted === "unqualified") {
      getListUnqualifiedApplicantByPage(programId, stepUp, header, page);
    } else if (isAccepted === "false") {
      getListRejectedApplicantByPage(programId, stepUp, header, page);
    }
    setSearchBy("");
    setError("");
    setSearchValue("");
    setStep((prevValue) => prevValue + 1);
    setActualStep((prevValue) => prevValue + 1);
  };

  const handleStepDown = (header) => {
    let stepDown = step - 1;

    if (isAccepted === "true") {
      getListApplicantByPage(programId, stepDown, header, page);
    } else if (isAccepted === "unqualified") {
      getListUnqualifiedApplicantByPage(programId, stepDown, header, page);
    } else if (isAccepted === "false") {
      getListRejectedApplicantByPage(programId, stepDown, header, page);
    }
    setSearchBy("");
    setError("");
    setSearchValue("");
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
    handleUnqualified,
    isAccepted,
    handleSubmitSearch,
    setInputSearchValue,
    lastPage,
    searchBy,
    setSearchBy,
    error,
    setError,
  };
};
export default ApplicantListBloc;
