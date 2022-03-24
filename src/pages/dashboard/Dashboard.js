import { useContext } from "react";
import { RootContext } from "../../App";
import LogoutButton from "../globalComponent/logout/LogoutButton";
import UploadButton from "../globalComponent/uploadButton/UploadButton";
import jwt_decode from "jwt-decode";
import { Grid } from "@mui/material";
import MyComponent from "../homepage/BackgroundImage";

const Dashboard = () => {
  const data = useContext(RootContext);
  let userInfo = jwt_decode(data.userInfo);
  // // console.log("data",userInfo);
  //   const navigate = useNavigate();
  //   const handleLogout = () => {
  //     localStorage.removeItem("token");
  //     data.dispatch({ name: null, token: null });
  //     navigate("/login");
  //   };
  return (
    <div>
      {/* <Navbar/> */}

      {/* <LogoutButton/><br/> */}
      <MyComponent>
        <Grid container
           direction="column"
           alignItems="center"
           justifyContent="center"
        >
          <Grid item md={12} textAlign="center">
            <UploadButton />
          </Grid>
        </Grid>
      </MyComponent>
    </div>
  );
};
export default Dashboard;
