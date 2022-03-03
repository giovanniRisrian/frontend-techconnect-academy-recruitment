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

const AboutContent = () => {
  return (
    <Box>
      {/* Start of Header */}
      <Box
        sx={{
          pt: 8,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container>
          <Box
            sx={{
              marginX: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid item md={5} sm={12} xs={12}>
              <Typography
                component="div"
                textAlign="center"
                gutterBottom
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
                <Box sx={{ letterSpacing: 8 }}>Techconnect academy</Box>
              </Typography>
              <Typography
                align="center"
                textAlign="center"
                fontFamily="Montserrat Alternates"
                paragraph
              >
                is a place of diserve community that encourages students to
                think globally and citizens that crave for a better future, for
                themselves, society, community through digital and technology
                education
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Box>

      {/* End of Header */}
      {/* Start Of Our Vision */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid container>
          <Grid item md={1} />
          <Grid item md={4} sm={12} xs={12}>
            <Typography
              textAlign="left"
              sx={{
                pt: 16,
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
              OUR VISION
            </Typography>
            <Typography
              align="center"
              textAlign="left"
              fontFamily="Montserrat Alternates"
              paragraph
              sx={{
                pt: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              To be the center of progressiveness, innovation, diversity, and
              empowerment.
              <br />
              Moreover, we visualize compelling promises in how the
              digital-technology educational institution should be perceived
              from global landscape
            </Typography>
          </Grid>
          {/* <Grid item md={1} /> */}
          <Grid item md={6}>
            <img src={vision} style={{ width: "100%" }} alt="" />
          </Grid>
          <Grid item md={1} />
        </Grid>
      </Box>

      {/* End Of Our Vision */}
      {/* Start Of Our Misson */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid container>
          <Grid item md={1} />
          <Grid item md={6} sm={12} xs={12}>
            <img src={mission} style={{ width: "100%" }} alt="" />
          </Grid>

          <Grid item md={4} sm={12} xs={12}>
            <Typography
              textAlign="right"
              sx={{
                pt: 16,
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
              OUR MISSION
            </Typography>
            <Typography
              align="center"
              textAlign="right"
              fontFamily="Montserrat Alternates"
              paragraph
              sx={{
                pt: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              We’re also the first indonesian technology-focused educational
              institution that holds a mission to link and match between
              industry and education, as well as making education changes
              embraces the future needs for everyone
            </Typography>
          </Grid>
          <Grid item md={1} />
        </Grid>
      </Box>

      {/* End Of Our Misson */}
      {/* Start Of Our Values */}

      <Typography
        letterSpacing="5px"
        color="#343434"
        textAlign="center"
        paddingTop="10px"
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
      <Grid container marginTop="70px">
        <Grid
          item
          md={3}
          sm={12}
          xs={12}
          sx={{ marginBottom: "10px" }}
          display="flex"
          justifyContent="center"
        >
          <Card
            sx={{
              borderRadius: "15px",
              width: "225px",
              height: "250px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "59px",
                height: "67px",
                marginX: "auto",
                marginY: 6,
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
                marginY={-3}
              >
                To Inspire Innovations
              </Typography>
            </CardContent>
          </Card>
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
          <Card
            sx={{
              borderRadius: "15px",
              width: "225px",
              height: "250px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "68px",
                height: "68px",
                marginX: "auto",
                marginY: 6,
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
                marginY={-3}
              >
                Future-Driven
              </Typography>
            </CardContent>
          </Card>
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
          <Card
            sx={{
              borderRadius: "15px",
              width: "225px",
              height: "250px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "80px",
                height: "72px",
                marginX: "auto",
                marginY: 6,
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
                marginY={-3}
              >
                Inclusive
              </Typography>
            </CardContent>
          </Card>
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
          <Card
            sx={{
              borderRadius: "15px",
              width: "225px",
              height: "250px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "79px",
                height: "79px",
                marginX: "auto",
                marginY: 6,
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
                marginY={-3}
              >
                Collaborative
              </Typography>
            </CardContent>
          </Card>
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
          <Card
            sx={{
              borderRadius: "15px",
              width: "225px",
              height: "250px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "86px",
                height: "74px",
                marginX: "auto",
                marginY: 6,
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
          </Card>
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
          <Card
            sx={{
              borderRadius: "15px",
              width: "225px",
              height: "250px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "75px",
                height: "77px",
                marginX: "auto",
                marginY: 6,
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
          </Card>
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
          <Card
            sx={{
              borderRadius: "15px",
              width: "225px",
              height: "250px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "78px",
                height: "76px",
                marginX: "auto",
                marginY: 6,
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
          </Card>
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
          <Card
            sx={{
              borderRadius: "15px",
              width: "225px",
              height: "250px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "60px",
                height: "94px",
                marginX: "auto",
                marginY: 6,
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
          </Card>
        </Grid>
      </Grid>

      {/* End Cards Section Bottom */}
    </Box>
  );
};

export default AboutContent;
