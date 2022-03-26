import { useFormik } from "formik";
import { useContext } from "react";
import { RootContext } from "../../../../App";
import * as Yup from "yup";
import { Typography, TextField, Button, Box, Grid } from "@mui/material";
import logo from "../../../../asset/icon/logo.svg";
import login from "../../../../asset/image/loginLeft.png";

const RegisterComponent = ({ bloc }) => {
  const data = useContext(RootContext);
  const { doRegister } = bloc();
  const formik = useFormik({
    initialValues: {
      fullname: "",
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
      fullname: Yup.string()
        .required("This field is required")
        .min(5, "minimum 6 characters"),
    }),
    onSubmit: () => {
      // console.log("Submited");
      handleRegisterFront();
    },
  });

  const handleRegisterFront = () => {
    doRegister(formik, data);
  };

  return (
    <Grid container
      sx={{
        backgroundColor: "#F2F2F2",
        height: "89vh",
      }}
    >
      <Grid item md={6} justifyContent="flex-start">
        <img src={login} alt="img-form" width="600px" height="599px" />
      </Grid>
      <Grid item md={5} sm={12} xs={12} sx={{marginLeft:'3%'}}>
      <Box sx={{ marginX: "20%", boxShadow: 3, paddingX: "20px", marginTop:'15%', paddingBottom:'5%' }}>
        <form onSubmit={formik.handleSubmit}>
          <Typography textAlign="center">
            <img
              src={logo}
              style={{ width: "120px", height: "150px" }}
              alt="logo-register"
            />
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            color="secondary"
            className="form-control cardForm text-center"
            type="text"
            name="fullname"
            label="Full Name"
            value={formik.values.fullname || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className="warning">
            {formik.errors.fullname && formik.touched.fullname ? (
              <small style={{ color: "red" }} className="text-danger">
                {formik.errors.fullname}
              </small>
            ) : null}
          </p>

          <TextField
            fullWidth
            variant="outlined"
            color="secondary"
            className="form-control cardForm text-center"
            type="email"
            name="email"
            label="Email"
            value={formik.values.email || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className="warning">
            {formik.errors.email && formik.touched.email ? (
              <small style={{ color: "red" }} className="text-danger">
                {formik.errors.email}
              </small>
            ) : null}
          </p>

          <TextField
            fullWidth
            variant="outlined"
            color="secondary"
            className="form-control cardForm text-center"
            type="password"
            name="password"
            label="Password"
            value={formik.values.password || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <p className="warning">
            {formik.errors.password && formik.touched.password ? (
              <small style={{ color: "red" }} className="text-danger">
                {formik.errors.password}
              </small>
            ) : null}
          </p>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginBottom="10%"
          >
            <Button
              type="submit"
              variant="contained"
              value="submit"
              color="secondary"
              textAlign="center"
              disabled={!(formik.isValid && formik.dirty)}
              fullWidth
            >
              SIGN UP
            </Button>
          </Box>
        </form>
      </Box>
      </Grid>

    
    </Grid>
  );
};

export default RegisterComponent;
