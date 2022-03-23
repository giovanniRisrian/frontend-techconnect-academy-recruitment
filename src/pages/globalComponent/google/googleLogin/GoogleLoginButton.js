import react from "react";
import GoogleLogin from "react-google-login";
import GoogleLoginButtonBloc from "./bloc/GoogleLoginButtonBloc";
import GoogleLoginButtonComponent from "./component/GoogleLoginButtonComponent";
import GoogleLoginButtonService from "./service/GoogleLoginButtonService";
const GoogleLoginButton = () => {

  localStorage.removeItem("oauth2_ss::http://localhost:3000::1::DEFAULT::_ss_");
  return (
    <div>
     <GoogleLoginButtonComponent bloc={() => GoogleLoginButtonBloc(GoogleLoginButtonService)}/>
    </div>
  );
};
export default GoogleLoginButton;
