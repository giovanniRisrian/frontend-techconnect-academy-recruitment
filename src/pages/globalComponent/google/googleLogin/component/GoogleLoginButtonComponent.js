import GoogleLogin from "react-google-login";
import { useContext } from "react";
import { RootContext } from "../../../../../App";
const GoogleLoginButtonComponent = ({ bloc }) => {
  const context = useContext(RootContext);
  const { clientId, onSuccess, onFailure } = bloc();
  
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login by Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      style={{ marginTop: "100px" }}
    //   isSignedIn={true}
    />
  );
};
export default GoogleLoginButtonComponent;
