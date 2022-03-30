import { client } from "../../../../http-client/Client";

const VacancyService = () => {
  async function getInformationProgram(page, filter, search) {
    const response = await client.get(
      `/program?page=${page}&limit=6&sort_by=created_at&order_by=desc&name=${search}&program_type=${filter}`
    );
    return response;
  }
  async function getDetailInformationProgram(id) {
    const response = await client.get(`/program?id=${id}`);
    return response;
  }
  async function applyProgram(params, header) {
    const response = await client.post(
      `/program_applicant/apply`,
      params,
      header
    );
    return response;
  }

  const getDataApplicantbyId = async (header) => {
    const response = await client.get("/user", header);
    return response;
  };
  const getProgramType = async () => {
    const response = await client.get(`/program/programtype`);
    return response;
  };
  async function getAppliedProgram( params, header) {
    const response = await client.get(
      `/program_applicant/applicant/applied?id=${params}`,
      header
    );
    return response;
  }

  return {
    getInformationProgram,
    getDetailInformationProgram,
    applyProgram,
    getDataApplicantbyId,
    getProgramType,
    getAppliedProgram,
  };
};

export default VacancyService;
