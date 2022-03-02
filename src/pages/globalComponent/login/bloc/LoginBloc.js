// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ActionType from "../../../../Context/ActionType";

import jwt_decode from 'jwt-decode';
import Swal from "sweetalert2";
const LoginBloc = (LoginService) => {
  let { postLogin } = LoginService();

  let navigate = useNavigate()
  const doLogin = async (formik,context) => {
    try {
      // console.log(formik.values)
      const basicAuth = {username:formik.values.email,password:formik.values.password}
      let res = await postLogin(basicAuth);
    // // console.log(res)
    localStorage.setItem("token", res.data.data.token)
    context.dispatch({type:ActionType.LOGIN,token:res.data.data.token,name:res.data.data.name})
    let role=jwt_decode(res.data.data.token).Role
    if (role!=='user'){
      navigate('/'+role)
    }else{
    navigate('/dashboard')
  }} catch (err) {
    Swal.fire({
      icon: "error",
      
      text: "Username or Password is invalid",
    });
        // alert('Username or Password is invalid')
    }
  };
  return { doLogin };
};
export default LoginBloc;
