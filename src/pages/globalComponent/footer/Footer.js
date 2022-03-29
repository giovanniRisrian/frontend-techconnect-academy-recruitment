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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedinIn, faSpotify, faTwitter, faYoutube, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";
import { fa2 } from "@fortawesome/free-solid-svg-icons";

function Copyright() {
  return (
    <Typography variant="body2" color="#FFF" textAlign="center">
      {"Copyright © "}
      Techconnect Academy by Sinarmas Mining
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box sx={{ marginTop:"5%", backgroundColor:'#171059', borderTopLeftRadius:'20px', borderTopRightRadius:'20px' }}>
      <Grid container>
        <Grid item md={2} sm={12} xs={12} textAlign="center" sx={{marginTop:'3%'}}>
          <img
            src={logo}
            alt="tca-logo"
            style={{ height: "120px", width: "140px" }}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12} textAlign="center" sx={{marginTop:'3%'}}>
          <Typography
            component="div"
            textAlign="center"
            fontFamily="Montserrat"
            fontWeight="400"
            marginLeft="20px"
            color='#FFF'
          >
            Jl. Jend Sudirman no.Kav 21 RT 10/ RW 1 Kuningan, Karet,<br/> Kecamatan
            Setiabudi Kota Jakarta Selatan, DKI Jakarta 12920, <br/> Indonesia
            <br />
            (021) 5018 6888
          </Typography>
        </Grid>
        <Grid item md={4} sm={12} xs={12}
         sx={{marginTop:'3%'}}
        >
          <Typography
            component="div"
            textAlign="center"
            fontFamily="Montserrat"
            fontWeight="600"
            color='#FFF'
          >
            CONNECT WITH US
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" marginBottom='3%' marginTop='3%'>
            <FontAwesomeIcon icon={faFacebook} style={{color:'#FFF', marginRight:'5%'}} size="xl" />
            <FontAwesomeIcon icon={faInstagram}style={{color:'#FFF', marginRight:'5%'}} size="xl"/>
            <FontAwesomeIcon icon={faTwitter} style={{color:'#FFF'}} size="xl" />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" marginBottom='3%'>
           
          <FontAwesomeIcon icon={faSpotify} style={{color:'#FFF', marginRight:'5%'}} size="xl" />

          <FontAwesomeIcon icon={faYoutube}style={{color:'#FFF', marginRight:'5%'}} size="xl" />
          
          <FontAwesomeIcon icon={faLinkedinIn} style={{color:'#FFF'}} />
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
