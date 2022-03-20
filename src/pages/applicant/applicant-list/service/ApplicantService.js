import { client } from "../../../../http-client/Client";

const ApplicantService = () => {
  const getPrograms = async (data) => {
    const response = await client.get(`/program`, { params: data });
    return response;
  };

  const getApplicantsByProgram = async (programId, process, header, page) => {
    const response = await client.get(
      `/program_applicant/program/process?program_id=${programId}&process=${process}&page=${page}&limit=10`,
      header
    );
    return response;
  };

  const getRejectedApplicantsByProgram = async (
    programId,
    process,
    header,
    page
  ) => {
    const response = await client.get(
      `/program_applicant/program/rejected?program_id=${programId}&process=${process}&page=${page}&limit=10`,
      header
    );
    return response;
  };

  const searchApplicantByName = async (
    programId,
    header,
    page,
    process,
    data
  ) => {
    const response = await client.get(
      `/program_applicant/program/process/name?program_id=${programId}&page=${page}&process=${process}&limit=${10}&name=${data}`,
      header
    );
    return response;
  };

  const searchApplicantByInstitution = async (
    programId,
    header,
    page,
    process,
    data
  ) => {
    const response = await client.get(
      `/program_applicant/program/process/institution?program_id=${programId}&page=${page}&process=${process}&limit=${10}&institution=${data}`,
      header
    );
    return response;
  };

  const searchApplicantByGpa = async (
    programId,
    header,
    page,
    process,
    data
  ) => {
    const response = await client.get(
      `/program_applicant/program/process/gpa?program_id=${programId}&page=${page}&process=${process}&limit=${10}&gpa=${data}`,
      header
    );
    return response;
  };

  const searchApplicantByAge = async (
    programId,
    header,
    page,
    process,
    data
  ) => {
    const response = await client.get(
      `/program_applicant/program/process/age?program_id=${programId}&page=${page}&process=${process}&limit=${10}&age=${data}`,
      header
    );
    return response;
  };

  const searchApplicantByWorkExp = async (
    programId,
    header,
    page,
    process,
    data
  ) => {
    const response = await client.get(
      `/program_applicant/program/process/workexperience?program_id=${programId}&page=${page}&process=${process}&limit=${10}&experience=${data}`,
      header
    );
    return response;
  };

  return {
    getApplicantsByProgram,
    getPrograms,
    getRejectedApplicantsByProgram,
    searchApplicantByName,
    searchApplicantByInstitution,
    searchApplicantByGpa,
    searchApplicantByAge,
    searchApplicantByWorkExp,
  };
};

export default ApplicantService;
