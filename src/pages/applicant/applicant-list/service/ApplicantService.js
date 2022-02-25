import { client } from "../../../../http-client/Client";


const ApplicantService = () => {
  const getApplicants = async (data) => {
    const response = await client.get("/applicants", { params: data });
    return response;
  };

  const getApplicant = async (id) => {
    const response = await client.get(`/applicants/${id}`);
    return response;
  };

  return { getApplicants, getApplicant };
};

export default ApplicantService;
