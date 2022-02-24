import {
    CardActions,
    CardContent,
    Card,
    Typography,
    Button,
    Grid,
  } from "@mui/material";
  import MyComponent from "../../../homepage/BackgroundImage";
  import { useEffect } from "react";
import Footer from "../../../globalComponent/footer/Footer";
  
  const VacancyList = ({ bloc }) => {
    const { list, getListJobInformation, navigate } = bloc();
    useEffect(() => {
      getListJobInformation();
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
          <Grid
            container
           
          >
            {list.map((value, idx) => {
              return (
                <Grid key={idx} item md={6} sm={12} xs={12} sx={{ marginBottom: "15px" }}>
                  <Card
                    sx={{
                      backgroundImage: `url(${value.photo_url})`,
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
                        {value.headline}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        sx={{
                          backgroundColor: "#521582",
                          color: "#FFF",
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          marginLeft: "20px",
                          "&:hover": {
                            backgroundColor: "#FFF",
                            color: "#521582"
                          }
                   
                        }}
                        onClick={() => navigate(`/vacancy/${value.id}`)}
                      >
                        See Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Footer />
        </MyComponent>
      </>
    );
  };
  export default VacancyList;
  