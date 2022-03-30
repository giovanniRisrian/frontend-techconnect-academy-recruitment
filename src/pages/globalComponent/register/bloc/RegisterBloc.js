// import { useNavigate } from "react-router-dom";
import ActionType from "../../../../Context/ActionType";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
const RegisterBloc = (RegisterService) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let { postRegister, postRegisterRecruiter } = RegisterService();
  const doRegister = async (formik, context) => {
    try {
      setLoading(true);
      let res = await postRegister(formik.values);
      context.dispatch({
        type: ActionType.LOGOUT,
        // token: res.data.data.token,
        // name: res.data.data.name,
      });
      setLoading(false);
      Swal.fire({
        title: "Success!",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Email has already exist",
      });
      throw err;
    }
  };
  const doRegisterRecruiter = async (formik, context) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${context.userInfo}` },
      };
      let res = await postRegisterRecruiter(formik.values, config);

      // console.log(res);
      context.dispatch({
        type: ActionType.Register,
        token: res.data.data.token,
        name: res.data.data.name,
      });
      Swal.fire({
        title: "Success!",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/administrator/list/recruiter");
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Email has already exist",
      });
      throw err;
    }
  };
  return { doRegister, doRegisterRecruiter, loading };
};
export default RegisterBloc;
