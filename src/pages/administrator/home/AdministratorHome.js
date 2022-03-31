import { Typography, Box } from "@mui/material";
import admin from "../../../asset/image/Admin.png";

const AdministratorHome = () => {
  return (
    <Box sx={{backgroundColor:'#F2F2F2', height:'100vh'}}>
      
        <Box display="flex" justifyContent="center" alignItems="center" paddingTop='5%'>
          <Typography variant="h2" fontFamily="Montserrat">
            Welcome Administrator
          </Typography>
          <img src={admin} alt="admin-photo" />
        </Box>

    </Box>
  );
};
export default AdministratorHome;
