import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import ActionType from "../../../../../Context/ActionType";
import jwt_decode from "jwt-decode";
import md5 from "blueimp-md5";
import { RootContext } from "../../../../../App";
import { useContext } from "react";
const GoogleLoginButtonBloc = (GoogleLoginButtonService) => {
  let { postLogin, postRegister } = GoogleLoginButtonService();
  const context = useContext(RootContext);
  let navigate = useNavigate();
  const doLogin = async (obj, fullname) => {
    try {
      let res = await postLogin(obj);
      console.log(res);
      localStorage.setItem("token", res.data.data.token);
      context.dispatch({
        type: ActionType.LOGIN,
        token: res.data.data.token,
        name: res.data.data.name,
      });
      let role = jwt_decode(res.data.data.token).Role;
      console.log("Login Google Berhasil");
      if (role !== "user") {
        navigate("/" + role);
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      try {
        console.log("inifulnname :", fullname);
        const newObj = {
          fullname: fullname,
          email: obj.username,
          password: obj.password,
        };
        // obj.fullname = fullname;
        const res = await postRegister(newObj);
        localStorage.setItem("token", res.data.data.token);
        context.dispatch({
          type: ActionType.LOGIN,
          token: res.data.data.token,
          name: res.data.data.name,
        });
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const clientId =
    "765193159209-13h77s7f6l1a1ua96nh6moge7m96merp.apps.googleusercontent.com";
  const onSuccess = (res) => {
    console.log("[Login Success] Current Users:", res.profileObj);
    console.log(res);
    let username = res.profileObj.email;
    let password = md5(res.profileObj.googleId);
    const obj = { username: username, password: password };
    doLogin(obj, res.profileObj.name);
  };
  const onFailure = (res) => {
    console.log("[Login Failed] res:", res);
  };
  return { clientId, onFailure, onSuccess };
};
export default GoogleLoginButtonBloc;
