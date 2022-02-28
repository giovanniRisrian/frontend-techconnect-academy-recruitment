import { useEffect } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MyComponent from "../../../homepage/BackgroundImage";
import Box from "@mui/material/Box";
import location from "../../../../asset/icon/location.svg";
import { useContext } from "react";
import { RootContext } from "../../../../App";
import jwt_decode from "jwt-decode";

const VacancyDetail = ({ bloc }) => {
  const { programDetail, navigate, getProgrambyId, doApplyProgram, params } =
    bloc();
  const data = useContext(RootContext);

  let userInfo;
  let id;
  if (data.userInfo) {
    userInfo = jwt_decode(data.userInfo);
    id = userInfo.id;
  }
  let dataApplicant = {
    ProgramId: params.id,
    id_user: id,
  };

  let desc = programDetail.Description;
  console.log(typeof(desc));

  useEffect(() => {
    getProgrambyId();
  }, []);

  return (
    <>
      <MyComponent>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          paddingY="25px"
        >
          {programDetail && (
            <Card
              sx={{
                width: "80%",
                height: "500px",
                borderRadius: "20px",
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontFamily="Montserrat"
                >
                  {programDetail.Headline}
                </Typography>
                <Box display="flex" flexDirection="row">
                  <img
                    src={location}
                    alt="logo-location"
                    width="30px"
                    height="30px"
                  />
                  <Typography
                    fontFamily="Montserrat"
                    color="text.secondary"
                    marginLeft="10px"
                    marginTop="5px"
                  >
                    {programDetail.ProgramLocation?.Address}
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
              >
                <Button
                  variant="outlined"
                  sx={{
                    color: "#521582",
                    borderColor: "#521582",
                    marginRight: "15px",
                  }}
                  onClick={() => navigate("/vacancy")}
                >
                  Back
                </Button>
                {data.userInfo ? (
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#521582", marginRight: "15px" }}
                    onClick={() => doApplyProgram(dataApplicant, data)}
                  >
                    Apply
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#521582", marginRight: "15px" }}
                    onClick={() => navigate("/login")}
                  >
                    Apply
                  </Button>
                )}
              </Box>
            </Card>
          )}
        </Box>
      </MyComponent>
    </>
  );
};

export default VacancyDetail;
