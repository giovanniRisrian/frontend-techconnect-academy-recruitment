import { Box, Button, Grid, Typography } from "@mui/material";
import background from "../../../../asset/image/background.jpg";
import posting from "../../../../asset/image/posting.png";
import applicant from "../../../../asset/image/applicant.png";
import Footer from "../../../globalComponent/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderPlus, faCircleInfo
} from "@fortawesome/free-solid-svg-icons";

const RecruiterHomeComp = ({ bloc }) => {
  const { handleSeeApplicantList, handleJobPosting } = bloc();
  return (
    <div>
      <Box
      sx={{backgroundColor:'#F2F2F2'}}
        // sx={{
        //   backgroundImage: `url(${background})`,
        //   backgroundSize: "contain",
        //   minHeight: "100vh",
        // }}
      >
        {/* Start of Header */}
        <Grid container sx={{ paddingTop: 5 }}>
          <Grid item md={3} />
          <Grid item md={6} sm={12} xs={12}>
            <Typography
              component="div"
              textAlign="center"
              gutterBottom
              sx={{
                typography: { lg: "h3", sm: "h4", xs: "h4" },
                fontWeight: {
                  lg: 500,
                  md: 500,
                  sm: 500,
                  xs: 500,
                },
                fontFamily: {
                  lg: "Montserrat Alternates",
                  md: "Montserrat Alternates",
                  sm: "Montserrat Alternates",
                  xs: "Montserrat Alternates",
                },
              }}
            >
              <Box sx={{ letterSpacing: 6 }}>Techconnect Academy</Box>
            </Typography>
            <Grid item md={3} />
          </Grid>
        </Grid>
        {/* End of header */}

        {/* Start of filter */}
        <Grid container>
          <Grid item md={1} />
          <Grid item md={5} sm={12} xs={12}>
            <img src={applicant} style={{ width: "100%" }} alt="" />
            <Box textAlign="center">
              <Button
                variant="contained"
                type="submit"
                onClick={handleSeeApplicantList}
              >
                 <FontAwesomeIcon icon={faFolderPlus} style={{marginRight:'10px', marginBottom:'5px'}} />
                See Applicant List
              </Button>
            </Box>
          </Grid>
          <Grid item md={5} sm={12} xs={12}>
            <img src={posting} style={{ width: "100%" }} alt="" />
            <Box textAlign="center" sx={{ mb: 12 }}>
              <Button
                variant="contained"
                type="submit"
                onClick={handleJobPosting}
              >
                <FontAwesomeIcon icon={faCircleInfo}  style={{marginRight:'10px', marginBottom:'5px'}} />
                Program Posting
              </Button>
            </Box>
          </Grid>
          <Grid item md={1} />
        </Grid>
        {/* End of filter */}
        <Footer />
      </Box>
    </div>
  );
};
export default RecruiterHomeComp;
