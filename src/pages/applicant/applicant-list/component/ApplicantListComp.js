import * as React from "react";
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
      minWidth: 250,
      valueGetter: (params) => {
        return params.row?.Applicant?.Personal?.Name;
      },
    },
    {
      field: "birthdate",
      headerName: "Age",
      minWidth: 110,
      type: "number",
      valueGetter: (params) => {
        return getAge(params.row?.Applicant?.Personal?.BirthDate);
      },
    },
    {
      field: "institution",
      headerName: "College",
      minWidth: 250,
      // renderCell: RenderCellExpand,
      valueGetter: (params) => {
        return params.row?.Applicant?.Education[0].Institution;
      },
    },
    {
      field: "gpa",
      headerName: "GPA",
      minWidth: 110,
      type: "number",
      valueGetter: (params) => {
        return Number(params.row?.Applicant?.Education[0].GPA);
      },
    },
    {
      field: "totalworkingexperience",
      headerName: "Working Experience",
      minWidth: 180,
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
    {
      field: "rejectReason",
      headerName: "Rejected Reason",
      minWidth: 200,
      valueGetter: (params) => {
        return params.row?.ProgramApplicant?.Message;
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
        <Grid container sx={{ mt: 5 }} marginBottom={isProgram ? "" : 5}>
          <Grid item md={4} sm={3} xs={3} />
          <Grid item md={4} sm={6} xs={6}>
            <FormControl fullWidth>
              <InputLabel id="programlist">Program</InputLabel>
              <Select
                labelId="programlist"
                id="programlist"
                value={programId}
                label="Program"
                color="primary"
                onChange={(e, value) => {
                  handleProgram(e.target.value, value, data);
                }}
              >
                {programList.map((value) => {
                  if (value.ProgramTypeName !== "Certification") {
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
            marginBottom={isAccepted !== "unqualified" ? "" : 5}
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
              <Grid item md={6} sm={12} xs={12}>
                <Box
                  sx={{ width: "100%", mt: 5, mb: 5 }}
                  // display="flex"
                  // flexDirection="row"
                  // alignItems="center"
                  // justifyContent="center"
                >
                  <Stepper nonLinear activeStep={actualStep} alternativeLabel>
                    {steps.map((label, index) => (
                      <Step
                        key={label}
                        // sx={{
                        //   "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                        //     {
                        //       color: "grey.500", // Just text label (COMPLETED)
                        //     },
                        //   "& .MuiStepLabel-root .Mui-active": {
                        //     color: "secondary.main", // circle color (ACTIVE)
                        //   },
                        //   "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                        //     {
                        //       fontWeight: "500",
                        //       color: "black", // Just text label (ACTIVE)
                        //     },
                        //   "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text":
                        //     {
                        //       fill: "white", // circle's number (ACTIVE)
                        //     },
                        // }}
                      >
                        <StepButton onClick={() => handleStep(index, data)}>
                          {label}
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
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
        <Box sx={{ height: 500, width: "90%", marginX: "auto" }}>
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
                componentsProps={{}}
                components={{
                  Toolbar: CustomToolbar,
                  LoadingOverlay: LinearProgress,
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
                initialState={{
                  columns: {
                    columnVisibilityModel: {
                      rejectReason: false,
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* End of Table */}
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
      <Box sx={{ mt: -1 }}>No Applicant</Box>
    </Box>
  );
}

export default ApplicantListComp;
