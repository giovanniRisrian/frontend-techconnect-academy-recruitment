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
  Toolbar,
  Typography,
  InputBase,
  FormGroup,
  Stack,
  FormHelperText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import background from "../../../../asset/image/background.jpg";
import Footer from "../../../globalComponent/footer/Footer";
import Stepper from "react-stepper-horizontal/lib/Stepper";
import { RootContext } from "../../../../App";

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
    page,
    programId,
    isProgram,
    handleStepUp,
    handleStepDown,
    steps,
    getAge,
    handlePage,
    handleSeeDetail,
    handleProgram,
    getListProgram,
    actualStep,
    handleAccept,
    handleUnqualified,
    handleReject,
    isAccepted,
    handleSubmitSearch,
    setInputSearchValue,
    lastPage,
    searchBy,
    setSearchBy,
    error,
    setError,
  } = bloc();

  const data = React.useContext(RootContext);

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
                  handleProgram(e.target.value, value, data);
                }}
              >
                {programList.map((value) => {
                  if (
                    value.ProgramTypeName !== "certification" &&
                    value.IsActive
                  ) {
                    return (
                      <MenuItem key={value.ID} value={value.ID}>
                        {value.ProgramName}
                      </MenuItem>
                    );
                  } else {
                    return "";
                  }
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* End of Dropdown */}
        {/* Start of stepper process selection */}
        {isProgram ? (
          <div>
            <Grid container>
              <Grid item md={2} sm={1} xs={1} />
              <Grid item md={8} sm={10} xs={10}>
                <Box sx={{ width: "100%", mt: 5, mb: 5 }}>
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
                    {actualStep === 0 ? (
                      <div></div>
                    ) : (
                      <div>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => {
                            handleStepDown(data);
                          }}
                        >
                          Previous
                        </Button>
                      </div>
                    )}
                    <div></div>
                    {actualStep === 5 ? (
                      <div></div>
                    ) : (
                      <div>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            handleStepUp(data);
                          }}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </div>
        ) : null}
        {/* End of stepper process selection */}

        {/* Start of Button accepted & rejected */}
        {isProgram ? (
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              color="secondary"
              variant={isAccepted === "true" ? "contained" : "outlined"}
              onClick={() => handleAccept(data)}
              sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            >
              On Progress Applicant
            </Button>
            <Button
              color="secondary"
              variant={isAccepted === "unqualified" ? "contained" : "outlined"}
              onClick={() => handleUnqualified(data)}
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              Unqualified Applicant
            </Button>
            <Button
              color="secondary"
              variant={isAccepted === "false" ? "contained" : "outlined"}
              onClick={() => handleReject(data)}
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Rejected Applicant
            </Button>
          </Box>
        ) : (
          <></>
        )}
        {/* End of Button accepted & rejected */}

        {/* Start of Search input */}
        <Grid container sx={{ mt: 3 }}>
          <Grid item md={7} sm={8} xs={8} />
          <Grid
            item
            md={4}
            sm={3}
            xs={3}
            display="flex"
            justifyContent="flex-end"
          >
            <FormControl fullWidth>
              <InputLabel id="search">Search</InputLabel>
              <Select
                labelId="search"
                id="search"
                value={searchBy}
                label="search"
                onChange={(e) => {
                  setSearchBy(e.target.value);
                  setError("");
                }}
              >
                <MenuItem key="name" value="Name">
                  Name
                </MenuItem>
                <MenuItem key="age" value="Age">
                  Age
                </MenuItem>
                <MenuItem key="institution" value="College">
                  College
                </MenuItem>
                <MenuItem key="gpa" value="GPA">
                  GPA
                </MenuItem>
                <MenuItem key="work" value="Work Experience">
                  Work Experience
                </MenuItem>
              </Select>
              {error === "error" ? (
                <FormHelperText sx={{ color: "red" }}>
                  This is required!
                </FormHelperText>
              ) : null}
            </FormControl>
            <Toolbar>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder={`Search by ${searchBy}`}
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => setInputSearchValue(e.target.value, data)}
                  onKeyDown={(e) => handleSubmitSearch(e, data, page)}
                />
              </Search>
            </Toolbar>
          </Grid>
        </Grid>
        {/* End of Search input */}

        {/* Start of Table */}
        <Grid container>
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
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <Box minHeight="5vh" alignItems="center" display="flex">
                          <Typography textAlign="start">
                            No Data exists
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
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
            <Stack spacing={2}>
              <Pagination
                count={lastPage}
                color="secondary"
                size="large"
                page={page}
                onChange={(e, value) => handlePage(value, data)}
                sx={{ mt: 1, marginX: "auto", marginBottom: 10 }}
              />
            </Stack>
          </Grid>
        </Grid>
        {/* End of Table */}
      </Box>
      <Footer />
    </MyComponent>
  );
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",

  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    // "#cb9bd1",
    alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor:
      // "#cb9bd1",
      alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(2, 2, 2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default ApplicantListComp;
