import { LoadingButton } from "@mui/lab";
import { Grid, Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import header from "../../../../asset/image/headervacancy.png";
import nodata from "../../../../asset/image/norecomen.png";

const ReccomendationComponent = ({ bloc }) => {
  const { doReccomendation, isLoading } = bloc();
  useEffect(() => {
    doReccomendation();
  });
  return (
    <Box sx={{ backgroundColor: "F2F2F2" }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundImage: `url(${header})`,
          height: "89vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Grid item md={12} textAlign="center">
          {!isLoading ? (
            <LoadingButton loading={true} loadingPosition="center">
              Loading ...
            </LoadingButton>
          ) : (
            <Box display="flex" flexDirection='column' paddingY='10%'>

              <img src={nodata} alt="no-data" style={{ width: "auto" }} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
export default ReccomendationComponent;
