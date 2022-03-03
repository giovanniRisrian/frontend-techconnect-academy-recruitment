import {
  CardActions,
  CardContent,
  Card,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MyComponent from "../../../homepage/BackgroundImage";
import { useEffect, useState } from "react";
import Footer from "../../../globalComponent/footer/Footer";
import BasicPagination from "../../../globalComponent/pagination/Pagination";


const VacancyList = ({ bloc }) => {
  const { list, getListJobInformation, navigate, loading } = bloc();
  // // console.log("created",list);
  useEffect(() => {
    getListJobInformation(1);
  }, []);

  const setPagination = (e, value) =>{
    getListJobInformation(value)
  }
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

          <LoadingButton
            loading={loading}
            loadingPosition="center"
          >
            Loading
          </LoadingButton>
          </Box>
        ) : (
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
                      backgroundImage: `url(${value.PathFile})`,
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
                    <CardActions
                  
                    >
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
export default VacancyList;
