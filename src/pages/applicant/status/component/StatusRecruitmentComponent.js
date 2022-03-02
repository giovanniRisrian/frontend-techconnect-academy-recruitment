import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import MyComponent from "../../../homepage/BackgroundImage";
import { Typography, Button, Box, Grid } from "@mui/material";
import { RootContext } from "../../../../App";
import jwt_decode from "jwt-decode";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Footer from "../../../globalComponent/footer/Footer";
import dayjs from "dayjs";

const steps = [
  "Administration",
  "Assesment",
  "Interview",
  "Offering Letter",
  "Welcome to SMM",
];
export default function StatusRecruitmen({ bloc }) {
  let { statusProgram, params, loading, navigate, getStatusbyId } = bloc();

  const data = React.useContext(RootContext);
  let userInfo = jwt_decode(data.userInfo);
  let id = userInfo.id;

  // console.log("cek ini status", statusProgram);

  let active = 0;

  const handleActive = () => {
    if (statusProgram?.ApplyProcess?.SelectionProcessId === 1) {
      active = 0;
    } else if (statusProgram?.ApplyProcess?.SelectionProcessId === 2) {
      active = 1;
    } else if (statusProgram?.ApplyProcess?.SelectionProcessId === 3) {
      active = 2;
    } else if (statusProgram?.ApplyProcess?.SelectionProcessId === 4) {
      active = 3;
    } else if (statusProgram?.ApplyProcess?.SelectionProcessId === 5) {
      active = 4;
    } else if (statusProgram?.ApplyProcess?.SelectionProcessId === 6) {
      active = 5;
    }
    return active;
  };

  React.useEffect(() => {
    getStatusbyId(params.id, id);
  }, []);

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

      <Grid
        container
        marginTop="20px"
        sx={{ width: "100%" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid md={6} sm={4} xs={4} sx={{ paddingLeft: "20px" }}>
          <Typography variant="h4" fontFamily="Montserrat" textAlign="center">
            {statusProgram.ProgramPost?.ProgramName}
          </Typography>
          <br />
          <Typography variant="h6" fontFamily="Montserrat" textAlign="center">
            {statusProgram.ProgramPost?.ProgramTypeName}
          </Typography>
          <Typography variant="h6" fontFamily="Montserrat" textAlign="center">
            {statusProgram.ProgramPost?.ProgramLocation?.Address}
          </Typography>
          <Typography
            variant="body2"
            fontFamily="Montserrat"
            textAlign="center"
          >
            Open Date :
            {dayjs(statusProgram.ProgramPost?.ProgramActivity?.OpenDate).format(
              "DD-MM-YYYY"
            )}
          </Typography>
          <Typography
            variant="body2"
            fontFamily="Montserrat"
            textAlign="center"
          >
            Close Date :
            {dayjs(
              statusProgram.ProgramPost?.ProgramActivity?.CloseDate
            ).format("DD-MM-YYYY")}
          </Typography>
        </Grid>
        <Grid md={6} sm={8} xs={8} display="flex" justifyContent="flex-start">
          <Stepper activeStep={handleActive()} orientation="vertical">
            {steps.map((label) => (
              <Step key={label} sx={{ fontSize: "16px" }}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="30px"
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/applicant/status")}
        >
          Back
        </Button>
      </Box>
      <Footer />
    </MyComponent>
  );
}
