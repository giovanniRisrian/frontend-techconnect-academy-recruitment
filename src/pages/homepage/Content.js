import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { CardContent, Typography, Card } from "@mui/material";
import image1 from "../../asset/image/image-intro.png";
import Button from "@mui/material/Button";
import image2 from "../../asset/image/homepage2.png";
import program1 from "../../asset/image/pichom1.png";
import program2 from "../../asset/image/pichom2.png";
import program3 from "../../asset/image/pichom3.png";
import program4 from "../../asset/image/pichom4.png";
import { useNavigate } from "react-router";

const Content = () => {
  let navigate = useNavigate();
  return (
    <Box>
      <Grid container >
        <Grid items md={5} sm={12} xs={12} sx={{paddingTop:"50px"}}>
          <Typography
            textAlign="left"
            sx={{
              typography: { lg: "h3", sm: "h4", xs: "h4" },
              fontWeight: {
                lg: "600",
                md: "600",
                sm: "600",
                xs: "600",
              },
              fontFamily: {
                lg: "Montserrat Alternates",
                md: "Montserrat Alternates",
                sm: "Montserrat Alternates",
                xs: "Montserrat Alternates",
              },
            }}
          >
            Prepare for a career in The Future of Programming
          </Typography>
          <Typography
            variant="h6"
            fontFamily="Montserrat Alternates"
            paddingTop="10px"
            textAlign="center"
          >
            With Techconnect Academy
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop="20px"
          >
            <Button
              variant="contained"
              onClick={() => navigate("/register")}
              sx={{ backgroundColor: "#521582", marginRight: "20px" }}
            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/login")}
              sx={{ color: "#521582", borderColor: "#521582" }}
            >
              Login
            </Button>
          </Box>
        </Grid>
        <Grid item md={7} sm={12} xs={12}>
          <img
            src={image1}
            alt="image1"
            style={{ width: "-webkit-fill-available" }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={6} sm={12} xs={12}>
          <img
            src={image2}
            alt="image2"
            style={{ width: "-webkit-fill-available" }}
          />
        </Grid>

        <Grid items md={6} sm={12} xs={12}>
          <Typography
            letterSpacing="5px"
            textAlign="center"
            sx={{
              typography: { lg: "h3", sm: "h4", xs: "h4" },
              fontWeight: {
                lg: "600",
                md: "600",
                sm: "600",
                xs: "600",
              },
              fontFamily: {
                lg: "Montserrat Alternates",
                md: "Montserrat Alternates",
                sm: "Montserrat Alternates",
                xs: "Montserrat Alternates",
              },
            }}
          >
            Techconnect Academy
          </Typography>
          <br />
          <Typography fontFamily="Montserrat Alternates" textAlign="center">
            is a place of diserve community that <br /> encourages students to
            think globally and citizens that crave <br />
            for a better future, for themselves, society, community through
            digital <br /> and technology education
          </Typography>
          <Box textAlign="right" marginRight="20px" marginTop="10px">
            <Button variant="contained" sx={{ backgroundColor: "#521582" }}>
              See Details
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Typography
        letterSpacing="5px"
        color="#343434"
        textAlign="center"
        paddingTop="10px"
        sx={{
          typography: { lg: "h3", sm: "h4", xs: "h4" },
          fontWeight: {
            lg: "600",
            md: "600",
            sm: "600",
            xs: "600",
          },
          fontFamily: {
            lg: "Montserrat Alternates",
            md: "Montserrat Alternates",
            sm: "Montserrat Alternates",
            xs: "Montserrat Alternates",
          },
        }}
      >
        Program We Offer at <br /> Techconnect Academy
      </Typography>

      <Grid
        container
        paddingX="10px"
        marginTop="30px"
      >
        <Grid item md={3} sm={12} xs={12} sx={{ marginBottom: "10px" }}>
          <Card
            sx={{
              borderRadius: "15px",
              width: "250px",
              height: "250px",
              backgroundImage: `url(${program1})`,
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                fontFamily="Montserrat"
                fontWeight="600"
                color="#464646"
                textAlign="center"
                marginTop="50px"
              >
                Vocational Program
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} sm={12} xs={12} sx={{ marginBottom: "10px" }}>
          <Card
            sx={{
              borderRadius: "15px",
              width: "250px",
              height: "250px",
              backgroundImage: `url(${program2})`,
              opacity:"1.0"
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                fontFamily="Montserrat"
                fontWeight="600"
                color="#464646"
                textAlign="center"
                marginTop="50px"
              >
                Fresh Graduate Program
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} sm={12} xs={12} sx={{ marginBottom: "10px" }}>
          <Card
            sx={{
              borderRadius: "15px",
              width: "250px",
              height: "250px",
              backgroundImage: `url(${program3})`,
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                fontFamily="Montserrat"
                fontWeight="600"
                color="#464646"
                textAlign="center"
                marginTop="50px"
              >
                IT <br /> Professional Program
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} sm={12} xs={12} sx={{ marginBottom: "10px" }}>
          <Card
            sx={{
              borderRadius: "15px",
              width: "250px",
              height: "250px",
              backgroundImage: `url(${program4})`,
            }}
          >
            <CardContent>
              <Typography
                fontSize="30px"
                fontFamily="Montserrat"
                fontWeight="600"
                color="#464646"
                textAlign="center"
                marginTop="50px"
              >
                IT Development Program
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Content;
