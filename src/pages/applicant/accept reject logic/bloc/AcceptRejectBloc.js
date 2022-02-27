// navigation diambil dari route navigation di folder routes
const AcceptRejectBloc = (profileRepository, navigation) => {
  const { acceptApplicant, rejectApplicant } = profileRepository();
  let { paramsNav } = navigation();
  let params = paramsNav();
  let applicant = {
    applicantId: params.applicantId,
    programId: params.programId,
  };

  const handleAccept = async () => {
    try {
      await acceptApplicant(applicant);
    } catch (e) {
      throw e;
    }
  };

  const handleReject = async () => {
    try {
      await rejectApplicant(applicant);
    } catch (e) {
      throw e;
    }
  };
  return { handleAccept, handleReject };
};

export default AcceptRejectBloc;
