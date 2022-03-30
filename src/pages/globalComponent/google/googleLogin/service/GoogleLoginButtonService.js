import { client } from "../../../../../http-client/Client";

const GoogleLoginButtonService = () => {
  const postLogin = async (params) => {
    const response = await client.post("/login", {}, { auth: params });
    return response;
  };
  const postRegister = async (params) => {
    const response = await client.post("/user/register/google", params);
    return response;
  };
  return { postLogin,postRegister };
};
export default GoogleLoginButtonService;
