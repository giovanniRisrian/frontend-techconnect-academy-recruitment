import { Typography, Box } from "@mui/material";
import MyComponent from "../../homepage/BackgroundImage";
import admin from "../../../asset/image/Admin.png";

const AdministratorHome = () => {
  return (
    <div>
      <MyComponent>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h2" fontFamily="Montserrat">
            Welcome Administrator
          </Typography>
          <img src={admin} alt="admin-photo" />
        </Box>
      </MyComponent>
    </div>
  );
};
export default AdministratorHome;
