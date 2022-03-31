import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import { RootContext } from "../../../../App";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import login from "../../../../asset/image/loginLeft.jpg";
import logo from "../../../../asset/icon/logo.svg";
import jwt_decode from "jwt-decode";

const ChangeRecruiterPasswordComponent = ({ bloc }) => {
  const { changePassword, navigateTo } = bloc();
  const data = useContext(RootContext);
  const user = jwt_decode(data.userInfo);
  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      reTypePassword: "",
    },
    validationSchema: Yup.object({
      //   oldPassword: Yup.string(),
      new_password: Yup.string()
        .required("Password is required")
        .min(5, "minimum 6 characters"),
      reTypePassword: Yup.string().oneOf(
        [Yup.ref("new_password"), null],
        "Passwords doesn't match"
      ),
    }),
    onSubmit: () => {
      onSubmit();
    },
  });

  console.log("data user", data);
  const onSubmit = () => {
    changePassword(formik, data, user);
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#F2F2F2",
        height: "89vh",
      }}
    >
      <Grid item md={6} justifyContent="flex-start">
        <img src={login} alt="img-form" width="100%" height={"102%"} />
      </Grid>
      <Grid item md={5} sm={12} xs={12} sx={{ marginLeft: "3%" }}>
        <Box
          sx={{
            marginX: "20%",
            boxShadow: 3,
            paddingX: "20px",
            marginTop: "15%",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign="center"
            >
              <img
                src={logo}
                style={{ width: "120px", height: "150px" }}
                alt="logo-tca"
              />
            </Typography>
            <TextField
              variant="outlined"
              type="password"
              name="old_password"
              label="Old Password"
              color="primary"
              value={formik.values.old_password || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
            <p className="warning">
              {formik.errors.old_password && formik.touched.old_password ? (
                <small style={{ color: "red" }} className="text-danger">
                  {formik.errors.old_password}
                </small>
              ) : null}
            </p>
            <TextField
              variant="outlined"
              type="password"
              id="new_password"
              name="new_password"
              label="New Password"
              color="primary"
              value={formik.values.new_password || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
            <p className="warning">
              {formik.errors.new_password && formik.touched.new_password ? (
                <small style={{ color: "red" }}>
                  {formik.errors.new_password}
                </small>
              ) : null}
            </p>
            <TextField
              variant="outlined"
              type="password"
              id="reTypePassword"
              name="reTypePassword"
              label="Confirm New Password"
              color="primary"
              value={formik.values.reTypePassword || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
            <p className="warning">
              {formik.errors.reTypePassword && formik.touched.reTypePassword ? (
                <small style={{ color: "red" }}>
                  {formik.errors.reTypePassword}
                </small>
              ) : null}
            </p>
            <Box display="flex" justifyContent="center" alignItems="center">
              {/* {loading ? (
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <LoadingButton loading={loading} loadingPosition="center">
                    Loading
                  </LoadingButton>
                </Box>
              ) : ( */}
              <Box display='flex' justifyContent='center' alignItems='center' marginBottom='5%'>
                <Button
                  variant="outlined"
                  sx={{ marginRight: "5%" }}
                  color="primary"
                  onClick={() => {
                    navigateTo("..");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  value="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  // sx={{ width: "60%", height: "40px" }}
                >
                  SUBMIT
                </Button>
              </Box>
              {/* )} */}
            </Box>
          </form>
        </Box>
      </Grid>

      {/* <Box display="flex" justifyContent="flex-start" paddingTop='8%' >
       
        
      </Box> */}
    </Grid>
  );
};

export default ChangeRecruiterPasswordComponent;
