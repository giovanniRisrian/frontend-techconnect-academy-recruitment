import React from "react";
import Footer from "../globalComponent/footer/Footer";
import MyComponent from "../homepage/BackgroundImage";
// import Footer from "../globalComponent/footer/Footer";
// import ResponsiveAppBar from "../globalComponent/navbar/Appbar";
// import MyComponent from "../homepage/HomeStyle";
import AboutContent from "./AboutContent";
import {Box} from '@mui/material'

const About = () => {
  return (
    <Box  sx={{backgroundColor:'#F2F2F2'}}> 
      <AboutContent />
      <Footer/>
    </Box>
    
  );
};

export default About;
