import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import MyComponent from "../../../homepage/BackgroundImage";
import { Typography, Button, Box, Grid } from "@mui/material";
import { RootContext } from "../../../../App";
import jwt_decode from "jwt-decode";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Administration',
  'Assesment',
  'Interview',
  'Offering Letter',
  'Welcome to SMM'
];
export default function StatusRecruitmen({ bloc }) {
  let { statusProgram, params, loading, navigate, getStatusbyId } = bloc();

  const data = React.useContext(RootContext);
  let userInfo = jwt_decode(data.userInfo);
  let id = userInfo.id
  
  console.log(statusProgram?.ApplyProcess);

  let active = 0
  
  const handleActive = () =>{
    if(statusProgram?.ApplyProcess === "Applied"){
      active = 0
    }else if(statusProgram?.ApplyProcess === "Administration"){
      active = 1
    }else if(statusProgram?.ApplyProcess === "Assesment"){
      active = 2
    }else if(statusProgram?.ApplyProcess === "Interview"){
      active = 3
    }else if(statusProgram?.ApplyProcess === "Offering"){
      active = 4
    }else if(statusProgram?.ApplyProcess === "Onboarding"){
      active = 5
    }
    return active
  }

  React.useEffect(() => {
    getStatusbyId(params.id,id);
  },[]);

  return (
    <MyComponent>
      <Typography
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
          Status Process Program Applied
        </Typography>

      <Box
      marginTop="20px"
      sx={{ width: '100%' }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      >
    
      <Stepper activeStep={handleActive()} orientation="vertical" >
        {steps.map((label) => (
          <Step key={label} sx={{fontSize:"16px"}}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
   
    </Box>
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="30px"
      >
      <Button variant="contained" color="secondary" onClick={()=> navigate('/applicant/status')}>
        Back
      </Button>

      </Box>
    
    </MyComponent>
  );
}
