import {
  CardActions,
  CardContent,
  Card,
  Typography,
  Button,
  Grid,
  Box,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MyComponent from "../../../homepage/BackgroundImage";
import { useEffect, useState } from "react";
import Footer from "../../../globalComponent/footer/Footer";
import BasicPagination from "../../../globalComponent/pagination/Pagination";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const VacancyList = ({ bloc }) => {
  const {
    list,
    getListJobInformation,
    navigate,
    loading,
    getSearchByName,
    setSearchValue,
  } = bloc();
  console.log("created", list);
  useEffect(() => {
    getListJobInformation(1);
  }, []);

  const setPagination = (e, value) => {
    getListJobInformation(value);
  };

  return (
    <>
      <MyComponent>
        <Typography
          textAlign="center"
          sx={{
            typography: { lg: "h3", sm: "h4", xs: "h4" },
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
          Find your dream career in
          <br />
          Techconnect Academy
        </Typography>
        {loading ? (
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <LoadingButton loading={loading} loadingPosition="center">
              Loading
            </LoadingButton>
          </Box>
        ) : (
          <>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="programlist">Filter</InputLabel>
                {/* <Select
                  labelId="programlist"
                  id="programlist"
                  value={programId}
                  label="Program"
                  onChange={(e, value) => {
                    handleProgram(e.target.value, value, data);
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
                </Select> */}
              </FormControl>
              <Toolbar>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => getSearchByName(e)}
                  />
                </Search>
              </Toolbar>
            </Box>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justifyContent="center"
              paddingTop="10px"
            >
              {list?.ProgramList &&
                list.ProgramList.map((value, idx) => {
                  // console.log("ceek",value);
                  return (
                    <Grid
                      key={idx}
                      item
                      display="flex"
                      justifyContent="center"
                      md={4}
                      sm={12}
                      xs={12}
                      sx={{ marginBottom: "15px" }}
                    >
                      <Card
                        sx={{
                          backgroundColor: "#EEF8F9",
                          height: "300px",
                          width: "250px",
                          borderRadius: "15px",
                          marginX: "10px",
                        }}
                      >
                        <CardContent
                          sx={{
                            marginY: "20px",
                          }}
                        >
                          <Typography
                            variant="h5"
                            component="div"
                            textAlign="center"
                            color="#434343"
                            fontFamily="Montserrat"
                            fontWeight="600"
                          >
                            {value.ProgramName}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            color="secondary"
                            variant="contained"
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              marginLeft: "50px",
                            }}
                            onClick={() => navigate(`/vacancy/${value.ID}`)}
                          >
                            See Details
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </>
        )}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <BasicPagination onChange={setPagination} data={list} />
        </Box>
        <Footer />
      </MyComponent>
    </>
  );
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
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
export default VacancyList;
