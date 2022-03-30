import { client } from "../../../../http-client/Client";

const UpdateRecruiterService = () => {
  async function getRecruiterbyId(id, header) {
    const response = await client.get(
      `/administrator/recruiter?id=${id}`,
      header
    );
    return response;
  }

  async function updateRecruiter(params, header) {
    const response = await client.put(
      "/administrator/update/recruiter",
      params,
      header
    );
    return response;
  }

  return { getRecruiterbyId, updateRecruiter };
};

export default UpdateRecruiterService;
