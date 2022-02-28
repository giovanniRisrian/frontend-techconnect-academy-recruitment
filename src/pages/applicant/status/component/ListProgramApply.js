import MyComponent from "../../../homepage/BackgroundImage";
import {
  CardActions,
  CardContent,
  Card,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { useEffect } from "react";

const ListProgramApply = ({ bloc }) => {
  const { list, getListAppliedProgram, navigate, loading } = bloc();

  useEffect(() => {
    getListAppliedProgram();
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
          padding="10px"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          {list?.ProgramPosts &&
            list.ProgramPosts.map((value, idx) => {
              return (
                <>
                  <Grid
                    item
                    md={6}
                    key={idx}
                    justifyContent="center"
                    display="flex"
                  >
                    <Card sx={{ minWidth: "500px" }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 24 }}
                          color="#343434"
                          gutterBottom
                        >
                          {value.Headline}
                        </Typography>
                        {value.IsActive === true ? (
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Active
                            </Typography>
                      
                        ) : (
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            NonActive
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item md={6}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => navigate(`/status/${value.ID}`)}
                    >
                      Details
                    </Button>
                  </Grid>
                </>
              );
            })}
        </Grid>
      </MyComponent>
    </>
  );
};

export default ListProgramApply;
