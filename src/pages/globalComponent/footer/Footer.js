import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import logo from "../../../asset/icon/logo.svg";
import { Container, Typography } from "@mui/material";
import fb from "../../../asset/image/facebook.png";
import ig from "../../../asset/image/instagram.png";
import linkedin from "../../../asset/image/linkedin.png";
import spotify from "../../../asset/image/spotify.png";
import tw from "../../../asset/image/twitter.png";
import yt from "../../../asset/image/youtube.png";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" textAlign="center">
      {"Copyright © "}
      Techconnect Academy by Sinarmas Mining
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box sx={{ marginTop: "30px" }}>
      <Grid container>
        <Grid item md={2} sm={12} xs={12} textAlign="center">
          <img
            src={logo}
            alt="tca-logo"
            style={{ height: "100px", width: "100px" }}
          />
        </Grid>
        <Grid item md={6} textAlign="center">
          <Typography
            component="div"
            textAlign="left"
            fontFamily="Montserrat"
            fontWeight="400"
            marginLeft="20px"
          >
            Jl. Jend Sudirman no.Kav 21 RT 10/ RW 1 <br/>Kuningan, Karet, Kecamatan
            Setiabudi <br/>Kota Jakarta Selatan, DKI Jakarta 12920, <br/> Indonesia
            <br />
            (021) 5018 6888
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography
            component="div"
            textAlign="center"
            fontFamily="Montserrat"
            fontWeight="600"
          >
            CONNECT WITH US
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              src={fb}
              alt="fb-icon"
              style={{ width: "50px", height: "50px" }}
            />
            <img
              src={ig}
              alt="ig-icon"
              style={{ width: "50px", height: "50px" }}
            />
            <img
              src={tw}
              alt="tw-icon"
              style={{ width: "50px", height: "50px" }}
            />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              src={spotify}
              alt="sp-icon"
              style={{ width: "50px", height: "50px" }}
            />
            <img
              src={linkedin}
              alt="linkeind-icon"
              style={{ width: "50px", height: "50px" }}
            />
            <img
              src={yt}
              alt="yt-icon"
              style={{ width: "50px", height: "50px" }}
            />
          </Box>
        </Grid>
      </Grid>
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
