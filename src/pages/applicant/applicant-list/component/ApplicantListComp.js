import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import notfound from "../../../../asset/image/no-data.png";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SliderValueLabel,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
  InputBase,
  FormGroup,
  FormHelperText,
  StepButton,
  Divider,
  LinearProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import background from "../../../../asset/image/background.jpg";
import Footer from "../../../globalComponent/footer/Footer";
// import Stepper from "react-stepper-horizontal/lib/Stepper";
import { RootContext } from "../../../../App";
// import BasicPagination from "../../../globalComponent/pagination/Pagination";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

const MyComponent = styled("div")({
  backgroundImage: `url(${background})`,
  backgroundSize: "contain",
  minHeight: "100vh",
});

function CustomToolbar(props) {
  return (
    <GridToolbarContainer>
      <GridToolbarDensitySelector />
      <Divider orientation="vertical" />
      <GridToolbarFilterButton />
      <Divider orientation="vertical" />
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  );
}

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
    handleStep,
    isLoading,
    pageSize,
    setPageSize,
  } = bloc();

  const data = React.useContext(RootContext);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      valueGetter: (params) => {
        return params.row?.Applicant?.Personal?.Name;
      },
    },
    {
      field: "birthdate",
      headerName: "Age",
      minWidth: 140,
      valueGetter: (params) => {
        return `${getAge(
          params.row?.Applicant?.Personal?.BirthDate
        )} years old`;
      },
    },
    {
      field: "institution",
      headerName: "College",
      minWidth: 300,
      valueGetter: (params) => {
        return params.row?.Applicant?.Education[0].Institution;
      },
    },
    {
      field: "gpa",
      headerName: "GPA",
      minWidth: 100,
      type: "number",
      valueGetter: (params) => {
        return Number(params.row?.Applicant?.Education[0].GPA);
      },
    },
    {
      field: "totalworkingexperience",
      headerName: "Working Experience",
      minWidth: 200,
      type: "number",
      valueGetter: (params) => {
        return params.row?.Applicant?.Personal?.TotalWorkingExperience;
      },
    },
    {
      field: "appliedtime",
      headerName: "Applied date",
      minWidth: 200,
      type: "dateTime",
      valueGetter: (params) => {
        return (
          params.row?.ProgramApplicant?.CreatedAt &&
          new Date(params.row?.ProgramApplicant?.CreatedAt)
        );
      },
    },
  ];

  React.useEffect(() => {
    getListProgram();
  }, []);

  return (
    <Box>
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
          <Grid item md={5} sm={3} xs={3} />
          <Grid item md={2} sm={6} xs={6}>
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
                  if (value.ProgramTypeName !== "certification") {
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

        {/* Start of Button accepted & rejected */}
        {isProgram ? (
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            marginTop={5}
          >
            <Button
              color="primary"
              variant={isAccepted === "true" ? "contained" : "outlined"}
              onClick={() => handleAccept(data)}
              sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            >
              On Progress Applicant
            </Button>
            <Button
              color="primary"
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
              color="primary"
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

        {/* Start of stepper process selection */}
        {isProgram && isAccepted !== "unqualified" ? (
          <div>
            <Grid container>
              <Grid item md={3} />
              <Grid item md={6}>
                <Box
                  sx={{ width: "100%", mt: 5, mb: 5 }}
                  // display="flex"
                  // flexDirection="row"
                  // alignItems="center"
                  // justifyContent="center"
                >
                  <Stepper nonLinear activeStep={actualStep} alternativeLabel>
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepButton
                          color="primary"
                          onClick={() => handleStep(index, data)}
                        >
                          {label}
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                  {/* <Box
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
                  </Box> */}
                </Box>
              </Grid>
            </Grid>
          </div>
        ) : null}
        {/* End of stepper process selection */}

        {/* Start of Search input */}
        {/* <Grid container sx={{ mt: 3 }}>
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
        </Grid> */}
        {/* End of Search input */}

        {/* Start of Table */}
        <Box sx={{ height: 700, width: "90%", marginX: "auto" }}>
          <Box sx={{ display: "flex", height: "100%" }}>
            <Box sx={{ flexGrow: 1 }}>
              <DataGrid
                loading={isLoading}
                rows={applicantList}
                columns={columns}
                getRowId={(row) => row.Applicant.ID}
                onRowClick={(params) =>
                  handleSeeDetail(params.row.Applicant.ID)
                }
                pagination
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 20]}
                onPageSizeChange={(newPage) => setPageSize(newPage)}
                components={{
                  Toolbar: CustomToolbar,
                  LoadingOverlay: LinearProgress,
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* End of Table */}

        {/* <Grid container>
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
        </Grid> */}
      </Box>
      <Footer />
    </Box>
  );
};

function CustomNoRowsOverlay() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <img
        width="120"
        height="100"
        // viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
        src={notfound}
        alt={""}
      ></img>
      <Box sx={{ mt: 0 }}>No Applicant</Box>
    </Box>
  );
}

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",

//   borderRadius: theme.shape.borderRadius,
//   backgroundColor:
//     // "#cb9bd1",
//     alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor:
//       // "#cb9bd1",
//       alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(1),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "black",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(2, 2, 2, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

export default ApplicantListComp;
