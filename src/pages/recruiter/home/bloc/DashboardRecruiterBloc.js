const DashboardRecruiterBloc = (navigation) => {
  const { navigateTo } = navigation();

  const handleSeeApplicantList = () => {
    navigateTo(`/applicants`);
  };

  const handleJobPosting = (id) => {
    navigateTo(`/programs`);
  };
  return { handleSeeApplicantList, handleJobPosting };
};

export default DashboardRecruiterBloc;
