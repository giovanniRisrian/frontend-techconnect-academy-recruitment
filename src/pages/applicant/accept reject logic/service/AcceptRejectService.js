import { client } from "../../../../http-client/Client";

// route nya masih boleh disesuaikan
const AcceptRejectService = () => {
  async function acceptApplicant(applicant) {
    const response = await client.post("/profile", applicant);
    return response;
  }

  async function rejectApplicant(applicant) {
    const response = await client.post("/profile", applicant);
    return response;
  }
  return { acceptApplicant, rejectApplicant };
};

export default AcceptRejectService;
