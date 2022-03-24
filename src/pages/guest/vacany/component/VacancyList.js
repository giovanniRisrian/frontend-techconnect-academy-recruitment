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
  Stack,
  Pagination,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MyComponent from "../../../homepage/BackgroundImage";
import { useEffect, useState } from "react";
import Footer from "../../../globalComponent/footer/Footer";
import BasicPagination from "../../../globalComponent/pagination/Pagination";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import nodata from "../../../../asset/image/empty.png";

const VacancyList = ({ bloc }) => {
  const {
    list,
    getListJobInformation,
    navigate,
    loading,
    getSearchByName,
    setSearchValue,
    getProgramTypeName,
    typeProgram,
    types,
    handleType,
    handlePage,
    state,
  } = bloc();

  useEffect(() => {
    getProgramTypeName();
    getListJobInformation(1, "", "");
  }, []);

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
            {state == null ? (
              <>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginY="10px"
                >
                  <FormControl sx={{ width: "25%", marginLeft: "20px" }}>
                    <InputLabel id="typeProgram" color="secondary">
                      Filter
                    </InputLabel>
                    <Select
                      fullWidth
                      variant="standard"
                      color="secondary"
                      id="typeProgram"
                      value={types}
                      label="Program"
                      onChange={(e, value) => {
                        console.log("change", e.target.value);
                        handleType(e.target.value);
                      }}
                    >
                      {typeProgram?.map((value) => {
                        // console.log(value);
                        return (
                          <MenuItem key={value.ID} value={value.ProgramName}>
                            {value.ProgramName}
                          </MenuItem>
                        );
                      })}
                    </Select>
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
              </>
            ) : (
              <div />
            )}

            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justifyContent="center"
              paddingTop="10px"
            >
              {list?.ProgramList?.length === 0 ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img src={nodata} alt="no-data" style={{ width: "50%" }} />
                  <Typography variant="h6" fontWeight="400">
                    No Matching Data Found
                  </Typography>
                </Box>
              ) : (
                list?.ProgramList &&
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
                          boxShadow: 5,
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
                })
              )}
            </Grid>
          </>
        )}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Stack spacing={2}>
            <Pagination
              count={list.LastPage}
              color="secondary"
              size="large"
              // page={pages}
              onChange={(e, value) => {
                handlePage(value);
              }}
              sx={{ mt: 1, marginX: "auto", marginBottom: 10 }}
            />
          </Stack>
        </Box>
        <Footer />
      </MyComponent>
    </>
  );
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginLeft: 0,
  marginRight: "15px",
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
