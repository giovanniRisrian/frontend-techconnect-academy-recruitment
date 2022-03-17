import { client } from "../../../../http-client/Client";

const ApplicantService = () => {
  const getPrograms = async (data) => {
    const response = await client.get(`/program/`, { params: data });
    return response;
  };
  const getProcess = async (data) => {
    const response = await client.get(`/process/`, { params: data });
    return response;
  };

  const getApplicantsByProgram = async (programId, process, header) => {
    const response = await client.get(
      `/program_applicant/program/process?program_id=${programId}&process=${process}`, header
    );
    return response;
  };

  const getApplicant = async (id) => {
    const response = await client.get(`applicant/find?id=${id}`);
    return response;
  };

  return { getApplicantsByProgram, getApplicant, getPrograms, getProcess };
};

export default ApplicantService;
