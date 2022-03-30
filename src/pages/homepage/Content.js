import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { CardContent, Typography, Card } from "@mui/material";
import image1 from "../../asset/image/image-intro.png";
import Button from "@mui/material/Button";
import image2 from "../../asset/image/homepage2.png";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import Carousel from "react-material-ui-carousel";
import Example from "./Carousel";

const StyledCard = styled(Card)`
  ${({ theme }) => `
  cursor: pointer;
  color:${"#FFF"};
  transition: ${theme.transitions.create(["transform", "color"], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
  
    color:${'#FFF'};
    transform: scale(1.05);
    
  }
  `}
`;
const Content = () => {
  let navigate = useNavigate();

  return (
    <Box>
      <Example />
      <Box
        sx={{
          boxShadow: 3,
          backgroundColor: "#FFF",
          width: "90%",
          marginX: "5%",
          height: "60vh",
          marginTop:'5%'
        }}
        display="flex"
        justifyContent="center"
        borderRadius="15px"
      >
        <Grid container>
          <Grid item md={6} sm={6} xs={6}>
            <img
              src={image2}
              alt="image2"
              style={{ width: "-webkit-fill-available" }}
            />
          </Grid>
          {/* <Grid item md={1} /> */}
          <Grid item md={6} sm={6} xs={6}>
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
            <Typography
              fontFamily="Montserrat Alternates"
              textAlign="center"
              sx={{ marginRight: "5%" }}
            >
              is a place of diserve community that encourages students to think
              globally and citizens that crave for a better future, for
              themselves, society, community through digital and technology
              education
            </Typography>
            <Box textAlign="center" marginTop="5%">
              <Button
                variant="contained"
                color="secondary"
                sx={{ borderRadius: "15px", backgroundColor:'#615B93', color:'#FFF' }}
                onClick={() => navigate("/about")}
              >
                See Details
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{paddingTop:'5%'}}>
        <Typography
          letterSpacing="5px"
          color="#343434"
          textAlign="center"
          sx={{
            typography: { lg: "h4", sm: "5", xs: "h5" },
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

        <Grid container>
          <Grid
            item
            md={3}
            sm={12}
            xs={12}
            sx={{ marginY:'3%'}}
            display="flex"
            justifyContent="center"
          >
            <StyledCard
              sx={{
                borderRadius: "15px",
                width: "200px",
                height: "200px",
                backgroundColor:'#615B93'
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontFamily="Montserrat"
                  fontWeight="600"
                  color="#FFF"
                  textAlign="center"
                  marginTop="50px"
                >
                  Vocational Program
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid
            item
            md={3}
            sm={12}
            xs={12}
            sx={{ marginY:'3%'}}
            display="flex"
            justifyContent="center"
          >
            <StyledCard
              sx={{
                borderRadius: "15px",
                width: "200px",
                height: "200px",
              backgroundColor:'#FFF',
                opacity: "1.0",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontFamily="Montserrat"
                  fontWeight="600"
                  color="#615B93"
                  textAlign="center"
                  marginTop="50px"
                >
                  Fresh Graduate Program
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid
            item
            md={3}
            sm={12}
            xs={12}
            sx={{ marginY:'3%'}}
            display="flex"
            justifyContent="center"
          >
            <StyledCard
              sx={{
                borderRadius: "15px",
                width: "200px",
                height: "200px",
                backgroundColor:'#615B93'
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontFamily="Montserrat"
                  fontWeight="600"
                  color="#FFF"
                  textAlign="center"
                  marginTop="50px"
                >
                  IT <br /> Professional Program
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid
            item
            md={3}
            sm={12}
            xs={12}
            sx={{ marginY:'3%'}}
            display="flex"
            justifyContent="center"
          >
            <StyledCard
              sx={{
                borderRadius: "15px",
                width: "200px",
                height: "200px",
                backgroundColor:'#FFF'
              }}
            >
              <CardContent>
                <Typography
                  
                  variant="h6"
                  fontFamily="Montserrat"
                  fontWeight="600"
                  color="#615B93"
                  textAlign="center"
                  marginTop="50px"
                >
                  IT Development Program
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Content;
