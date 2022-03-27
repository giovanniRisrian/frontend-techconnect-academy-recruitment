import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import vision from "../../asset/image/vision.png";
import mission from "../../asset/image/mission.png";
import value1 from "../../asset/image/value1.png";
import value2 from "../../asset/image/value2.png";
import value3 from "../../asset/image/value3.png";
import value4 from "../../asset/image/value4.png";
import value5 from "../../asset/image/value5.png";
import value6 from "../../asset/image/value6.png";
import value7 from "../../asset/image/value7.png";
import value8 from "../../asset/image/value8.png";
import { styled } from "@mui/material/styles";
import home from "../../asset/image/home.jpg";

const StyledCard = styled(Card)`
  ${({ theme }) => `
  cursor: pointer;
  background-color: ${"white"};
  transition: ${theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    background-color: ${"#8645FF"};
    transform: scale(1.05);
  }
  `}
`;

const AboutContent = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${home})`,
          backgroundSize: "cover",
          height: "500px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Typography
          textAlign="left"
          sx={{
            paddingY: "30%",
            marginLeft: "5%",
            color: "white",
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
          Get To Know Us Better
        </Typography>
      </Box>

      <Box sx={{padding:'5%'}}>
        <Typography
          variant="h5"
          fontFamily="Montserrat"
          fontWeight="500"
          color="#434343"
          textAlign="justify"
          sx={{marginBottom:'3%'}}
          // marginY={-3}
        >
          Techconnect Academy is a place of diverse community that encourages
          students to think globally and become future-driven citizens that
          crave for a better future, for themselves, society, community through
          digital and technology education.
        </Typography>
        <Typography
          variant="h5"
          fontFamily="Montserrat"
          fontWeight="500"
          color="#434343"
          textAlign="justify"
          sx={{marginBottom:'3%'}}
        >
          Our vision is be on-top of a global
          edu-tech ecosystem to support a varied vibrant business in a large
          wide-scale. We aim to be the center of progressiveness, innovation,
          diversity and empowerment. Moreover, we visualise compelling promises
          in how the digital-technology educational institution should be
          perceived from global landscape. 
        </Typography>
        <Typography
          variant="h5"
          fontFamily="Montserrat"
          fontWeight="500"
          color="#434343"
          textAlign="justify"
          // marginY={-3}
        >
          We're also the first Indonesian
          technology-focused educational institution that holds a mission to
          link and match between industry and education, as well as making
          education changes to embrace the future's needs.
        </Typography>

      </Box>

      {/* Start Of Our Values */}

      <Typography
        letterSpacing="5px"
        color="#1A1A1A"
        textAlign="center"
        sx={{
          typography: { lg: "h4", sm: "h5", xs: "h5" },
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
        Our Value
      </Typography>

      {/* Start Cards Section Top */}
      <Grid container marginTop="20px">
        <Grid
          item
          md={3}
          sm={12}
          xs={12}
          sx={{ marginBottom: "20px" }}
          display="flex"
          justifyContent="center"
        >
          <StyledCard
            sx={{
              borderRadius: "15px",
              width: "200px",
              height: "225px",
              backgroundColor: "#FFF",
            }}
            raised={true}
          >
            <CardMedia
              component="img"
              sx={{
                width: "59px",
                height: "67px",
                marginX: "auto",
                marginY: 4,
              }}
              image={value1}
              alt=""
            />

            <CardContent>
              <Typography
                variant="h5"
                fontFamily="Montserrat"
                fontWeight="500"
                color="#000000"
                textAlign="center"
                // marginY={-3}
              >
                To Inspire Innovations
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid
          item
          md={3}
          sm={12}
          xs={12}
          sx={{ marginBottom: "10px" }}
          display="flex"
          justifyContent="center"
        >
          <StyledCard
            sx={{
              borderRadius: "15px",
              width: "200px",
              height: "225px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "68px",
                height: "68px",
                marginX: "auto",
                marginY: 4,
              }}
              image={value2}
              alt=""
            />
            <CardContent>
              <Typography
                variant="h5"
                fontFamily="Montserrat"
                fontWeight="500"
                color="#000000"
                textAlign="center"
                // marginY={-3}
              >
                Future Driven
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid
          item
          md={3}
          sm={12}
          xs={12}
          sx={{ marginBottom: "10px" }}
          display="flex"
          justifyContent="center"
        >
          <StyledCard
            sx={{
              borderRadius: "15px",
              width: "200px",
              height: "225px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "80px",
                height: "72px",
                marginX: "auto",
                marginY: 4,
              }}
              image={value3}
              alt=""
            />
            <CardContent>
              <Typography
                variant="h5"
                fontFamily="Montserrat"
                fontWeight="500"
                color="#000000"
                textAlign="center"
                // marginY={-3}
              >
                Inclusive
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid
          item
          md={3}
          sm={12}
          xs={12}
          sx={{ marginBottom: "10px" }}
          display="flex"
          justifyContent="center"
        >
          <StyledCard
            sx={{
              borderRadius: "15px",
              width: "200px",
              height: "225px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "79px",
                height: "79px",
                marginX: "auto",
                marginY: 4,
              }}
              image={value4}
              alt=""
            />
            <CardContent>
              <Typography
                variant="h5"
                fontFamily="Montserrat"
                fontWeight="500"
                color="#000000"
                textAlign="center"
                // marginY={-4}
              >
                Collaborative
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* End Cards Section Top*/}
      {/* Start Cards Section Bottom */}

      <Grid container paddingX="10px">
        <Grid
          item
          md={3}
          sm={12}
          xs={12}
          sx={{ marginBottom: "10px" }}
          display="flex"
          justifyContent="center"
        >
          <StyledCard
            sx={{
              borderRadius: "15px",
              width: "200px",
              height: "225px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "86px",
                height: "74px",
                marginX: "auto",
                marginY: 4,
              }}
              image={value5}
              alt=""
            />

            <CardContent>
              <Typography
                variant="h5"
                fontFamily="Montserrat"
                fontWeight="500"
                color="#000000"
                textAlign="center"
                marginY={-3}
              >
                Full of Opportunities
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid
          item
          md={3}
          sm={12}
          xs={12}
          sx={{ marginBottom: "10px" }}
          display="flex"
          justifyContent="center"
        >
          <StyledCard
            sx={{
              borderRadius: "15px",
              width: "200px",
              height: "225px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "75px",
                height: "77px",
                marginX: "auto",
                marginY: 4,
              }}
              image={value6}
              alt=""
            />
            <CardContent>
              <Typography
                variant="h6"
                fontFamily="Montserrat"
                fontWeight="500"
                color="#000000"
                textAlign="center"
                marginY={-3}
              >
                Work Closely with Top Leaders
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid
          item
          md={3}
          sm={12}
          xs={12}
          sx={{ marginBottom: "10px" }}
          display="flex"
          justifyContent="center"
        >
          <StyledCard
            sx={{
              borderRadius: "15px",
              width: "200px",
              height: "225px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "78px",
                height: "76px",
                marginX: "auto",
                marginY: 4,
              }}
              image={value7}
              alt=""
            />
            <CardContent>
              <Typography
                variant="h5"
                fontFamily="Montserrat"
                fontWeight="500"
                color="#000000"
                textAlign="center"
                marginY={-3}
              >
                Challenging IT Projects
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid
          item
          md={3}
          sm={12}
          xs={12}
          sx={{ marginBottom: "10px" }}
          display="flex"
          justifyContent="center"
        >
          <StyledCard
            sx={{
              borderRadius: "15px",
              width: "200px",
              height: "225px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "60px",
                height: "94px",
                marginX: "auto",
                marginY: 3,
              }}
              image={value8}
              alt=""
            />
            <CardContent>
              <Typography
                variant="h5"
                fontFamily="Montserrat"
                fontWeight="500"
                color="#000000"
                textAlign="center"
                marginY={-3}
              >
                Creative Growth
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* End Cards Section Bottom */}
    </Box>
  );
};

export default AboutContent;
