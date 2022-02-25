const ApplicantListBloc = (
  useApplicantList,
  applicantRepository,
  navigation
) => {
  let { applicantList, setApplicantList } = useApplicantList();
  let { getApplicants } = applicantRepository();
  const { navigateTo } = navigation();

  const getListApplicant = async () => {
    try {
      const response = await getApplicants();
      setApplicantList(response.data.applicants);
    } catch (e) {
      setApplicantList({});
    }
  };

  const handleSeeDetail = (id) => {
    navigateTo(`/applicants/${id}`);
  };

  return { applicantList, getListApplicant, handleSeeDetail };
};
export default ApplicantListBloc;
