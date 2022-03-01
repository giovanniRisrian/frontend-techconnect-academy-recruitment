// import { useNavigate } from "react-router-dom";
import ActionType from "../../../../Context/ActionType";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const RegisterBloc = (RegisterService) => {
  const navigate = useNavigate()
  let { postRegister, postRegisterRecruiter } = RegisterService();
  const doRegister = async (formik, context) => {
    try {
      let res = await postRegister(formik.values);

      console.log(res);
      localStorage.setItem("token", res.data.data.token)
      context.dispatch({
        type: ActionType.LOGIN,
        token: res.data.data.token,
        name: res.data.data.name,
      })
      Swal
      .fire({
        title: "Success!",
        icon: "success",
        confirmButtonText: "OK",
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard");
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Email has already exist",
      });
      throw err
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
        token: res.data.data.token,
        name: res.data.data.name,
      });
      Swal
      .fire({
        title: "Success!",
        icon: "success",
        confirmButtonText: "OK",
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("..");
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Email has already exist",
      });
      throw err
    }
  };
  return { doRegister, doRegisterRecruiter };
};
export default RegisterBloc;
