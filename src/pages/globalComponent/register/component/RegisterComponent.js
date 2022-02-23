// import { useEffect } from "react";

import { useFormik } from "formik";
import { useContext } from "react";
import { RootContext } from "../../../../App";
import * as Yup from "yup";
const RegisterComponent = ({ bloc }) => {
  const data = useContext(RootContext);
  const { doRegister } = bloc();
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
    doRegister(formik, data);
  };

  return (
    <div className="formBody">
      <div>
        <div className="card cardForm">
          <div className="box">
          </div>
          <div className="card-body">
            <div>
              <form onSubmit={formik.handleSubmit}>
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
                </p>
                <input
                  className="form-control cardForm btnp"
                  type="submit"
                  value="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  //   onClick={doRegister}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
