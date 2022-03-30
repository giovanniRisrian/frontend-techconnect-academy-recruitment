// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ActionType from "../../../../Context/ActionType";
// import { AsyncStorage } from 'react-native';
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { useState } from "react";
const LoginBloc = (LoginService) => {
  let { postLogin } = LoginService();
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate();
  const doLogin = async (formik, context) => {
    try {
      // console.log(formik.values)
      const basicAuth = {
        username: formik.values.email,
        password: formik.values.password,
      };
      setLoading(true)
      let res = await postLogin(basicAuth);
      localStorage.setItem("token", res.data.data.token);
      context.dispatch({
        type: ActionType.LOGIN,
        token: res.data.data.token,
        name: res.data.data.name,
      });
      setLoading(false)
      let role = jwt_decode(res.data.data.token).Role;
      if (role !== "user") {
        navigate("/" + role);
      } else {
        navigate("/vacancy");
      }
    } catch (err) {
      if (err.response.data.code === 403) {
        Swal.fire({
          icon: "info",
          text: "Your account hasn't been activated yet, please check your email to activate your account",
          footer:'<a href="http://localhost:3000/activation">Resend activation link to your email</a>',
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Username or Password is invalid",
        });
      }
    }
  };
  return { doLogin, loading };
};
export default LoginBloc;
