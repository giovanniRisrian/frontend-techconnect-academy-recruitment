import {
  CardActions,
  CardContent,
  Card,
  Typography,
  Button,
  Grid,
  Box,
  Stack,
  Pagination,
} from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { RootContext } from "../../../../App";
import jwt_decode from "jwt-decode";
import Footer from "../../../globalComponent/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsProgress,
  faCalendar,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import BasicModal from "./ModalStatus";
import header from "../../../../asset/image/headervacancy.png";
import notfound from "../../../../asset/image/no-data.png"

const ListProgramApply = ({ bloc }) => {
  const {
    list,
    getListAppliedProgram,
    statusProgram,
    getStatusbyId,
    loading,
    setPage,
  } = bloc();

  const data = useContext(RootContext);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  let userInfo = jwt_decode(data.userInfo);
  let id = userInfo.id;

  const handleOpen = (idProgram) => {
    getStatusbyId(idProgram, id, data);
    setOpen(true);
  };

  useEffect(() => {
    getListAppliedProgram(1,id, data);
  }, []);

  const handlePage = (page) => {
    getListAppliedProgram(page, id, data)
    setPage(page)
  }

  return (
    <Box sx={{ backgroundColor: "#F2F2F2" }}>
      {list?.ProgramInfo == null ? (
        <Box></Box>
      //     <Box sx={{boxShadow:3, width:'30%', backgroundColor:'#615B93', borderRadius:'15px', marginBottom:'2%', marginTop:'2%', height:'8vh'}}>
      //     <Typography variant="h5" fontFamily="Montserrat" textAlign='center' color='white' sx={{marginLeft:'2%', paddingTop:'2%'}}>
      //       List of Program Applied
      //     </Typography>
      //     <Box
      //    sx={{
      //      display: "flex",
      //      flexDirection: "column",
      //      alignItems: "center",
      //      justifyContent: "center",
      //    }}
      //  >
          
          
      //    <img
      //      width="120"
      //      height="100"
      //      // viewBox="0 0 184 152"
      //      aria-hidden
      //      focusable="false"
      //      src={notfound}
      //      alt={""}
      //    ></img>
      //    <Box sx={{ mt: 0 }}>No Applicant</Box>
      //  </Box>
      //     </Box>
       
      ) : (
      <Box>
        <Box>
        <Box sx={{boxShadow:3, width:'35%', backgroundColor:'#615B93', borderRadius:'15px', marginBottom:'2%', marginTop:'2%', height:'7vh'}}>
          <Typography variant="h5" fontFamily="Montserrat" textAlign='center' color='white' sx={{marginLeft:'2%', paddingTop:'2%'}}>
            List of Program Applied
          </Typography>
          </Box>
          
        <Grid
          container
          spacing={2}
          // padding="20px"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          {list?.ProgramInfo &&
            list.ProgramInfo.map((value, idx) => {
              return (
                <Fragment key={idx}>
                  <Grid
                    item
                    md={4}
                    sm={12}
                    xs={12}
                    // key={idx}
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                  >
                    <Card
                      sx={{
                        width: "85%",
                        backgroundColor: "#FFF",
                        borderRadius: "15px",
                        marginLeft:'3%',
                        boxShadow: 5,
                      }}
                    >
                      <div style={{padding:'3%'}}>
                        <Typography
                          variant="h6"
                          color="#343434"
                          gutterBottom
                          sx={{ marginLeft: "10px" }}
                        >
                          {value.Program?.ProgramName}
                        </Typography>
                        <Box display="flex" marginLeft="10px">
                          <FontAwesomeIcon icon={faTags} />
                          <Typography
                            color="#343434"
                            gutterBottom
                            sx={{ marginLeft: "10px" }}
                          >
                            {value.Program?.ProgramTypeName.toUpperCase()}
                          </Typography>
                        </Box>

                        <Box display="flex" marginLeft="10px">
                          <FontAwesomeIcon icon={faCalendar} />
                          <Typography
                            color="#343434"
                            sx={{ marginLeft: "10px" }}
                          >
                            {dayjs(
                              value.Program?.ProgramActivity?.OpenDate
                            ).format("DD/MM/YYYY")}{" "}
                            -{" "}
                            {dayjs(
                              value.Program?.ProgramActivity?.CloseDate
                            ).format("DD/MM/YYYY")}
                          </Typography>
                        </Box>
                        <Box display="flex" marginLeft="10px">
                          <FontAwesomeIcon
                            icon={faBarsProgress}
                            style={{ marginTop: "5px" }}
                          />
                          <Typography
                            color="#343434"
                            sx={{ marginLeft: "10px", marginTop: "3px" }}
                          >
                            {value.ProgramApplicant?.ProcessStatus}
                          </Typography>
                        </Box>
                        
                        <Button
                          sx={{
                            // marginLeft: "20px",
                            // marginBottom: "10px"
                            color: "white",
                            borderRadius: "15px",
                            backgroundColor:'#615B93'
                          }}
                          variant="contained"
                          color="secondary"
                          onClick={() => handleOpen(value.Program.ID)}
                        >
                          Details
                        </Button>
                        <BasicModal
                          open={open}
                          handleClose={handleClose}
                          handleOpen={handleOpen}
                          status={statusProgram}
                          loading={loading}
                        />
                      </div>
                    </Card>
                  </Grid>
                </Fragment>
              );
            })}
        </Grid>
        </Box>
      </Box>
      )}
    
        {/* <Box
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
        </Box> */}
    </Box>
  );
};

export default ListProgramApply;
