import { Box } from "@mui/system";
import MyComponent from "../homepage/BackgroundImage";
import notfound from "../../asset/image/404.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
    let navigate = useNavigate()
  return (
    <MyComponent>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        paddingTop="50px"
      >
        <img src={notfound} alt="page-not-found" style={{width: "50%"}}/>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
      <Button onClick={()=> navigate("/")}>Go To Home</Button>
      </Box>
      
    </MyComponent>
  );
};

export default NotFoundPage;
