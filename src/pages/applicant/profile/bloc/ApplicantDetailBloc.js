const ApplicantDetailBloc = (
  useApplicantDetail,
  applicantRepository,
  navigation
) => {
  let { applicantDetail, setApplicantDetail } = useApplicantDetail();
  let { getApplicant } = applicantRepository();
  const { paramsNav, navigateTo } = navigation();
  const params = paramsNav();

  const getApplicantDetail = async () => {
    try {
      const response = await getApplicant(params.id);
      return setApplicantDetail(response.data);
    } catch (e) {
      // do something?
      throw e;
    }
  };

  const handleSeeList = () => {
    navigateTo(`/applicants`);
  };

  return { applicantDetail, getApplicantDetail, handleSeeList };
};

export default ApplicantDetailBloc;
