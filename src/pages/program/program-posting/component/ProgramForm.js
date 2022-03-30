import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import * as Yup from "yup";
import Autocomplete from "@mui/material/Autocomplete";
import background from "../../../../asset/image/background.jpg";
import Footer from "../../../globalComponent/footer/Footer";
import { RootContext } from "../../../../App";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import header from "../../../../asset/image/headervacancy.png";

const ProgramForm = ({ bloc }) => {
  const data = useContext(RootContext);
  const {
    createNewProgram,
    getListSkill,
    image,
    setImage,
    handleCancel,
    getTodayDate,
    getListProgramType,
    programType,
  } = bloc();

  let initialValues = {
    ProgramTypeName: "",
    LinkCertification: "",
    ProgramName: "",
    headline: "",
    description: "",
    requirement: "",
    age: "",
    gpa: "",
    RequirementSkill: "",
    path_file: "",
    openDate: getTodayDate(),
    closeDate: getTodayDate(),
    address: "",
  };

  const validationSchema = Yup.object({
    ProgramTypeName: Yup.string().required("This field is required"),
    LinkCertification: Yup.string().url("This field must be a valid URL"),
    ProgramName: Yup.string().required("This field is required"),
    headline: Yup.string().required("This field is required"),
    description: Yup.string().required("This field is required"),
    requirement: Yup.string().required("This field is required"),
    age: Yup.string().required("This field is required"),
    gpa: Yup.string().required("This field is required"),
    RequirementSkill: Yup.string().required("This field is required"),
    openDate: Yup.string().required("This field is required"),
    closeDate: Yup.string().required("This field is required"),
    address: Yup.string().required("This field is required"),
  });

  const onSubmit = (values) => {
    // values.image = image;
    createNewProgram(values, data);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    // getListRequirementSkill();
    getListProgramType();
  }, []);

  return (
    <Box
      sx={{ backgroundColor: "#f2f2f2" }}
      // sx={{
      //   backgroundImage: `url(${background})`,
      //   backgroundSize: "contain",
      //   minHeight: "100vh",
      // }}
    >
      <>
        {/* Start of Header */}

        <Grid container>
          <Grid item md={4} />
          <Grid item md={4} sm={11} xs={11} justifyContent="center">
            <Typography
              component="div"
              textAlign="center"
              gutterBottom
              sx={{
                paddingY: "3%",
                typography: { lg: "h3", sm: "h4", xs: "h4" },
                fontWeight: {
                  lg: 600,
                  md: 600,
                  sm: 600,
                  xs: 600,
                },
                fontFamily: {
                  lg: "Montserrat Alternates",
                  md: "Montserrat Alternates",
                  sm: "Montserrat Alternates",
                  xs: "Montserrat Alternates",
                },
              }}
            >
              <Box sx={{ letterSpacing: 5 }}>New Program</Box>
            </Typography>
            <Grid item md={3} />
          </Grid>
        </Grid>

        {/* End of header */}
        {/* Start of upload image */}

        {/* <Box textAlign="center">
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
        </Box> */}

        {/* End of Upload Image */}

        {/* Form */}
        <Box
          sx={{
            boxShadow: 3,
            backgroundColor: "#FFF",
            paddingTop: "2%",
            marginX: "15%",
            borderRadius: "10px",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                maxWidth: "100%",
                "& > :not(style)": { m: 1 },
              }}
            >
              <Grid container>
                <Grid item md={2} />
                <Grid item md={8} sm={11} xs={11}>
                  <Controller
                    name={"ProgramTypeName"}
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="ProgramTypeName">
                          Program Type
                        </InputLabel>
                        <Select
                          fullWidth
                          {...field}
                          labelId="ProgramTypeName"
                          id="ProgramTypeName"
                          color="secondary"
                          label="Program Type"
                          variant="outlined"
                          size="small"
                          // name="ProgramTypeName"
                          //
                          error={Boolean(errors.ProgramTypeName)}
                          helpertext={
                            errors.ProgramTypeName
                              ? errors.ProgramTypeName.message
                              : ""
                          }
                        >
                          {programType.map((programType) => (
                            <MenuItem
                              key={programType.ProgramName}
                              value={programType.ProgramName}
                            >
                              {programType.ProgramName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  ></Controller>
                </Grid>
              </Grid>

              {watch("ProgramTypeName") === "Certification" ? ( // ini masih pr
                <Grid container>
                  <Grid item md={2} />
                  <Grid item md={8} sm={11} xs={11}>
                    <Controller
                      name={"LinkCertification"}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          color="secondary"
                          id="LinkCertification"
                          label="Certificate Link"
                          variant="outlined"
                          size="small"
                          name="LinkCertification"
                          {...field}
                          error={Boolean(errors.LinkCertification)}
                          helperText={
                            errors.LinkCertification
                              ? errors.LinkCertification.message
                              : ""
                          }
                        />
                      )}
                    ></Controller>
                  </Grid>
                </Grid>
              ) : (
                <></>
              )}

              <Grid container>
                <Grid item md={2} />
                <Grid item md={8} sm={11} xs={11}>
                  <Controller
                    name={"ProgramName"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        color="secondary"
                        id="ProgramName"
                        label="Title"
                        variant="outlined"
                        size="small"
                        name="ProgramName"
                        {...field}
                        error={Boolean(errors.ProgramName)}
                        helperText={
                          errors.ProgramName ? errors.ProgramName.message : ""
                        }
                      />
                    )}
                  ></Controller>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item md={2} />
                <Grid item md={8} sm={11} xs={11}>
                  <Controller
                    name={"headline"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        color="secondary"
                        id="headline"
                        label="Headline"
                        variant="outlined"
                        size="small"
                        name="headline"
                        {...field}
                        error={Boolean(errors.headline)}
                        helperText={
                          errors.headline ? errors.headline.message : ""
                        }
                      />
                    )}
                  ></Controller>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item md={2} />
                <Grid item md={8} sm={11} xs={11}>
                  <Controller
                    name={"description"}
                    control={control}
                    render={({ field }) => (
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
                        {...field}
                        error={Boolean(errors.description)}
                        helperText={
                          errors.description ? errors.description.message : ""
                        }
                      />
                    )}
                  ></Controller>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item md={2} />
                <Grid item md={8} sm={11} xs={11}>
                  <Controller
                    name={"requirement"}
                    control={control}
                    render={({ field }) => (
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
                        {...field}
                        error={Boolean(errors.requirement)}
                        helperText={
                          errors.requirement ? errors.requirement.message : ""
                        }
                      />
                    )}
                  ></Controller>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item md={2} />
                <Grid item md={8} sm={11} xs={11}>
                  <Controller
                    name={"age"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        type="number"
                        color="secondary"
                        id="age"
                        label="Age"
                        variant="outlined"
                        size="small"
                        name="age"
                        {...field}
                        error={Boolean(errors.age)}
                        helperText={errors.age ? errors.age.message : ""}
                      />
                    )}
                  ></Controller>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item md={2} />
                <Grid item md={8} sm={11} xs={11}>
                  <Controller
                    name={"gpa"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        type="number"
                        color="secondary"
                        id="gpa"
                        label="GPA"
                        variant="outlined"
                        size="small"
                        name="gpa"
                        {...field}
                        error={Boolean(errors.gpa)}
                        helperText={errors.gpa ? errors.gpa.message : ""}
                      />
                    )}
                  ></Controller>
                </Grid>
              </Grid>

              {/* This is auto complete */}
              <Grid container>
                <Grid item md={2} />
                <Grid item md={8} sm={11} xs={11}>
                  <Controller
                    name={"RequirementSkill"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        color="secondary"
                        id="RequirementSkill"
                        label="Skill"
                        placeholder="example Sql, Javascript, Python, C#"
                        variant="outlined"
                        size="small"
                        name="RequirementSkill"
                        {...field}
                        error={Boolean(errors.RequirementSkill)}
                        helperText={
                          errors.RequirementSkill
                            ? errors.RequirementSkill.message
                            : ""
                        }
                      />
                    )}
                  ></Controller>
                </Grid>
              </Grid>

              {/* This is Date input */}
              <Box container display={"flex"} justifyContent={"space-evenly"}>
                {/* <Grid item md={2} />
                <Grid item md={3} sm={4} xs={4}> */}
                <Controller
                  name={"openDate"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      color="secondary"
                      id="openDate"
                      label="Open Date"
                      variant="outlined"
                      size="small"
                      name="openDate"
                      type="date"
                      {...field}
                      error={Boolean(errors.openDate)}
                      helperText={
                        errors.openDate ? errors.openDate.message : ""
                      }
                    />
                  )}
                ></Controller>
                {/* </Grid>
                <Grid item md={2} />
                <Grid item md={3} sm={4} xs={4}> */}
                <Controller
                  name={"closeDate"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      color="secondary"
                      id="closeDate"
                      label="Close Date"
                      variant="outlined"
                      size="small"
                      name="closeDate"
                      type="date"
                      {...field}
                      error={Boolean(errors.closeDate)}
                      helperText={
                        errors.closeDate ? errors.closeDate.message : ""
                      }
                    />
                  )}
                ></Controller>
                {/* </Grid> */}
              </Box>

              <Grid container>
                <Grid item md={2} />
                <Grid item md={8} sm={11} xs={11}>
                  <Controller
                    name={"address"}
                    control={control}
                    render={({ field }) => (
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
                        {...field}
                        error={Boolean(errors.address)}
                        helperText={
                          errors.address ? errors.address.message : ""
                        }
                      />
                    )}
                  ></Controller>
                </Grid>
              </Grid>
              <Box textAlign="center">
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  sx={{ marginBottom: 12, marginRight: "2%" }}
                >
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    style={{ marginRight: "10px" }}
                  />
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleCancel}
                  sx={{ marginBottom: 12 }}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ marginRight: "10px" }}
                  />
                  Cancel
                </Button>{" "}
              </Box>
            </Box>
          </form>
        </Box>
      </>
      <Footer />
    </Box>
  );
};

export default ProgramForm;
