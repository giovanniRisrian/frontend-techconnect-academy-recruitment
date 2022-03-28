import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Typography } from '@mui/material';
import img1 from '../../asset/image/msig.jpeg';
import img2 from '../../asset/image/home.jpg';
import img3 from '../../asset/image/home2.jpg';
import { Box } from '@mui/system';


function Example(props)
{
    var items = [
        {
            name: `Prepare for a career in The Future of Programming`,
            subtitle: "with Techconnect Academy",
            image:`${img1}`
        },
        {
            name: "Prepare for a career in The Future of Programming",
            subtitle: "with Techconnect Academy",
            image:`${img2}`
        },
        {
            name: "Prepare for a career in The Future of Programming",
            subtitle: "with Techconnect Academy",
            image:`${img3}`
        },
        
    ]

    return (
        <Carousel
        >
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper>
            <Box sx={{backgroundImage:`url(${props.item.image})`, height:'70vh', backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
            <Typography
          textAlign="left"
          sx={{
            paddingTop: "20%",
            marginLeft: "3%",
            color: "white",
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
          {props.item.name}
        </Typography>
        <Typography
          textAlign="left"
          sx={{
            marginLeft: "3%",
            color: "white",
            typography: { lg: "h6", sm: "h6", xs: "h6" },
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
          {props.item.subtitle}
        </Typography>
            </Box>
        </Paper>
    )
}

export default Example;