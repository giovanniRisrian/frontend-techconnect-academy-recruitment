// import { useEffect } from "react";

import { useFormik } from "formik";
import { useContext } from "react";
import { RootContext } from "../../../../App";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Box, Card } from "@mui/material";
import logo from "../../../../asset/icon/logo.svg";
import MyComponent from "../../../homepage/BackgroundImage";

const RegisterRecruiterComponent = ({ bloc }) => {
  const data = useContext(RootContext);
  const navigate = useNavigate();
  const { doRegisterRecruiter } = bloc();
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
      console.log("Submited");
      handleRegisterFront();
    },
  });

  const handleRegisterFront = () => {
    doRegisterRecruiter(formik, data);
  };

  return (
    <MyComponent
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    >
      <div className="formBody">
        <div>
          <div className="card cardForm">
            <div className="box"></div>
            <div className="card-body">
              <div>
                <Card
                  style={{
                    backgroundColor: "transparent",
                    padding: "4vh",
                    boxShadow: "0 13px 13px -4px lightblue",
                  }}
                  variant="outlined"
                >
                  <form onSubmit={formik.handleSubmit}>
                    <Typography textAlign="center">
                      <img
                        src={logo}
                        style={{ width: "75px", height: "75px" }}
                      />
                    </Typography>
                    <TextField
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
                  </form>
                  <Box display="flex" justifyContent="center" alignItems="center">
                  <Button
                      type="button"
                      variant="outlined"
                      value="submit"
                      color="secondary"
                      textAlign="center"
                      onClick={() => navigate("..")}
                      sx={{marginRight:"10px"}}
                    >
                      BACK
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      value="submit"
                      color="secondary"
                      textAlign="center"
                      disabled={!(formik.isValid && formik.dirty)}
                    >
                      SIGN UP
                    </Button>
                    
                  </Box>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MyComponent>
  );
};

export default RegisterRecruiterComponent;
