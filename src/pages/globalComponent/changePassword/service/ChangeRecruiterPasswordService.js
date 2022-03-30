import { client } from "../../../../http-client/Client";

const ChangeRecruiterPasswordService = () => {
  const postChangePassword = async (params, header) => {
    const response = await client.put(`/user/password`, params, header);
    return response;
  };
  return { postChangePassword };
};

export default ChangeRecruiterPasswordService;
