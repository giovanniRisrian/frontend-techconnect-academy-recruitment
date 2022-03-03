import { client } from "../../../../http-client/Client";

const DetailApplicantService = () => {
  const uploadDataApplicant = async (params, header) => {
    const response = await client.put("/applicant/insert", params, header);
    return response;
  };
  const updateDataApplicant = async (params, header) => {
    const response = await client.put("/applicant/update", params, header);
    return response;
  };
  const getDataApplicantbyId = async (params, header) => {
    const response = await client.get("/applicant/find?id=" + params, header);
    return response;
  };
  async function acceptApplicant(applicant, header) {
    const response = await client.put(
      "/program_applicant/next_selection",
      applicant, header
    );
    return response;
  }
  async function rejectApplicant(applicant, header) {
    const response = await client.put("/program_applicant/rejected", applicant, header);
    return response;
  }
  async function getDetailAppliedProgram(idProgram, idApplicant, header){
    const response =  await client.get(`/program_applicant/detailed?program_id=${idProgram}&applicant_id=${idApplicant}`, header)
    return response;
}

  return {
    uploadDataApplicant,
    updateDataApplicant,
    getDataApplicantbyId,
    acceptApplicant,
    rejectApplicant,
    getDetailAppliedProgram
  };
};
export default DetailApplicantService;
