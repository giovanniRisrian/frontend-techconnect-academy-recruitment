import { useEffect } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import location from "../../../../asset/icon/location.svg";
import { useContext } from "react";
import { RootContext } from "../../../../App";
import jwt_decode from "jwt-decode";
import swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendar,
  faCirclePlus,
  faLocationDot,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import header from "../../../../asset/image/bg-image.png";
import { LoadingButton } from "@mui/lab";

const VacancyDetail = ({ bloc }) => {
  const {
    programDetail,
    navigate,
    getProgrambyId,
    doApplyProgram,
    params,
    getUserbyId,
    state,
    loading,
  } = bloc();
  const data = useContext(RootContext);
  let idUser;
  let show = true;
  let dataFalse = { userInfo: null };
  let decodeInfo;
  // console.log("context", data);
  if (data?.userInfo) {
    // console.log("data", data.userInfo);
    decodeInfo = jwt_decode(data?.userInfo);
    idUser = decodeInfo;
    if (decodeInfo.Role !== "user") {
      show = false;
    }
  }

  // console.log("recomendation", state);

  let dataApplicant = {
    ProgramId: params.id,
    ApplicantId: idUser?.id,
  };

  const confirmationApply = () => {
    // console.log("apakah masuk sini?");
    swal
      .fire({
        title: "Do you want to apply this program?",
        confirmButtonText: "Apply",
        showCancelButton: true,
        icon: "warning",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (programDetail.ProgramTypeName === "Certification") {
            window.open(programDetail.LinkCertification);
          } else {
            doApplyProgram(dataApplicant, data);
          }
        }
      });
  };

  useEffect(() => {
    if (show === true) {
      getProgrambyId(idUser, data);
    } else {
      getProgrambyId(null, dataFalse);
    }
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url(${header})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // paddingY="25px"
        paddingTop="7%"
      >
        {programDetail && (
          <Card
            sx={{
              width: "70%",
              // height: "auto",
              borderRadius: "20px",
              backgroundColor: "#FFF",
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontFamily="Montserrat"
              >
                {programDetail.ProgramName}
              </Typography>
              <Box display="flex" marginLeft="10px">
                <FontAwesomeIcon icon={faTags} />
                <Typography
                  color="#343434"
                  gutterBottom
                  sx={{ marginLeft: "10px" }}
                >
                  {programDetail?.ProgramTypeName?.toUpperCase()}
                </Typography>
              </Box>
              <Box display="flex" marginLeft="10px">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ marginTop: "6px" }}
                />
                <Typography fontFamily="Montserrat" marginLeft="10px">
                  {programDetail.ProgramLocation?.Address}
                </Typography>
              </Box>

              <Box display="flex" marginLeft="10px">
                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{ marginTop: "4px" }}
                />
                <Typography color="#343434" sx={{ marginLeft: "10px" }}>
                  {dayjs(programDetail.ProgramActivity?.OpenDate).format(
                    "DD/MM/YYYY"
                  )}
                  {"-"}

                  {dayjs(programDetail.ProgramActivity?.CloseDate).format(
                    "DD/MM/YYYY"
                  )}
                </Typography>
              </Box>

              <div>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontFamily="Montserrat"
                  marginTop="20px"
                >
                  Description :
                </Typography>
                <ul>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    fontFamily="Montserrat"
                    sx={{
                      whiteSpace: "pre-line",
                    }}
                  >
                    {programDetail.Description}
                  </Typography>
                </ul>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontFamily="Montserrat"
                >
                  Requirement :
                </Typography>
                <ul>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    fontFamily="Montserrat"
                    sx={{
                      whiteSpace: "pre-line",
                    }}
                  >
                    {programDetail.Requirement}
                  </Typography>
                </ul>
              </div>
            </CardContent>

            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              marginBottom="20px"
            >
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  marginRight: "15px",
                  color: "#8645FF",
                  backgroudColor: "#FFF",
                  fontWeight: "500",
                  borderRadius: "20px",
                  boxShadow: 3,
                }}
                onClick={() =>
                  navigate(state ? "/applicant/reccomendation" : "/vacancy")
                }
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  style={{ marginRight: "10px" }}
                />
                Back
              </Button>

              {loading ? (
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ marginRight: "2%" }}
                >
                  <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    variant="outlined"
                    // loadingIndicator=""
                    sx={{ borderRadius: "20px" }}
                  >
                    Loading
                  </LoadingButton>
                </Box>
              ) : (
                <Box>
                  {data.userInfo ? (
                    <Button
                      disabled={programDetail.applied}
                      variant="contained"
                      color="secondary"
                      sx={{
                        marginRight: "15px",
                        color: "#FFF",
                        fontWeight: "500",
                        borderRadius: "20px",
                        boxShadow: 3,

                        backgroudColor: "#8645FF",
                      }}
                      onClick={() => confirmationApply()}
                    >
                      <FontAwesomeIcon
                        icon={faCirclePlus}
                        style={{ marginRight: "10px" }}
                      />
                      {programDetail.applied ? "Applied" : "Apply"}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        marginRight: "15px",
                        color: "#FFF",
                        backgroudColor: "#8645FF",
                        fontWeight: "500",
                        borderRadius: "20px",
                        boxShadow: 3,
                      }}
                      onClick={() => navigate("/login")}
                    >
                      <FontAwesomeIcon
                        icon={faCirclePlus}
                        style={{ marginRight: "10px" }}
                      />
                      Apply
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default VacancyDetail;
