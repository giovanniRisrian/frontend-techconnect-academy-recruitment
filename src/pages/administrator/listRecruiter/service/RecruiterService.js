import { client } from "../../../../http-client/Client";

const RecruiterService = () => {
  async function getListRecruiter(header) {
    const response = await client.get(`/administrator/recruiter`, header);
    return response;
  }

  async function deleteRecruiter(id, header) {
    const response = await client.delete(
      `/administrator/delete/recruiter?id=${id}`,
      header
    );
    return response;
  }

  const postRegisterRecruiter = async (params, header) => {
    const response = await client.post(
      "/administrator/register/recruiter",
      params,
      header
    );
    return response;
  };

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

  return {
    getListRecruiter,
    deleteRecruiter,
    postRegisterRecruiter,
    getRecruiterbyId,
    updateRecruiter,
  };
};

export default RecruiterService;
