import { useFormik } from "formik";
import { useContext } from "react";
import { RootContext } from "../../../../App";
import * as Yup from "yup";
import { Typography, TextField, Button, Box, Grid } from "@mui/material";
import logo from "../../../../asset/icon/logo.svg";
import login from "../../../../asset/image/loginLeft.jpg";

const ActivationComponent = ({ bloc }) => {
  const data = useContext(RootContext);
  const { doResend } = bloc();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("This field is required")
        .email("Invalid email format"),
    }),
    onSubmit: () => {
      handleSubmitFront();
    },
  });

  const handleSubmitFront = () => {
    doResend(formik.values.email, data);
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
        <img src={login} alt="img-form" width="100%" height={"101%"} />
      </Grid>
      <Grid item md={5} sm={12} xs={12} sx={{ marginLeft: "3%" }}>
        <Box
          sx={{
            marginX: "20%",
            boxShadow: 3,
            paddingX: "20px",
            marginTop: "15%",
            paddingBottom: "5%",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Typography textAlign="center"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            >
              <img
                src={logo}
                style={{ width: "120px", height: "150px"}}
                alt="logo-register"
              />
              <Typography variant="h8" component="h8" textAlign="center" 
              style={{
                paddingBottom: "15px", 
                fontFamily: 'Montserrat',
                fontWeight: 500,
                }}>
                Resend Activation Link
              </Typography>
            </Typography>
            
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
                SUBMIT
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ActivationComponent;
