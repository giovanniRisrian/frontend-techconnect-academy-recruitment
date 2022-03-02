import MyComponent from "../../../homepage/BackgroundImage";
import {
  CardActions,
  CardContent,
  Card,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { RootContext } from "../../../../App";
import jwt_decode from "jwt-decode";
import Footer from "../../../globalComponent/footer/Footer";

const ListProgramApply = ({ bloc }) => {
  const { list, getListAppliedProgram, navigate, loading } = bloc();

  const data = useContext(RootContext);

  let userInfo = jwt_decode(data.userInfo);
  let id = userInfo.id;
  console.log("ini",list);
  useEffect(() => {
    getListAppliedProgram(id);
  }, []);

  return (
    <>
      <MyComponent>
       
        <Typography
          textAlign="center"
          sx={{
            typography: { lg: "h4", sm: "h5", xs: "h5" },
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
          Program Applied
        </Typography>
        <Grid
          container
          spacing={2}
          padding="20px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="30px"
        >
          {list?.ProgramPosts &&
            list.ProgramPosts.map((value, idx) => {
              return (
                <>
                <Grid
                item 
                md={3}
                />
                  <Grid
                    item
                    md={6}
                    sm={12}
                    xs={12}
                    key={idx}
                    justifyContent="center"
                    display="flex"
                    flexDirection="column"
                  >
                    <Card sx={{ width: "auto" }}>
                      <CardContent>
                        <Typography variant="h6" color="#343434" gutterBottom>
                          {value.Headline}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() =>
                            navigate(`/applicant/status/${value.ID}`)
                          }
                        >
                          Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid
                item 
                md={3}
                />
                </>
              );
            })}
        </Grid>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Footer />
      </MyComponent>
    </>
  );
};

export default ListProgramApply;
