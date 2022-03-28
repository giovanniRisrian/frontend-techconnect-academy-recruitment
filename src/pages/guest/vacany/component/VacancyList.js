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
import { useEffect, Fragment } from "react";
import Footer from "../../../globalComponent/footer/Footer";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import nodata from "../../../../asset/image/notdata.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faTags } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import header from "../../../../asset/image/headervacancy.png";

const VacancyList = ({ bloc }) => {
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
    getListJobInformation(1, "", "");
  }, []);

  const onClickSearch = (e, text) => {
    setSearchValue(text);
    getSearchByName(e);
  };
  return (
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
                color="primary"
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
                  onKeyDown={(e) => getSearchByName(e)}
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              marginTop: "3%",
            }}
          >
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
                        <div style={{height:'20vh', padding:'20px'}}>
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
                          <Box display="flex" marginLeft="10px" marginTop="5px">
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
                        </div>
                        {/* <CardActions
                          sx={{
                            paddingBottom: "5%",
                            marginLeft: "30%",
                            paddingRight: "5%",
                          }}
                        > */}
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'10vh'}}>
                        <Button
                            color="primary"
                            variant="contained"
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              color: "#FFF",
                              backgroudColor: "#8645FF",
                              borderRadius: "20px",
                            }}
                            onClick={() => navigate(`/vacancy/${value.ID}`)}
                          >
                            See Details
                          </Button>
                        </div>
                        
                        {/* </CardActions> */}
                      </StyledCard>
                    </Grid>
                  </Fragment>
                );
              })
            )}
          </div>
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
            color="primary"
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
    </Box>
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
