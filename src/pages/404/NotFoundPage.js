import { Box } from "@mui/system";
import notfound from "../../asset/image/404.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { styled } from "@mui/system";
import background from "../../asset/image/background.jpg";

const BodyBackground = styled("div")({
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  minHeight: "100vh",
});

const NotFoundPage = () => {
  let navigate = useNavigate();
  return (
    <BodyBackground>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginBottom='50px'
      > 
      
        <img src={notfound} alt="page-not-found" style={{ width: "50%" }} />
        <Button
          sx={{ fontSize: "18px" }}
          color="secondary"
          onClick={() => navigate("/")}
        >
          Go To Home
        </Button>
      </Box>
    </BodyBackground>
  );
};

export default NotFoundPage;
