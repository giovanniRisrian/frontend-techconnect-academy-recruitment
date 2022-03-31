import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { RootContext } from "../../../../App";
import * as Yup from "yup";
import { Typography, TextField, Button, Box, Grid } from "@mui/material";
import logo from "../../../../asset/icon/logo.svg";
import Footer from "../../../globalComponent/footer/Footer";
import Swal from "sweetalert2";

const UpdateRecruiterComponent = ({ bloc }) => {
  const dataToken = useContext(RootContext);
  const { recruiterById, updateRecruiterById, data, navigateTo } = bloc();
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("This field is required")
        .email("Invalid email format"),
      fullname: Yup.string()
        .required("This field is required")
        .min(5, "minimum 6 characters"),
    }),
    onSubmit: () => {
      handleRegisterFront();
      Swal.fire({
        title: "Success!",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigateTo("/administrator/list/recruiter");
        }
      });
    },
  });

  const getDataById = async () => {
    const res = await recruiterById(dataToken);
    formik.values.fullname = res.fullname;
    formik.values.email = res.email;
    formik.setFieldValue();
  };

  const handleRegisterFront = () => {
    // console.log("foooormik",formik.values);
    updateRecruiterById(formik, dataToken);
  };

  useEffect(() => {
    getDataById();
  }, []);

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#F2F2F2",
        height: "89vh",
      }}
      justifyContent="center"
    >
      <Grid
        item
        md={6}
        sm={12}
        xs={12}
        justifyContent="center"
        sx={{ marginLeft: "3%", marginTop: "2%" }}
      >
        <Box
          sx={{
            boxShadow: 3,
            backgroundColor: "#171059",
            borderRadius: "15px",
            height: "10vh",
            width: "70%",
            marginLeft: "15%",
            paddingTop: "2%",
          }}
        >
          <Typography textAlign="center" variant="h4" color="white">
            Edit Recruiter Account
          </Typography>
        </Box>

        <Box
          sx={{
            marginX: "20%",
            boxShadow: 3,
            paddingX: "20px",
            marginTop: "2%",
            paddingBottom: "5%",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Typography textAlign="center">
              <img
                src={logo}
                style={{ width: "120px", height: "200px" }}
                alt="logo-tca"
              />
            </Typography>

            <TextField
              variant="outlined"
              color="primary"
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
              color="primary"
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

            <Box display="flex" justifyContent="center">
              <Button
                // type="submit"
                variant="outlined"
                sx={{ marginRight: "5%" }}
                color="primary"
                textAlign="center"
                onClick={() => {
                  navigateTo("/administrator/list/recruiter");
                }}
                // disabled={!(formik.isValid && formik.dirty)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                value="submit"
                color="primary"
                textAlign="center"
                disabled={!(formik.isValid && formik.dirty)}
                marginLeft="20px"
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

export default UpdateRecruiterComponent;
