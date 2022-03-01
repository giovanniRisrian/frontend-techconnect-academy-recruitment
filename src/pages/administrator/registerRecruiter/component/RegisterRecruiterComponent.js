import { useFormik } from "formik";
import { useContext } from "react";
import { RootContext } from "../../../../App";
import * as Yup from "yup";
import { Typography, TextField, Button } from "@mui/material";
import logo from "../../../../asset/icon/logo.svg";
import { useNavigate } from "react-router-dom";

const RegisterComponent = ({ bloc }) => {
  const data = useContext(RootContext);
  const { doRegisterRecruiter } = bloc();
  const navigate = useNavigate();
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
      console.log("Submited");
      handleRegisterFront();
    },
  });

  const handleRegisterFront = () => {
    doRegisterRecruiter(formik, data);
  };

  return (
    <div className="formBody">
      <div>
        <div className="card cardForm">
          <div className="box"></div>
          <div className="card-body">
            <div>
              <form onSubmit={formik.handleSubmit}>
                <Typography textAlign="center">
                  <img src={logo} style={{ width: "75px", height: "75px" }} />
                </Typography>

                <TextField
                  variant="outlined"
                  color="secondary"
                  className="form-control cardForm text-center"
                  type="text"
                  name="fullname"
                  label="Name"
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

                {/* <label>Full Name </label>
                <input
                  className="form-control cardForm text-center"
                  type="text"
                  name="fullname"
                  placeholder="fullname"
                  value={formik.values.fullname || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className="warning">
                  {formik.errors.fullname && formik.touched.fullname ? (
                    <small className="text-danger">
                      {formik.errors.fullname}
                    </small>
                  ) : null}
                </p>
                <label>Email </label>
                <input
                  className="form-control cardForm text-center"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className="warning">
                  {formik.errors.email && formik.touched.email ? (
                    <small className="text-danger">{formik.errors.email}</small>
                  ) : null}
                </p>
                <label>Password : </label>
                <input
                  className="form-control cardForm text-center"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <p className="warning">
                  {formik.errors.password && formik.touched.password ? (
                    <small className="text-danger">
                      {formik.errors.password}
                    </small>
                  ) : null}
                </p> */}

                <Button
                  // type="submit"
                  variant="contained"
                  // value="submit"
                  color="secondary"
                  textAlign="center"
                  onClick={() => {
                    navigate("..");
                  }}
                  // disabled={!(formik.isValid && formik.dirty)}
                >
                  Cancel
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
