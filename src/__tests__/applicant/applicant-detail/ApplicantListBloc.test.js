import ApplicantListBloc from "../../../pages/applicant/applicant-list/bloc/ApplicantListBloc";

describe("Applicant list Bloc", () => {
  let applicantRepositoryMock;
  let useApplicantListMock;
  let navigationMock;

  beforeEach(() => {
    applicantRepositoryMock = jest.fn();
    useApplicantListMock = jest.fn();
    navigationMock = jest.fn();
  });

  test("getListProgram", async () => {
    let programs = [{ id: 1 }, { id: 2 }];

    let getProgramListReturnMock = jest
      .fn()
      .mockResolvedValue({ data: { data: programs } });
    applicantRepositoryMock.mockReturnValue({
      getPrograms: getProgramListReturnMock,
    });

    let setProgramListMock = jest.fn();
    useApplicantListMock.mockReturnValue({
      programList: programs,
      setProgramList: setProgramListMock,
    });
    navigationMock.mockReturnValue({
      navigationTo: jest.fn(),
    });

    let bloc = ApplicantListBloc(
      useApplicantListMock,
      applicantRepositoryMock,
      navigationMock
    );
    await bloc.getListProgram();
    expect(setProgramListMock).toHaveBeenCalledWith(programs);
    expect(useApplicantListMock().programList.length).toEqual(2);
  });

  test("getListApplicantByPage", async () => {
    let applicants = [{ id: 1 }, { id: 2 }];
    let setApplicantListMock = jest.fn();
    useApplicantListMock.mockReturnValue({
      applicantList: applicants,
      setApplicantList: setApplicantListMock,
    });
    let getApplicantListReturnMock = jest
      .fn()
      .mockResolvedValue({ data: { data: { ApplicantInfo: applicants } } });
    applicantRepositoryMock.mockReturnValue({
      getApplicantsByProgram: getApplicantListReturnMock,
    });
    navigationMock.mockReturnValue({
      navigationTo: jest.fn(),
    });
    let bloc = ApplicantListBloc(
      useApplicantListMock,
      applicantRepositoryMock,
      navigationMock
    );
    await bloc.getListApplicantByPage(1, 1);
    expect(setApplicantListMock).toHaveBeenCalledWith(applicants);
    expect(useApplicantListMock().applicantList.length).toEqual(2);
  });

  //   test("handleProgram handler", () => {
  //     let setPageMock = jest.fn();
  //     let setProgramIdMock = jest.fn();
  //     let setIsProgramMock = jest.fn();
  //     let setProgramMock = jest.fn();
  //     applicantRepositoryMock.mockReturnValue({
  //       getPrograms: jest.fn(),
  //     });
  //     useApplicantListMock.mockReturnValue({
  //       page: "",
  //       setPage: setPageMock,
  //       programId: "",
  //       setProgramId: setProgramIdMock,
  //       isProgram: "",
  //       setIsProgram: setIsProgramMock,
  //       program: "",
  //       setProgram: setProgramMock,
  //     });
  //     navigationMock.mockReturnValue({
  //       navigateTo: jest.fn(),
  //     });
  //     let bloc = ApplicantListBloc(
  //       useApplicantListMock,
  //       applicantRepositoryMock,
  //       navigationMock
  //     );
  //     bloc.handleProgram(1, 1);
  //     expect(setPageMock).toBeCalledTimes(1);
  //     expect(setProgramIdMock).toBeCalledTimes(1);
  //     expect(setIsProgramMock).toBeCalledTimes(1);
  //     expect(setProgramMock).toBeCalledTimes(1);
  //   });

  test("handleSeeSetail handler", () => {
    applicantRepositoryMock.mockReturnValue({
      getListApplicantByPage: jest.fn(),
    });

    let setProgramListMock = jest.fn();
    useApplicantListMock.mockReturnValue({
      programList: "",
      SetProgramList: setProgramListMock,
    });

    navigationMock.mockReturnValue({
      navigateTo: jest.fn(),
    });
    let bloc = ApplicantListBloc(
      useApplicantListMock,
      applicantRepositoryMock,
      navigationMock
    );
    bloc.handleSeeDetail();
    expect(navigationMock).toHaveBeenCalledTimes(1);
  });

  //   test("handleStepUp handler", () => {
  //     let setStepMock = jest.fn();
  //     let setActualStepMock = jest.fn();

  //     applicantRepositoryMock.mockReturnValue({
  //       getPrograms: jest.fn(),
  //     });
  //     useApplicantListMock.mockReturnValue({
  //       step: "",
  //       setStep: setStepMock,
  //       programId: "",
  //       setActualStep: setActualStepMock,
  //     });
  //     navigationMock.mockReturnValue({
  //       navigateTo: jest.fn(),
  //     });
  //     let bloc = ApplicantListBloc(
  //       useApplicantListMock,
  //       applicantRepositoryMock,
  //       navigationMock
  //     );
  //     bloc.handleStepUp();
  //     expect(setStepMock).toBeCalledTimes(1);
  //     expect(setActualStepMock).toBeCalledTimes(1);
  //   });

  //   test("getAge", () => {
  //     applicantRepositoryMock.mockReturnValue({
  //       getListApplicantByPage: jest.fn(),
  //     });

  //     let setProgramListMock = jest.fn();
  //     useApplicantListMock.mockReturnValue({
  //       programList: "",
  //       SetProgramList: setProgramListMock,
  //     });

  //     navigationMock.mockReturnValue({
  //       navigateTo: jest.fn(),
  //     });
  //     let bloc = ApplicantListBloc(
  //       useApplicantListMock,
  //       applicantRepositoryMock,
  //       navigationMock
  //     );
  //     bloc.getAge("2019");
  //     expect(useApplicantListMock()).toEqual();
  //   });
});
