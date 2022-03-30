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

  return {
    getListRecruiter,
    deleteRecruiter,
  };
};

export default RecruiterService;
