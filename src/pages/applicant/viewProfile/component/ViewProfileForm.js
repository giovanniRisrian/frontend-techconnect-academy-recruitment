import { Box, Button, Grid, TextField, Typography, Input } from "@mui/material";
import dayjs from "dayjs";
import { FieldArray, Form, Formik, getIn } from "formik";
import * as Yup from "yup";
import MyComponent from "../../../homepage/BackgroundImage";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../../../../App";
import jwt_decode from "jwt-decode";

const ViewProfileForm = ({ bloc }) => {
  const { handleSubmit, getDataByID } = bloc();
  const [file, setFile] = useState(false);
  const data = useContext(RootContext);
  let userInfo = jwt_decode(data.userInfo);
  let [uploadPhoto, setUpload] = useState(false);
  const [disabled, changeDisable] = useState(1);
  const [initialValues, changeInitial] = useState({
    ID: "",
    UserAccountID: "",
    Personal: {
      Name: "",
      Gender: "",
      BirthDate: "",
      Domicile: "",
      Email: "",
      TelephoneNo: "",
      TotalWorkingExperience: "",
      SalaryExpectation: "",
    },
    Education: [
      {
        Title: "",
        Institution: "",
        Major: "",
        YearIn: "",
        YearOut: "",
        GPA: "",
      },
    ],
    Organization: [
      {
        Organization: "",
        Scope: "",
        Duration: "",
        Description: "",
        Position: "",
      },
    ],
    WorkExperience: [
      {
        CompanyName: "",
        Position: "",
        Level: "",
        Industry: "",
        YearIn: "",
        YearOut: "",
        Description: "",
      },
    ],
    SkillSet: [
      {
        Skill: "",
      },
    ],
  });
  const validationSchema = Yup.object().shape({
    Personal: Yup.object().shape({
      Name: Yup.string().required("This field is required"),
      Gender: Yup.string().required("This field is required"),
      BirthDate: Yup.date().required("This field is required"),
      Domicile: Yup.string().required("This field is required"),
      Email: Yup.string()
        .required("This field is required")
        .email("Invalid format email"),
      TelephoneNo: Yup.number().required("This field is required"),
      TotalWorkingExperience: Yup.number().required("This field is required"),
      SalaryExpectation: Yup.number().required("This field is required"),
    }),
    Education: Yup.array().of(
      Yup.object().shape({
        Title: Yup.string().required("This field is required"),
        Institution: Yup.string().required("This field is required"),
        Major: Yup.string().required("This field is required"),
        YearIn: Yup.string()
          .required("This field is required")
          .min(4, "Year in must be 4 character")
          .max(4, "Year in must be 4 character"),
        YearOut: Yup.string()
          .required("This field is required")
          .min(4, "Year out must be 4 character")
          .max(4, "Year in must be 4 character"),
        GPA: Yup.string().required("This field is required"),
      })
    ),
    Organization: Yup.array().of(
      Yup.object().shape({
        Organization: Yup.string().required("This field is required"),
        Scope: Yup.string().required("This field is required"),
        Duration: Yup.string().required("This field is required"),
        Description: Yup.string().required("This field is required"),
        Position: Yup.string().required("This field is required"),
      })
    ),
    WorkExperience: Yup.array().of(
      Yup.object().shape({
        CompanyName: Yup.string().required("This field is required"),
        Position: Yup.string().required("This field is required"),
        Level: Yup.string().required("This field is required"),
        Industry: Yup.string().required("This field is required"),
        YearIn: Yup.string()
          .required("This field is required")
          .min(4, "Year in must be 4 character")
          .max(4, "Year in must be 4 character"),
        YearOut: Yup.string()
          .required("This field is required")
          .min(4, "Year out must be 4 character")
          .max(4, "Year out must be 4 character"),
        Description: Yup.string().required("This field is required"),
      })
    ),
    SkillSet: Yup.array().of(
      Yup.object().shape({
        Skill: Yup.string().required("This field is required"),
      })
    ),
  });

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    getDataByID(userInfo.id, data, changeInitial);
  }, []);

  return (
    <MyComponent>
      <Typography
        variant="h4"
        textAlign="center"
        fontFamily="Montserrat"
        fontWeight="400"
        sx={{ paddingTop: "20px" }}
      >
        Data Personal View Profile
      </Typography>
      <br />
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("ini valuesnya", values);
          handleSubmit(values, file, data);
        }}
      >
        {({ values, touched, errors, handleChange }) => (
          <Box
            sx={{
              padding: "30px",
            }}
          >
            <Form>
              <Box autoComplete="off">
                {disabled ? (
                  <img
                    src={`data:image/jpeg/png;base64,${values.Personal.PhotoFile}` || ""}
                    style={{ height: "300px" }}
                  />
                ) : (
                  <>
                    {file ? (
                      <Input
                        color="secondary"
                        variant="contained"
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        disabled={disabled}
                        onChange={handleFile}
                      />
                    ) : (
                      <Button
                        margin="normal"
                        type="button"
                        color="secondary"
                        variant="outlined"
                        sx={{ height: "30px", marginTop: "20px" }}
                        onClick={() => setFile(true)}
                      >
                        Add / Edit Photo
                      </Button>
                    )}
                  </>
                )}

                <Grid container>
                  <Grid container spacing={2}>
                    <Grid item md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        InputProps={{
                          readOnly: disabled,
                        }}
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        label="Name"
                        name="Personal.Name"
                        value={values.Personal?.Name}
                        required
                        error={Boolean(
                          getIn(touched, "Personal.Name") &&
                            getIn(errors, "Personal.Name")
                        )}
                        helperText={
                          getIn(touched, "Personal.Name") &&
                          getIn(errors, "Personal.Name")
                        }
                        onChange={handleChange}
                      />
                      <br />
                      <TextField
                        fullWidth
                        size="small"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        label="Gender"
                        name="Personal.Gender"
                        value={values.Personal?.Gender}
                        required
                        error={Boolean(
                          getIn(touched, "Personal.Gender") &&
                            getIn(errors, "Personal.Gender")
                        )}
                        helperText={
                          getIn(touched, "Personal.Gender") &&
                          getIn(errors, "Personal.Gender")
                        }
                        onChange={handleChange}
                        InputProps={{
                          readOnly: disabled,
                        }}
                      />
                      <br />
                      <TextField
                        fullWidth
                        size="small"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        label="Birth Date"
                        name="Personal.BirthDate"
                        value={dayjs(values.Personal?.BirthDate).format(
                          "YYYY-MM-DD"
                        )}
                        required
                        error={Boolean(
                          getIn(touched, "Personal.BirthDate") &&
                            getIn(errors, "Personal.BirthDate")
                        )}
                        helperText={
                          getIn(touched, "Personal.BirthDate") &&
                          getIn(errors, "Personal.BirthDate")
                        }
                        onChange={handleChange}
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          readOnly: disabled,
                        }}
                      />
                      <br />
                      <TextField
                        fullWidth
                        size="small"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        label="Domicile"
                        name="Personal.Domicile"
                        value={values.Personal?.Domicile}
                        required
                        error={Boolean(
                          getIn(touched, "Personal.Domicile") &&
                            getIn(errors, "Personal.Domicile")
                        )}
                        helperText={
                          getIn(touched, "Personal.Domicile") &&
                          getIn(errors, "Personal.Domicile")
                        }
                        onChange={handleChange}
                        InputProps={{
                          readOnly: disabled,
                        }}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        label="Email"
                        name="Personal.Email"
                        value={values.Personal?.Email}
                        required
                        error={Boolean(
                          getIn(touched, "Personal.Email") &&
                            getIn(errors, "Personal.Email")
                        )}
                        helperText={
                          getIn(touched, "Personal.Email") &&
                          getIn(errors, "Personal.Email")
                        }
                        onChange={handleChange}
                        InputProps={{
                          readOnly: disabled,
                        }}
                        type="email"
                      />
                      <br />
                      <TextField
                        fullWidth
                        size="small"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        label="Phone"
                        name="Personal.TelephoneNo"
                        value={values.Personal.TelephoneNo}
                        required
                        error={Boolean(
                          getIn(touched, "Personal.TelephoneNo") &&
                            getIn(errors, "Personal.TelephoneNo")
                        )}
                        helperText={
                          getIn(touched, "Personal.TelephoneNo") &&
                          getIn(errors, "Personal.TelephoneNo")
                        }
                        onChange={handleChange}
                        InputProps={{
                          readOnly: disabled,
                        }}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        color="secondary"
                        id="TotalWorkingExperience"
                        label="Experience in Year"
                        variant="outlined"
                        size="small"
                        name="Personal.TotalWorkingExperience"
                        value={values.Personal.TotalWorkingExperience}
                        error={Boolean(
                          getIn(touched, "Personal.TotalWorkingExperience") &&
                            getIn(errors, "Personal.TotalWorkingExperience")
                        )}
                        helperText={
                          getIn(touched, "Personal.TotalWorkingExperience") &&
                          getIn(errors, "Personal.TotalWorkingExperience")
                        }
                        onChange={handleChange}
                        InputProps={{
                          readOnly: disabled,
                        }}
                        type="number"
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        color="secondary"
                        id="SalaryExpectation"
                        label="Salary Expectation"
                        variant="outlined"
                        size="small"
                        name="Personal.SalaryExpectation"
                        value={values.Personal.SalaryExpectation}
                        error={Boolean(
                          getIn(touched, "Personal.SalaryExpectation") &&
                            getIn(errors, "Personal.SalaryExpectation")
                        )}
                        helperText={
                          getIn(touched, "Personal.SalaryExpectation") &&
                          getIn(errors, "Personal.SalaryExpectation")
                        }
                        onChange={handleChange}
                        InputProps={{
                          readOnly: disabled,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item md={12}>
                    <FieldArray name="SkillSet">
                      {({ push, remove }) => (
                        <div>
                          {values.SkillSet.map((SkillSetName, idx) => {
                            const name = `SkillSet[${idx}].Skill`;
                            const touchedName = getIn(touched, name);
                            const errorName = getIn(errors, name);
                            const handleDelete = () => {
                              if (
                                window.confirm("Are you sure delete this data?")
                              ) {
                                remove(idx);
                              }
                            };

                            return (
                              <div key={idx}>
                                <Grid container spacing={5}>
                                  <Grid item md={11}>
                                    <TextField
                                      fullWidth
                                      margin="normal"
                                      color="secondary"
                                      label="SkillSet Skill"
                                      variant="outlined"
                                      size="small"
                                      name={name}
                                      value={SkillSetName.Skill}
                                      error={touchedName && Boolean(errorName)}
                                      helperText={touchedName && errorName}
                                      onChange={handleChange}
                                      InputProps={{
                                        readOnly: disabled,
                                      }}
                                    />
                                  </Grid>
                                  <Grid item md={1}>
                                    {idx === 0 ? (
                                      <div />
                                    ) : (
                                      <Button
                                        margin="normal"
                                        type="button"
                                        color="secondary"
                                        variant="outlined"
                                        sx={{
                                          height: "30px",
                                          marginTop: "20px",
                                        }}
                                        onClick={() => handleDelete()}
                                        InputProps={{
                                          readOnly: disabled,
                                        }}
                                      >
                                        X
                                      </Button>
                                    )}
                                  </Grid>
                                </Grid>
                              </div>
                            );
                          })}
                          {disabled ? (
                            <></>
                          ) : (
                            <Button
                              type="button"
                              variant="outlined"
                              color="secondary"
                              disabled={values.SkillSet.length >= 10}
                              onClick={() =>
                                push({
                                  Name: "",
                                })
                              }
                            >
                              Add SkillSet
                            </Button>
                          )}
                        </div>
                      )}
                    </FieldArray>
                  </Grid>
                </Grid>
                <br />
                <FieldArray name="Education">
                  {({ push, remove }) => (
                    <div>
                      <Typography variant="h6" fontFamily="Montserrat">
                        Education
                      </Typography>
                      <Typography variant="body2" color="#4D4D4D">
                        *Maksimum 3 Education
                      </Typography>
                      {values.Education.map((edu, idx) => {
                        const title = `Education[${idx}].Title`;
                        const touchedTitle = getIn(touched, title);
                        const errorTitle = getIn(errors, title);

                        const Institution = `Education[${idx}].Institution`;
                        const touchedInstitution = getIn(touched, Institution);
                        const errorInstitution = getIn(errors, Institution);

                        const Major = `Education[${idx}].Major`;
                        const touchedMajor = getIn(touched, Major);
                        const errorMajor = getIn(errors, Major);

                        const yearInEdu = `Education[${idx}].YearIn`;
                        const touchedYearInEdu = getIn(touched, yearInEdu);
                        const errorYearInEdu = getIn(errors, yearInEdu);

                        const yearOutEdu = `Education[${idx}].YearOut`;
                        const touchedYearOutEdu = getIn(touched, yearOutEdu);
                        const errorYearOutEdu = getIn(errors, yearOutEdu);

                        const GPA = `Education[${idx}].GPA`;
                        const touchedGPA = getIn(touched, GPA);
                        const errorGPA = getIn(errors, GPA);

                        const handleDelete = () => {
                          if (
                            window.confirm("Are you sure delete this data?")
                          ) {
                            remove(idx);
                          }
                        };

                        return (
                          <div key={idx}>
                            <Grid container spacing={2}>
                              <Grid item md={6}>
                                <TextField
                                  size="small"
                                  color="secondary"
                                  margin="normal"
                                  variant="outlined"
                                  label="Title"
                                  InputProps={{
                                    readOnly: disabled,
                                  }}
                                  name={title}
                                  value={edu.Title}
                                  required
                                  helperText={
                                    touchedTitle && errorTitle ? errorTitle : ""
                                  }
                                  error={Boolean(touchedTitle && errorTitle)}
                                  onChange={handleChange}
                                />
                                <br />
                                <TextField
                                  size="small"
                                  color="secondary"
                                  margin="normal"
                                  variant="outlined"
                                  label="Institution"
                                  name={Institution}
                                  value={edu.Institution}
                                  required
                                  helperText={
                                    touchedInstitution && errorInstitution
                                      ? errorInstitution
                                      : ""
                                  }
                                  error={Boolean(
                                    touchedInstitution && errorInstitution
                                  )}
                                  onChange={handleChange}
                                  InputProps={{
                                    readOnly: disabled,
                                  }}
                                />
                                <br />
                                <TextField
                                  size="small"
                                  color="secondary"
                                  margin="normal"
                                  variant="outlined"
                                  label="Major"
                                  name={Major}
                                  value={edu.Major}
                                  required
                                  helperText={
                                    touchedMajor && errorMajor ? errorMajor : ""
                                  }
                                  error={Boolean(touchedMajor && errorMajor)}
                                  onChange={handleChange}
                                />
                              </Grid>
                              <Grid item md={5}>
                                <TextField
                                  size="small"
                                  color="secondary"
                                  margin="normal"
                                  variant="outlined"
                                  label="Year In"
                                  name={yearInEdu}
                                  value={edu.YearIn}
                                  required
                                  helperText={
                                    touchedYearInEdu && errorYearInEdu
                                      ? errorYearInEdu
                                      : ""
                                  }
                                  error={Boolean(
                                    touchedYearInEdu && errorYearInEdu
                                  )}
                                  onChange={handleChange}
                                  InputProps={{
                                    readOnly: disabled,
                                  }}
                                />
                                <br />
                                <TextField
                                  size="small"
                                  color="secondary"
                                  margin="normal"
                                  variant="outlined"
                                  label="Year Out"
                                  name={yearOutEdu}
                                  value={edu.YearOut}
                                  required
                                  helperText={
                                    touchedYearOutEdu && errorYearOutEdu
                                      ? errorYearOutEdu
                                      : ""
                                  }
                                  error={Boolean(
                                    touchedYearOutEdu && errorYearOutEdu
                                  )}
                                  onChange={handleChange}
                                  InputProps={{
                                    readOnly: disabled,
                                  }}
                                />
                                <br />
                                <TextField
                                  size="small"
                                  color="secondary"
                                  margin="normal"
                                  variant="outlined"
                                  label="GPA"
                                  name={GPA}
                                  value={edu.GPA}
                                  required
                                  helperText={
                                    touchedGPA && errorGPA ? errorGPA : ""
                                  }
                                  error={Boolean(touchedGPA && errorGPA)}
                                  onChange={handleChange}
                                  InputProps={{
                                    readOnly: disabled,
                                  }}
                                />
                              </Grid>
                              <Grid item md={1}>
                                {idx === 0 ? (
                                  <div />
                                ) : (
                                  <Button
                                    margin="normal"
                                    type="button"
                                    color="secondary"
                                    variant="outlined"
                                    sx={{ height: "30px", marginTop: "20px" }}
                                    onClick={() => handleDelete()}
                                  >
                                    X
                                  </Button>
                                )}
                              </Grid>
                            </Grid>
                          </div>
                        );
                      })}

                      {disabled ? (
                        <></>
                      ) : (
                        <Button
                          type="button"
                          variant="outlined"
                          color="secondary"
                          disabled={values.Education.length >= 3}
                          onClick={() =>
                            push({
                              Title: "",
                              Institution: "",
                              Major: "",
                              YearIn: "",
                              YearOut: "",
                              GPA: "",
                            })
                          }
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  )}
                </FieldArray>
                <br />
                <FieldArray name="Organization">
                  {({ push, remove }) => (
                    <div>
                      <Typography variant="h6" fontFamily="Montserrat">
                        Organization
                      </Typography>
                      <Typography variant="body2" color="#4D4D4D">
                        *Maksimum 3 Organization
                      </Typography>
                      {values.Organization.map((org, idx) => {
                        const Organizations = `Organization[${idx}].Organization`;
                        const touchedOrganization = getIn(
                          touched,
                          Organizations
                        );
                        const errorOrganization = getIn(errors, Organizations);

                        const Scope = `Organization[${idx}].Scope`;
                        const touchedScope = getIn(touched, Scope);
                        const errorScope = getIn(errors, Scope);

                        const duration = `Organization[${idx}].Duration`;
                        const touchedDuration = getIn(touched, duration);
                        const errorDuration = getIn(errors, duration);

                        const description = `Organization[${idx}].Description`;
                        const touchedDescription = getIn(touched, description);
                        const errorDescription = getIn(errors, description);

                        const position = `Organization[${idx}].Position`;
                        const touchedPosition = getIn(touched, position);
                        const errorPosition = getIn(errors, position);
                        const handleDelete = () => {
                          if (
                            window.confirm("Are you sure delete this data?")
                          ) {
                            remove(idx);
                          }
                        };

                        return (
                          <div key={idx}>
                            <Grid container>
                              <Grid container spacing={2}>
                                <Grid item md={6}>
                                  <TextField
                                    size="small"
                                    color="secondary"
                                    margin="normal"
                                    variant="outlined"
                                    label="Organization"
                                    name={Organizations}
                                    value={org.Organization}
                                    required
                                    helperText={
                                      touchedOrganization && errorOrganization
                                        ? errorOrganization
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedOrganization && errorOrganization
                                    )}
                                    onChange={handleChange}
                                  />
                                  <br />
                                  <TextField
                                    size="small"
                                    color="secondary"
                                    margin="normal"
                                    variant="outlined"
                                    label="Scope"
                                    name={Scope}
                                    value={org.Scope}
                                    InputProps={{
                                      readOnly: disabled,
                                    }}
                                    required
                                    helperText={
                                      touchedScope && errorScope
                                        ? errorScope
                                        : ""
                                    }
                                    error={Boolean(touchedScope && errorScope)}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item md={5}>
                                  <TextField
                                    size="small"
                                    color="secondary"
                                    margin="normal"
                                    variant="outlined"
                                    label="Duration"
                                    name={duration}
                                    value={org.Duration}
                                    required
                                    helperText={
                                      touchedDuration && errorDuration
                                        ? errorDuration
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedDuration && errorDuration
                                    )}
                                    onChange={handleChange}
                                  />
                                  <br />
                                  <TextField
                                    size="small"
                                    color="secondary"
                                    margin="normal"
                                    variant="outlined"
                                    label="Position"
                                    name={position}
                                    value={org.Position}
                                    required
                                    helperText={
                                      touchedPosition && errorPosition
                                        ? errorPosition
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedPosition && errorPosition
                                    )}
                                    InputProps={{
                                      readOnly: disabled,
                                    }}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item md={1}>
                                  {idx === 0 ? (
                                    <div />
                                  ) : (
                                    <Button
                                      margin="normal"
                                      type="button"
                                      color="secondary"
                                      variant="outlined"
                                      sx={{ height: "30px", marginTop: "20px" }}
                                      onClick={() => handleDelete()}
                                    >
                                      x
                                    </Button>
                                  )}
                                </Grid>
                              </Grid>

                              <TextField
                                fullWidth
                                size="small"
                                multiline
                                minRows={3}
                                color="secondary"
                                margin="normal"
                                variant="outlined"
                                label="Description"
                                name={description}
                                value={org.Description}
                                required
                                InputProps={{
                                  readOnly: disabled,
                                }}
                                helperText={
                                  touchedDescription && errorDescription
                                    ? errorDescription
                                    : ""
                                }
                                error={Boolean(
                                  touchedDescription && errorDescription
                                )}
                                onChange={handleChange}
                              />
                            </Grid>
                          </div>
                        );
                      })}

                      {disabled ? (
                        <></>
                      ) : (
                        <Button
                          type="button"
                          variant="outlined"
                          color="secondary"
                          disabled={values.Organization.length >= 3}
                          onClick={() =>
                            push({
                              Organization: "",
                              Scope: "",
                              Duration: "",
                              Description: "",
                              Position: "",
                            })
                          }
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  )}
                </FieldArray>
                <br />
                <FieldArray name="WorkExperience">
                  {({ push, remove }) => (
                    <div>
                      <Typography variant="h6" fontFamily="Montserrat">
                        Work Experience
                      </Typography>
                      <Typography variant="body2" color="#4D4D4D">
                        *Maksimum 3 work experience
                      </Typography>
                      {values.WorkExperience.map((work, idx) => {
                        const name = `WorkExperience[${idx}].CompanyName`;
                        const touchedCompanyName = getIn(touched, name);
                        const errorCompanyName = getIn(errors, name);

                        const position = `WorkExperience[${idx}].Position`;
                        const touchedPosition = getIn(touched, position);
                        const errorPosition = getIn(errors, position);

                        const Level = `WorkExperience[${idx}].Level`;
                        const touchedLevel = getIn(touched, Level);
                        const errorLevel = getIn(errors, Level);

                        const Industry = `WorkExperience[${idx}].Industry`;
                        const touchedIndustry = getIn(touched, Industry);
                        const errorIndustry = getIn(errors, Industry);

                        const yearIn = `WorkExperience[${idx}].YearIn`;
                        const touchedYearIn = getIn(touched, yearIn);
                        const errorYearIn = getIn(errors, yearIn);

                        const yearOut = `WorkExperience[${idx}].YearOut`;
                        const touchedYearOut = getIn(touched, yearOut);
                        const errorYearOut = getIn(errors, yearOut);

                        const descriptionWork = `WorkExperience[${idx}].Description`;
                        const touchedDescription = getIn(
                          touched,
                          descriptionWork
                        );
                        const errorDescription = getIn(errors, descriptionWork);
                        const handleDelete = () => {
                          if (
                            window.confirm("Are you sure delete this data?")
                          ) {
                            remove(idx);
                          }
                        };
                        return (
                          <div key={idx}>
                            <Grid container>
                              <Grid container spacing={2}>
                                <Grid item md={6}>
                                  <TextField
                                    size="small"
                                    color="secondary"
                                    margin="normal"
                                    variant="outlined"
                                    label="Company Name"
                                    InputProps={{
                                      readOnly: disabled,
                                    }}
                                    name={name}
                                    value={work.CompanyName}
                                    required
                                    helperText={
                                      touchedCompanyName && errorCompanyName
                                        ? errorCompanyName
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedCompanyName && errorCompanyName
                                    )}
                                    onChange={handleChange}
                                  />
                                  <br />
                                  <TextField
                                    size="small"
                                    color="secondary"
                                    margin="normal"
                                    variant="outlined"
                                    label="Position"
                                    InputProps={{
                                      readOnly: disabled,
                                    }}
                                    name={position}
                                    value={work.Position}
                                    required
                                    helperText={
                                      touchedPosition && errorPosition
                                        ? errorPosition
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedPosition && errorPosition
                                    )}
                                    onChange={handleChange}
                                  />
                                  <br />
                                  <TextField
                                    size="small"
                                    color="secondary"
                                    margin="normal"
                                    variant="outlined"
                                    label="Level"
                                    InputProps={{
                                      readOnly: disabled,
                                    }}
                                    name={Level}
                                    value={work.Level}
                                    required
                                    helperText={
                                      touchedLevel && errorLevel
                                        ? errorLevel
                                        : ""
                                    }
                                    error={Boolean(touchedLevel && errorLevel)}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item md={5}>
                                  <TextField
                                    size="small"
                                    color="secondary"
                                    margin="normal"
                                    variant="outlined"
                                    label="Industry"
                                    InputProps={{
                                      readOnly: disabled,
                                    }}
                                    name={Industry}
                                    value={work.Industry}
                                    required
                                    helperText={
                                      touchedIndustry && errorIndustry
                                        ? errorIndustry
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedIndustry && errorIndustry
                                    )}
                                    onChange={handleChange}
                                  />
                                  <br />
                                  <TextField
                                    size="small"
                                    color="secondary"
                                    margin="normal"
                                    variant="outlined"
                                    label="Year In"
                                    name={yearIn}
                                    value={work.YearIn}
                                    InputProps={{
                                      readOnly: disabled,
                                    }}
                                    required
                                    helperText={
                                      touchedYearIn && errorYearIn
                                        ? errorYearIn
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedYearIn && errorYearIn
                                    )}
                                    onChange={handleChange}
                                  />
                                  <br />
                                  <TextField
                                    size="small"
                                    color="secondary"
                                    margin="normal"
                                    variant="outlined"
                                    label="Year Out"
                                    name={yearOut}
                                    value={work.YearOut}
                                    required
                                    InputProps={{
                                      readOnly: disabled,
                                    }}
                                    helperText={
                                      touchedYearOut && errorYearOut
                                        ? errorYearOut
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedYearOut && errorYearOut
                                    )}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item md={1}>
                                  {idx === 0 ? (
                                    <div />
                                  ) : (
                                    <Button
                                      margin="normal"
                                      type="button"
                                      color="secondary"
                                      variant="outlined"
                                      sx={{ height: "30px", marginTop: "20px" }}
                                      onClick={() => handleDelete()}
                                    >
                                      x
                                    </Button>
                                  )}
                                </Grid>
                              </Grid>
                              <TextField
                                size="small"
                                fullWidth
                                multiline
                                minRows={3}
                                color="secondary"
                                margin="normal"
                                variant="outlined"
                                label="Description"
                                name={descriptionWork}
                                value={work.Description}
                                required
                                InputProps={{
                                  readOnly: disabled,
                                }}
                                helperText={
                                  touchedDescription && errorDescription
                                    ? errorDescription
                                    : ""
                                }
                                error={Boolean(
                                  touchedDescription && errorDescription
                                )}
                                onChange={handleChange}
                              />
                            </Grid>
                          </div>
                        );
                      })}

                      {disabled ? (
                        <></>
                      ) : (
                        <Button
                          type="button"
                          variant="outlined"
                          disabled={values.WorkExperience.length >= 3}
                          color="secondary"
                          onClick={() =>
                            push({
                              CompanyName: "",
                              Position: "",
                              Level: "",
                              Industry: "",
                              YearIn: "",
                              YearOut: "",
                              Description: "",
                            })
                          }
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  )}
                </FieldArray>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  {disabled ? (
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => changeDisable(!disabled)}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => changeDisable(!disabled)}
                        sx={{marginRight:"20px"}}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        onClick={() => changeDisable(!disabled)}
                      >
                        Submit
                      </Button>
                    
                    </>
                  )}
                </Box>
              </Box>
            </Form>
          </Box>
        )}
      </Formik>
    </MyComponent>
  );
};

export default ViewProfileForm;
