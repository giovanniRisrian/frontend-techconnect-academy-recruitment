
import * as React from 'react';
import Footer from '../globalComponent/footer/Footer';
// import ResponsiveAppBar from '../globalComponent/navbar/Appbar';
import Content from './Content';
import MyComponent from './BackgroundImage';
import { Navbar } from '../globalComponent/navbar/Navbar';
import {Box} from '@mui/material'




const Homepage = () =>{
    return(
       <Box sx={{backgroundColor:'#F5F5F9'}}>
         <Content />
         <Footer />
       </Box>
    )
}

export default Homepage;