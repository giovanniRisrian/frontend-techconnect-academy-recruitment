// import { useNavigate } from "react-router-dom";
import ActionType from "../../../../Context/ActionType";
const RegisterBloc = (RegisterService) => {
  let { postRegister, postRegisterRecruiter } = RegisterService();
  const doRegister = async (formik, context) => {
    try {
      let res = await postRegister(formik.values);

      console.log(res);
      context.dispatch({
        type: ActionType.Register,
        token: res.data.token,
        name: res.data.data.name,
      });
    } catch (err) {
      alert(err);
    }
  };
  const doRegisterRecruiter = async (formik, context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      let res = await postRegisterRecruiter(formik.values,config);

      console.log(res);
      context.dispatch({
        type: ActionType.Register,
        token: res.data.token,
        name: res.data.data.name,
      });
    } catch (err) {
      alert(err);
    }
  };
  return { doRegister, doRegisterRecruiter };
};
export default RegisterBloc;
