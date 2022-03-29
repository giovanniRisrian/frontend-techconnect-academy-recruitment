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
import { useEffect, Fragment, useContext } from "react";
import Footer from "../../../globalComponent/footer/Footer";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import nodata from "../../../../asset/image/notdata.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faTags } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import header from "../../../../asset/image/headervacancy.png";
import { RootContext } from "../../../../App";
import ListProgramApply from "../../../applicant/status/component/ListProgramApply";
import ListProgramApplyBloc from "../../../applicant/status/bloc/ListProgramApplyBloc";
import StatusService from "../../../applicant/status/service/StatusService";

const VacancyList = ({ bloc }) => {
  const data = useContext(RootContext);
  const {
    list,
    getListJobInformation,
    loading,
    getSearchByName,
    setSearchValue,
    getProgramTypeName,
    typeProgram,
    types,
    handleType,
    handlePage,
    state,
    searchValue,
    navigate,
  } = bloc();

  useEffect(() => {
    getProgramTypeName();
      getListJobInformation(1, "", "", data);
   
  }, []);
  

  const onClickSearch = (e, text) => {
    setSearchValue(text);
    getSearchByName(e);
  };
  return (
    <div>
      <Box sx={{ backgroundColor: "#F2F2F2" }}>
        <Box
          sx={{
            backgroundImage: `url(${header})`,
            height: "50vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            textAlign="center"
            sx={{
              // paddingTop:'4%',
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
            Vacancy List
          </Typography>
        </Box>

        {data.userInfo ? (
          <>
            <ListProgramApply
              bloc={() => ListProgramApplyBloc(StatusService)}
            />
          </>
        ) : (
          <div></div>
        )}
       
      
       <Box sx={{boxShadow:3, width:'30%', backgroundColor:'#615B93', borderRadius:'15px', marginBottom:'2%', marginTop:'3%', height:'7vh'}}>
          <Typography variant="h5" fontFamily="Montserrat" textAlign='center' color='white' sx={{marginLeft:'2%', paddingTop:'2%'}}>
            All Vacancy
          </Typography>
          </Box>
        {state == null ? (
          <>
            <Box
              display="flex"
              // justifyContent="space-between"
              // marginY="10px"
              // paddingTop='5%'
            >
              <FormControl
                sx={{ width: "25%", marginLeft: "20px", borderRadius: "20px" }}
              >
                <InputLabel id="typeProgram" color="secondary">
                  Filter
                </InputLabel>
                <Select
                  sx={{ backgroundColor: "#F2F2F2" }}
                  fullWidth
                  variant="standard"
                  color="secondary"
                  id="typeProgram"
                  value={types}
                  label="Program"
                  onChange={(e, value) => {
                    console.log("change", e.target.value);
                    handleType(e.target.value, data);
                  }}
                >
                  {typeProgram?.map((value) => {
                    // console.log(value);
                    return (
                      <MenuItem
                        key={value.ID}
                        value={value.ProgramName}
                        sx={{ backgroundColor: "#FFF", borderRadius: "20px" }}
                      >
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
                    onKeyDown={(e) => getSearchByName(e, data)}
                  />
                </Search>
              </Toolbar>
              {/* <Button onClick={(e) => onClickSearch(searchValue)}>
                  Search
                </Button> */}
            </Box>
          </>
        ) : (
          <div />
        )}

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
            <Grid container>
              {list?.ProgramList?.length === 0 ? (
                <Grid container>
                  <Grid item md={4} />
                  <Grid item md={4}>
                    <img src={nodata} alt="no-data" style={{ width: "auto" }} />
                  </Grid>
                  <Grid item md={4} />
                </Grid>
              ) : (
                list?.ProgramList &&
                list.ProgramList.map((value, idx) => {
                  // console.log("ceek",value);
                  return (
                    <Fragment key={idx}>
                      <Grid
                        item
                        md={4}
                        sm={12}
                        xs={12}
                        // key={idx}
                        justifyContent="left"
                        display="flex"
                        flexDirection="column"
                        marginTop="20px"
                      >
                        <StyledCard
                          sx={{
                            backgroundColor: "#FFF",
                            height: "100%",
                            width: "85%",
                            borderRadius: "15px",
                            // marginX: "10px",
                            boxShadow: 5,
                            marginLeft: "10px",
                          }}
                        >
                          <CardContent>
                            <Typography
                              variant="h5"
                              component="div"
                              textAlign="left"
                              color="#000"
                              fontFamily="Montserrat"
                              fontWeight="600"
                            >
                              {value.ProgramName}
                            </Typography>
                            <Box
                              display="flex"
                              marginLeft="10px"
                              marginTop="5px"
                            >
                              <FontAwesomeIcon
                                icon={faTags}
                                style={{ color: "#7C7474" }}
                              />
                              <Typography
                                color="#7C7474"
                                gutterBottom
                                fontWeight="600"
                                sx={{ marginLeft: "10px" }}
                              >
                                {value.ProgramTypeName.toUpperCase()}
                              </Typography>
                            </Box>
                            <Box display="flex" marginLeft="10px">
                              <FontAwesomeIcon
                                icon={faCalendar}
                                style={{ color: "#7C7474" }}
                              />
                              <Typography
                                color="#7C7474"
                                fontWeight="600"
                                sx={{ marginLeft: "10px" }}
                              >
                                {dayjs(value.ProgramActivity?.OpenDate).format(
                                  "DD/MM/YYYY"
                                )}{" "}
                                -{" "}
                                {dayjs(value.ProgramActivity?.CloseDate).format(
                                  "DD/MM/YYYY"
                                )}
                              </Typography>
                            </Box>
                          </CardContent>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              minHeight: "10vh",
                              marginTop: "5%",
                            }}
                          >
                            <Button
                              color="primary"
                              variant="contained"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                color: "#FFF",
                                backgroudColor: "#8645FF",
                                borderRadius: "15px",
                                marginRight: "2%",
                              }}
                              onClick={() => navigate(`/vacancy/${value.ID}`)}
                            >
                              See Details
                            </Button>

                            {list.ProgramList[idx].applied ? (
                              <Button
                                color="primary"
                                variant="contained"
                                sx={{
                                  fontFamily: "Montserrat",
                                  fontSize: "16px",
                                  color: "#FFF",
                                  backgroudColor: "#8645FF",
                                  borderRadius: "15px",
                                }}
                                disabled={true}
                              >
                                Applied
                              </Button>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </StyledCard>
                      </Grid>
                    </Fragment>
                  );
                })
              )}
            </Grid>
            {/* </Grid> */}
          </>
        )}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          marginTop="5%"
        >
          <Stack spacing={2}>
            <Pagination
              count={list.LastPage}
              color="secondary"
              size="large"
              // page={pages}
              onChange={(e, value) => {
                handlePage(value, data);
              }}
              sx={{ mt: 1, marginX: "auto", marginBottom: 10 }}
            />
          </Stack>
        </Box>
        <Footer />
      </Box>
    </div>
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
      width: "60ch",
      "&:focus": {
        width: "80ch",
      },
    },
  },
}));

const StyledCard = styled(Card)`
  ${({ theme }) => `
  cursor: pointer;
  background-color: ${theme.palette.primary.main};
  transition: ${theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    background-color: ${"#FFF"};
    transform: scale(1.05);
  }
  `}
`;

export default VacancyList;
