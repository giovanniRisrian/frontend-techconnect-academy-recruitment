
import * as React from 'react';
import Footer from '../globalComponent/footer/Footer';
// import ResponsiveAppBar from '../globalComponent/navbar/Appbar';
import Content from './Content';
import MyComponent from './BackgroundImage';
import { Navbar } from '../globalComponent/navbar/Navbar';




const Homepage = () =>{
    return(
       <MyComponent>
         <Content />
         <Footer />
       </MyComponent>
    )
}

export default Homepage;