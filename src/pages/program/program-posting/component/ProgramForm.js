import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Autocomplete from "@mui/material/Autocomplete";
import background from "../../../asset/image/background.jpg";

const ProgramForm = ({ bloc }) => {
  const { skills, handleSubmit, getListSkill } = bloc();

  const formik = useFormik({
    initialValues: {
      title: "",
      headline: "",
      description: "",
      requirement: "",
      skill: "",
      openDate: "2022-02-25",
      closeDate: "2022-02-25",
      address: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("This field is required"),
      headline: Yup.string().required("This field is required"),
      description: Yup.string().required("This field is required"),
      requirement: Yup.string().required("This field is required"),
      openDate: Yup.string().required("This field is required"),
      closeDate: Yup.string().required("This field is required"),
      address: Yup.string().required("This field is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      values.image = image;
      handleSubmit(values);
    },
  });

  useEffect(() => {
    getListSkill();
  }, []);

  const [image, setImage] = useState(null);

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: "contain",
        minHeight: "100vh",
      }}
    >
      <>
        {/* Start of Header */}
        <Grid container sx={{ paddingTop: 5 }}>
          <Grid item md={4} />
          <Grid item md={4} sm={12} xs={12}>
            <Typography
              component="div"
              textAlign="center"
              gutterBottom
              sx={{
                marginBottom: 5,
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
              <Box sx={{ letterSpacing: 6 }}>New Program</Box>
            </Typography>
            <Grid item md={3} />
          </Grid>
        </Grid>

        {/* End of header */}
        {/* Start of upload image */}

        <Box textAlign="center">
          {image && (
            <div>
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(image)}
              />
              <br />
              <Button onClick={() => setImage(null)}>Remove</Button>
            </div>
          )}

          <Button
            variant="contained"
            component="label"
            name="myImage"
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          >
            Upload Photo
            <input type="file" hidden />
          </Button>
        </Box>

        {/* End of Upload Image */}
        {/* Form */}

        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              maxWidth: "100%",
              "& > :not(style)": { m: 1 },
            }}
          >
            <Grid container>
              <Grid item md={3} />
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  sx={{ marginTop: 3 }}
                  color="secondary"
                  id="title"
                  label="Title"
                  variant="outlined"
                  size="small"
                  name="title"
                  value={formik.values.title}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item md={3} />
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  color="secondary"
                  id="headline"
                  label="Headline"
                  variant="outlined"
                  size="small"
                  name="headline"
                  value={formik.values.headline}
                  error={
                    formik.touched.headline && Boolean(formik.errors.headline)
                  }
                  helperText={formik.touched.headline && formik.errors.headline}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item md={3} />
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  color="secondary"
                  id="description"
                  label="Description"
                  variant="outlined"
                  size="small"
                  name="description"
                  value={formik.values.description}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item md={3} />
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  color="secondary"
                  id="requirement"
                  label="Requirement"
                  variant="outlined"
                  size="small"
                  name="requirement"
                  value={formik.values.requirement}
                  error={
                    formik.touched.requirement &&
                    Boolean(formik.errors.requirement)
                  }
                  helperText={
                    formik.touched.requirement && formik.errors.requirement
                  }
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>

            {/* This is auto complete */}
            <Grid container>
              <Grid item md={3} />
              <Grid item md={6} sm={12} xs={12}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  name="skill"
                  options={skills}
                  getOptionLabel={(option) => option.skill}
                  filterSelectedOptions
                  onChange={(e, value) => {
                    formik.setFieldValue("skill", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Skill"
                      placeholder="Enter your skill here"
                    />
                  )}
                />
              </Grid>
            </Grid>

            {/* This is Date input */}
            <Grid container>
              <Grid item md={4} />
              <Grid item md={2} sm={6} xs={6}>
                <TextField
                  color="secondary"
                  id="openDate"
                  label="Open Date"
                  variant="outlined"
                  size="small"
                  name="openDate"
                  type="date"
                  value={formik.values.openDate}
                  error={
                    formik.touched.openDate && Boolean(formik.errors.openDate)
                  }
                  helperText={formik.touched.openDate && formik.errors.openDate}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item md={3} sm={6} xs={6}>
                <TextField
                  color="secondary"
                  id="closeDate"
                  label="Close Date"
                  variant="outlined"
                  size="small"
                  name="closeDate"
                  type="date"
                  value={formik.values.closeDate}
                  error={
                    formik.touched.closeDate && Boolean(formik.errors.closeDate)
                  }
                  helperText={
                    formik.touched.closeDate && formik.errors.closeDate
                  }
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item md={3} />
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  sx={{ marginBottom: 3 }}
                  color="secondary"
                  id="address"
                  label="Address"
                  variant="outlined"
                  size="small"
                  name="address"
                  value={formik.values.address}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
            <Box textAlign="center">
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </>
    </Box>
  );
};

export default ProgramForm;
