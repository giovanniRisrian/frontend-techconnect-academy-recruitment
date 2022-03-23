// import { useEffect } from "react";
import { Box, Typography, Button, Fab, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import { RootContext } from "../../../../App";
import logo from "../../../../asset/icon/logo.svg";
import * as Yup from "yup";
import GoogleLoginButton from "../../google/googleLogin/GoogleLoginButton";

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
    <div className="formBody">
      <div>
        <div className="card cardForm">
          <div className="box"></div>
          <div className="card-body">
            <div>
              <form onSubmit={formik.handleSubmit}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  textAlign="center"
                >
                  <img src={logo} style={{ width: "75px", height: "75px" }} />
                </Typography>
                <TextField
                  variant="outlined"
                  className="form-control cardForm text-center"
                  type="text"
                  name="email"
                  label="Email"
                  color="secondary"
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
                  variant="outlined"
                  className="form-control cardForm text-center"
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  color="secondary"
                  value={formik.values.password || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className="warning">
                  {formik.errors.password && formik.touched.password ? (
                    <small style={{ color: "red" }}>
                      {formik.errors.password}
                    </small>
                  ) : null}
                </p>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  value="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  LOGIN
                </Button>
                {/* <input
                  className="form-control cardForm btnp"
                  variant="contained"
                  type="submit"
                  value="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  //   onClick={doLogin}
                /> */}
              </form>
              <GoogleLoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
