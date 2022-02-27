import { client } from "../../../../http-client/Client";

const ApplicantService = () => {
  const getPrograms = async (data) => {
    const response = await client.get(`/applicants/`, { params: data });
    return response;
  };

  const getApplicantsByProgram = async (programId, page) => {
    const response = await client.get(
      `/program_applicant/program?id=${programId}&page=${page}&limit=${20}`
    );
    return response;
  };

  const getApplicant = async (id) => {
    const response = await client.get(`applicant/find?id=${id}`);
    return response;
  };

  return { getApplicantsByProgram, getApplicant, getPrograms };
};

export default ApplicantService;
