import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Step,
  StepLabel,
  // Stepper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import background from "../../../../asset/image/background.jpg";
import Footer from "../../../globalComponent/footer/Footer";
import Stepper from "react-stepper-horizontal/lib/Stepper";

const MyComponent = styled("div")({
  backgroundImage: `url(${background})`,
  backgroundSize: "contain",
  minHeight: "100vh",
});

const ApplicantListComp = ({ bloc }) => {
  const {
    applicantList,
    programList,
    program,
    // page,
    programId,
    step,
    isProgram,
    handleStepUp,
    handleStepDown,
    steps,
    getAge,
    // handlePage,
    // setStep,
    handleSeeDetail,
    handleProgram,
    getListProgram,
    getListApplicantByPage,
    actualStep,
    setActualStep,
  } = bloc();
  React.useEffect(() => {
    getListProgram();
  }, []);

  return (
    <MyComponent>
      <Box sx={{ mb: 20 }}>
        {/* Start of Header */}
        <Grid container sx={{ paddingTop: 5 }}>
          <Grid item md={3} />
          <Grid item md={6} sm={12} xs={12}>
            <Typography
              component="div"
              textAlign="center"
              gutterBottom
              sx={{
                typography: { lg: "h3", sm: "h4", xs: "h4" },
                fontWeight: {
                  lg: 500,
                  md: 500,
                  sm: 500,
                  xs: 500,
                },
                fontFamily: {
                  lg: "Montserrat Alternates",
                  md: "Montserrat Alternates",
                  sm: "Montserrat Alternates",
                  xs: "Montserrat Alternates",
                },
              }}
            >
              <Box sx={{ letterSpacing: 6 }}>Techconnect Academy</Box>
            </Typography>
            <Grid item md={3} />
          </Grid>
        </Grid>
        {/* End of header */}

        {/* Start of Dropwdown */}
        <Grid container sx={{ mt: 5 }}>
          <Grid item md={5} sm={4} xs={4} />
          <Grid item md={2} sm={4} xs={4}>
            <FormControl fullWidth>
              <InputLabel id="programlist">Program</InputLabel>
              <Select
                labelId="programlist"
                id="programlist"
                value={programId}
                label="Program"
                onChange={(e, value) => {
                  handleProgram(e.target.value, value);
                  // getListApplicantByPage();
                }}
              >
                {programList.map((value) => {
                  return (
                    <MenuItem key={value.ID} value={value.ID}>
                      {value.ProgramName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* End of Dropwdown */}
        {/* Start of stepper process selection */}
        {isProgram ? (
          <div>
            <Grid container>
              <Grid item md={2} sm={1} xs={1} />
              <Grid item md={8} sm={10} xs={10}>
                <Box sx={{ width: "100%", mt: 10 }}>
                  <Stepper
                    steps={steps}
                    activeStep={actualStep}
                    activeColor={"#9c27b0"}
                    completeColor={"#9c27b0"}
                    completeBarColor={"#9c27b0"}
                    size={58}
                    circleFontSize={20}
                    titleFontSize={18}
                    completeOpacity={"0.4"}
                  >
                    {/* {steps.map((label) => (
                      <Step key={label} color="secondary">
                        <StepLabel color="secondary">{label}</StepLabel>
                      </Step>
                    ))} */}
                  </Stepper>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: 5,
                    }}
                  >
                    <div>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          handleStepDown();
                        }}
                      >
                        Previous
                      </Button>
                    </div>
                    <div></div>
                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          handleStepUp();
                        }}
                      >
                        Next
                      </Button>
                    </div>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </div>
        ) : null}
        {/* End of stepper process selection */}

        {/* Start of Table */}
        <Grid container sx={{ mt: 3 }}>
          <Grid item md={1} />
          <Grid item md={10} sm={12} xs={12}>
            <TableContainer sx={{ width: "100%" }}>
              <Table aria-label="">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography sx={{ fontWeight: "medium" }}>
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontWeight: "medium" }}>Age</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontWeight: "medium" }}>
                        College
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontWeight: "medium" }}>GPA</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontWeight: "medium" }}>
                        Working Experience
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontWeight: "medium" }}>
                        Program
                      </Typography>
                    </TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applicantList.length === 0 ? (
                    <></>
                  ) : (
                    applicantList.map((row) => (
                      <TableRow
                        key={row.Applicant.UserAccountID}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ fontWeight: "medium" }}>
                            {row.Applicant.Personal.Name}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography sx={{ fontWeight: "medium" }}>
                            {getAge(row.Applicant.Personal.BirthDate)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography sx={{ fontWeight: "medium" }}>
                            {row.Applicant.Education[0].Institution}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography sx={{ fontWeight: "medium" }}>
                            {row.Applicant.Education[0].GPA}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography sx={{ fontWeight: "medium" }}>
                            {row.Applicant.Personal.TotalWorkingExperience}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography sx={{ fontWeight: "medium" }}>
                            {program}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            color="secondary"
                            onClick={() =>
                              handleSeeDetail(row.Applicant.UserAccountID)
                            }
                          >
                            See Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <Stack spacing={2}>
              <Pagination
                count={10}
                color="secondary"
                size="large"
                page={page}
                onChange={(e, value) => {
                  handlePage(value);
                }}
                sx={{ mt: 1, marginX: "auto", marginBottom: 10 }}
              />
            </Stack> */}
          </Grid>
        </Grid>
        {/* End of Table */}
      </Box>
      <Footer />
    </MyComponent>
  );
};

export default ApplicantListComp;
