import GoogleLogin from "react-google-login";
import { useContext } from "react";
import { RootContext } from "../../../../../App";
import {Box} from '@mui/material'
const GoogleLoginButtonComponent = ({ bloc }) => {
  const context = useContext(RootContext);
  const { clientId, onSuccess, onFailure } = bloc();

  return (
    <Box
    display='flex'
    alignItems='center'
    justifyContent='center'
    sx={{marginTop:'10px', paddingBottom:'15%'}}
    >
      <GoogleLogin
        clientId={clientId}
        buttonText="Login by Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        // style={{ marginTop: "100px" }}
        //   isSignedIn={true}
      />
    </Box>
  );
};
export default GoogleLoginButtonComponent;
