import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import MyComponent from "../../../homepage/BackgroundImage";
const ReccomendationComponent = ({ bloc }) => {
  const { doReccomendation, isLoading } = bloc();
  useEffect(() => {
    doReccomendation();
  });
  return (
    <MyComponent>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item md={12} textAlign="center">
          {!isLoading ? (
            <LoadingButton loading={true} loadingPosition="center">
              Loading ...
            </LoadingButton>
          ) : (
            <div>No Reccomendation Found</div>
          )}
        </Grid>
      </Grid>
    </MyComponent>
  );
};
export default ReccomendationComponent;
