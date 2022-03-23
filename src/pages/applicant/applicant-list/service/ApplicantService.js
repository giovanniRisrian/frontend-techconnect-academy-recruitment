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

  const getUnqualifiedApplicantsByProgram = async (
    programId,
    process,
    header,
    page
  ) => {
    const response = await client.get(
      `/program_applicant/program/process/under?program_id=${programId}&process=${process}&page=${page}&limit=10`,
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

  const searchUnderApplicantByName = async (
    programId,
    header,
    page,
    process,
    data
  ) => {
    const response = await client.get(
      `/program_applicant/program/process/under/name?program_id=${programId}&page=${page}&process=${process}&limit=${10}&name=${data}`,
      header
    );
    return response;
  };

  const searchUnderApplicantByInstitution = async (
    programId,
    header,
    page,
    process,
    data
  ) => {
    const response = await client.get(
      `/program_applicant/program/process/under/institution?program_id=${programId}&page=${page}&process=${process}&limit=${10}&institution=${data}`,
      header
    );
    return response;
  };

  const searchUnderApplicantByGpa = async (
    programId,
    header,
    page,
    process,
    data
  ) => {
    const response = await client.get(
      `/program_applicant/program/process/under/gpa?program_id=${programId}&page=${page}&process=${process}&limit=${10}&gpa=${data}`,
      header
    );
    return response;
  };

  const searchUnderApplicantByAge = async (
    programId,
    header,
    page,
    process,
    data
  ) => {
    const response = await client.get(
      `/program_applicant/program/process/under/age?program_id=${programId}&page=${page}&process=${process}&limit=${10}&age=${data}`,
      header
    );
    return response;
  };

  const searchUnderApplicantByWorkExp = async (
    programId,
    header,
    page,
    process,
    data
  ) => {
    const response = await client.get(
      `/program_applicant/program/process/under/workexperience?program_id=${programId}&page=${page}&process=${process}&limit=${10}&experience=${data}`,
      header
    );
    return response;
  };

  return {
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
  };
};

export default ApplicantService;
