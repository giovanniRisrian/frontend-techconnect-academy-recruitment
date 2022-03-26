// import { useEffect } from "react";
import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import { RootContext } from "../../../../App";
import logo from "../../../../asset/icon/logo.svg";
import * as Yup from "yup";
import GoogleLoginButton from "../../google/googleLogin/GoogleLoginButton";
import login from "../../../../asset/image/loginLeft.png";
import { Card } from "reactstrap";

const LoginComponent = ({ bloc }) => {
  const data = useContext(RootContext);
  const { doLogin } = bloc();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("This field is required")
        .email("Invalid email format"),
      password: Yup.string()
        .required("This field is required")
        .min(5, "minimum 6 characters"),
    }),
    onSubmit: () => {
      // console.log("Submited");
      handleLoginFront();
    },
  });

  const handleLoginFront = () => {
    doLogin(formik, data);
  };

  return (
    <Grid container
      sx={{
       backgroundColor:'#F2F2F2',
       height:'89vh'
      }}
    >
        <Grid item md={6} justifyContent='flex-start'>
          <img src={login} alt='img-form' width='600px' height='599px' />
        </Grid>
        <Grid item md={5} sm={12} xs={12} sx={{marginLeft:'3%'}}>
        <Box sx={{marginX:'20%',boxShadow:3, paddingX:'20px', marginTop:'15%'}}>
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
                type="text"
                name="email"
                label="Email"
                color="secondary"
                value={formik.values.email || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
              />
              <p className="warning">
                {formik.errors.email && formik.touched.email ? (
                  <small style={{ color: "red" }} className="text-danger">
                    {formik.errors.email}
                  </small>
                ) : null}
              </p>
              <TextField
                variant="outlined"
                type="password"
                id="password"
                name="password"
                label="Password"
                color="secondary"
                value={formik.values.password || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
              />
              <p className="warning">
                {formik.errors.password && formik.touched.password ? (
                  <small style={{ color: "red" }}>
                    {formik.errors.password}
                  </small>
                ) : null}
              </p>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  value="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  sx={{ width: "60%", height: "40px" }}
                >
                  LOGIN
                </Button>
              </Box>
            </form>
            <GoogleLoginButton />
          </Box>
        </Grid>
      
      {/* <Box display="flex" justifyContent="flex-start" paddingTop='8%' >
       
        
      </Box> */}
    </Grid>
  );
};

export default LoginComponent;
