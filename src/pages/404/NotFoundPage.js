import { Box } from "@mui/system";
import notfound from "../../asset/image/404.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { styled } from "@mui/system";

const BodyBackground = styled("div")({
  backgroundColor:'#F2F2F2',
  height:'89vh'
});

const NotFoundPage = () => {
  let navigate = useNavigate();
  return (
    <BodyBackground>
      <Box sx={{backgroundImage:`url(${notfound})`, backgroundSize:'cover', height:'70vh'}}>
    
      </Box>
      <Box display='flex' justifyContent='center' sx={{marginTop:'3%', backgroundColor:'#F2F2F2'}}>
      <Button
          sx={{ fontSize: "18px", display:'flex', justifyContent:'center' }}
          color="secondary"
          variant='outlined'
          
          onClick={() => navigate("/")}
        >
          Go To Home
        </Button>
      </Box>
    

    
    </BodyBackground>
  );
};

export default NotFoundPage;
