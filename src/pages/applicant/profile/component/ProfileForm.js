import { Box, Button, Grid, TextField, Typography, Input } from "@mui/material";
import { FieldArray, Form, Formik, getIn } from "formik";
import * as Yup from "yup";
import MyComponent from "../../../homepage/BackgroundImage";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../../../../App";
import jwt_decode from "jwt-decode";

const ProfileForm = ({ bloc }) => {
  
  const { handleSubmit } = bloc();
  const [file, setFile] = useState(null);
  const data = useContext(RootContext);
  let userInfo = jwt_decode(data.userInfo);
  
  const validationSchema = Yup.object().shape({
    personal : Yup.object().shape({
      name: Yup.string().required("This field is required"),
      gender: Yup.string().required("This field is required"),
      birth_date: Yup.date().required("This field is required"),
      domicile: Yup.string().required("This field is required"),
      email: Yup.string()
        .required("This field is required")
        .email("Invalid format email"),
      telephone_no: Yup.number().required("This field is required"),
      total_working_experience:Yup.number().required("This field is required"),
      salary_expectation: Yup.number().required("This field is required"),
    }),
    education: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("This field is required"),
        institution: Yup.string().required("This field is required"),
        major: Yup.string().required("This field is required"),
        year_in_edu: Yup.string()
          .required("This field is required")
          .min(4, "Year in must be 4 character")
          .max(4, "Year in must be 4 character"),
        year_out_edu: Yup.string()
          .required("This field is required")
          .min(4, "Year out must be 4 character")
          .max(4, "Year in must be 4 character"),
        gpa: Yup.string().required("This field is required"),
      })
    ),
    organization: Yup.array().of(
      Yup.object().shape({
        organization: Yup.string().required("This field is required"),
        scope: Yup.string().required("This field is required"),
        duration_org: Yup.string().required("This field is required"),
        description_org: Yup.string().required("This field is required"),
        position_org: Yup.string().required("This field is required"),
      })
    ),
    work_exp: Yup.array().of(
      Yup.object().shape({
        company_name: Yup.string().required("This field is required"),
        position_work: Yup.string().required("This field is required"),
        level: Yup.string().required("This field is required"),
        industry: Yup.string().required("This field is required"),
        year_in_work: Yup.string()
          .required("This field is required")
          .min(4, "Year in must be 4 character")
          .max(4, "Year in must be 4 character"),
        year_out_work: Yup.string()
          .required("This field is required")
          .min(4, "Year out must be 4 character")
          .max(4, "Year out must be 4 character"),
        description_work: Yup.string().required("This field is required"),
      })
    ),
    skill: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("This field is required"),
      })
    ),
  });

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(()=>{
     console.log("user",data);
  },[])

  return (
    <MyComponent>
      <Typography
        variant="h4"
        textAlign="center"
        fontFamily="Montserrat"
        fontWeight="400"
        sx={{ paddingTop: "20px" }}
      >
        Data Personal
      </Typography>
      <br />
      <Formik
        initialValues={{
          personal:{
            name: "",
            gender: "",
            birth_date: "",
            domicile: "",
            email: "",
            telephone_no: "",
            total_working_experience:"",
            salary_expectation: "",
          },
          education: [
            {
              title: "",
              institution: "",
              major: "",
              year_in_edu: "",
              year_out_edu: "",
              gpa: "",
            },
          ],
          organization: [
            {
              organization: "",
              scope: "",
              duration_org: "",
              description_org: "",
              position_org: "",
            },
          ],
          work_exp: [
            {
              company_name: "",
              position_work: "",
              level: "",
              industry: "",
              year_in_work: "",
              year_out_work: "",
              description_work: "",
            },
          ],
          skill: [
            {
              name: "",
            },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("ini valuesnya",values);
          handleSubmit(values,file, data);
        }}
      >
        {({ values, touched, errors, handleChange }) => (
          <Box
            sx={{
              padding: "30px",
            }}
          >
            <Form>
              <Box
                autoComplete="off"
              >
                
                <Input
                  color="secondary"
                  variant="contained"
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleFile}
                />
                <Grid container>
                  <Grid container spacing={2}>
                    <Grid item md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        label="Name"
                        name="personal.name"
                        value={values.personal.name}
                        required
                        error={Boolean(
                          getIn(touched, 'personal.name') &&
                            getIn(errors, 'personal.name')
                        )}
                        helperText={
                          getIn(touched, 'personal.name') &&
                          getIn(errors, 'personal.name')
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
                        name="personal.gender"
                        value={values.personal.gender}
                        required
                        error={Boolean(
                          getIn(touched, 'personal.gender') &&
                            getIn(errors, 'personal.gender')
                        )}
                        helperText={
                          getIn(touched, 'personal.gender') &&
                          getIn(errors, 'personal.gender')
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
                        label="Birth Date"
                        name="personal.birth_date"
                        value={values.personal.birth_date}
                        required
                        error={Boolean(
                          getIn(touched, 'personal.birth_date') &&
                            getIn(errors, 'personal.birth_date')
                        )}
                        helperText={
                          getIn(touched, 'personal.birth_date') &&
                          getIn(errors, 'personal.birth_date')
                        }
                        onChange={handleChange}
                        type="date"
                        InputLabelProps={{
                          shrink: true,
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
                        name="personal.domicile"
                        value={values.personal.domicile}
                        required
                        error={Boolean(
                          getIn(touched, 'personal.domicile') &&
                            getIn(errors, 'personal.domicile')
                        )}
                        helperText={
                          getIn(touched, 'personal.domicile') &&
                          getIn(errors, 'personal.domicile')
                        }
                        onChange={handleChange}
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
                        name="personal.email"
                        value={values.personal.email}
                        required
                        error={Boolean(
                          getIn(touched, 'personal.email') &&
                            getIn(errors, 'personal.email')
                        )}
                        helperText={
                          getIn(touched, 'personal.email') &&
                          getIn(errors, 'personal.email')
                        }
                        onChange={handleChange}
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
                        name="personal.telephone_no"
                        value={values.personal.telephone_no}
                        required
                        error={Boolean(
                          getIn(touched, 'personal.telephone_no') &&
                            getIn(errors, 'personal.telephone_no')
                        )}
                        helperText={
                          getIn(touched, 'personal.telephone_no') &&
                          getIn(errors, 'personal.telephone_no')
                        }
                        onChange={handleChange}
                      />
                      <TextField
                            margin="normal"
                            required
                            color="secondary"
                            id="total_working_experience"
                            label="Experience in Year"
                            variant="outlined"
                            size="small"
                            name="personal.total_working_experience"
                            value={values.personal.total_working_experience}
                            error={Boolean(
                              getIn(touched, 'personal.total_working_experience') &&
                                getIn(errors, 'personal.total_working_experience')
                            )}
                            helperText={
                              getIn(touched, 'personal.total_working_experience') &&
                              getIn(errors, 'personal.total_working_experience')
                            }
                            onChange={handleChange}
                            type="number"
                          />
                      {/* <Grid container>
                        <Grid item md={6}>
                          
                        </Grid>
                        <Grid item md={6}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            color="secondary"
                            id=" monthWorkExperience"
                            label="Month"
                            variant="outlined"
                            size="small"
                            name="monthWorkExperience"
                            value={values.personal.monthWorkExperience}
                            error={
                              touched.personal.monthWorkExperience &&
                              Boolean(errors.personal.monthWorkExperience)
                            }
                            helperText={
                              touched.monthWorkExperience &&
                              errors.monthWorkExperience
                            }
                            onChange={handleChange}
                            type="number"
                          />
                        </Grid>
                      </Grid> */}
                      <TextField
                        fullWidth
                        margin="normal"
                        color="secondary"
                        id="salary_expectation"
                        label="Salary Expectation"
                        variant="outlined"
                        size="small"
                        name="personal.salary_expectation"
                        value={values.personal.salary_expectation}
                        error={Boolean(
                          getIn(touched, 'personal.salary_expectation') &&
                            getIn(errors, 'personal.salary_expectation')
                        )}
                        helperText={
                          getIn(touched, 'personal.salary_expectation') &&
                          getIn(errors, 'personal.salary_expectation')
                        }
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid item md={12}>
                    <FieldArray name="skill">
                      {({ push, remove }) => (
                        <div>
                          {values.skill.map((skillName, idx) => {
                            const name = `skill[${idx}].name`;
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
                                  label="Skill Name"
                                  variant="outlined"
                                  size="small"
                                  name={name}
                                  value={skillName.name}
                                  error={touchedName && Boolean(errorName)}
                                  helperText={touchedName && errorName}
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
                                    X
                                  </Button>
                                )}
                                </Grid>
                              </Grid>
                              </div>
                            );
                          })}
                          <Button
                            type="button"
                            variant="outlined"
                            color="secondary"
                            disabled={values.skill.length >= 10}
                            onClick={() =>
                              push({
                                name: "",
                              })
                            }
                          >
                            Add Skill
                          </Button>
                        </div>
                      )}
                    </FieldArray>
                  </Grid>
                </Grid>
                <br />
                <FieldArray name="education">
                  {({ push, remove }) => (
                    <div>
                      <Typography variant="h6" fontFamily="Montserrat">
                        Education
                      </Typography>
                      <Typography variant="body2" color="#4D4D4D">
                        *Maksimum 3 education
                      </Typography>
                      {values.education.map((edu, idx) => {
                        const title = `education[${idx}].title`;
                        const touchedTitle = getIn(touched, title);
                        const errorTitle = getIn(errors, title);

                        const institution = `education[${idx}].institution`;
                        const touchedInstitution = getIn(touched, institution);
                        const errorInstitution = getIn(errors, institution);

                        const major = `education[${idx}].major`;
                        const touchedMajor = getIn(touched, major);
                        const errorMajor = getIn(errors, major);

                        const yearInEdu = `education[${idx}].year_in_edu`;
                        const touchedYearInEdu = getIn(touched, yearInEdu);
                        const errorYearInEdu = getIn(errors, yearInEdu);

                        const yearOutEdu = `education[${idx}].year_out_edu`;
                        const touchedYearOutEdu = getIn(touched, yearOutEdu);
                        const errorYearOutEdu = getIn(errors, yearOutEdu);

                        const gpa = `education[${idx}].gpa`;
                        const touchedGpa = getIn(touched, gpa);
                        const errorGpa = getIn(errors, gpa);

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
                                  name={title}
                                  value={edu.title}
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
                                  name={institution}
                                  value={edu.institution}
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
                                />
                                <br />
                                <TextField
                                  size="small"
                                  color="secondary"
                                  margin="normal"
                                  variant="outlined"
                                  label="Major"
                                  name={major}
                                  value={edu.major}
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
                                  value={edu.year_in_edu}
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
                                />
                                <br />
                                <TextField
                                  size="small"
                                  color="secondary"
                                  margin="normal"
                                  variant="outlined"
                                  label="Year Out"
                                  name={yearOutEdu}
                                  value={edu.year_out_edu}
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
                                />
                                <br />
                                <TextField
                                  size="small"
                                  color="secondary"
                                  margin="normal"
                                  variant="outlined"
                                  label="GPA"
                                  name={gpa}
                                  value={edu.gpa}
                                  required
                                  helperText={
                                    touchedGpa && errorGpa ? errorGpa : ""
                                  }
                                  error={Boolean(touchedGpa && errorGpa)}
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
                                    X
                                  </Button>
                                )}
                              </Grid>
                            </Grid>
                          </div>
                        );
                      })}
                      <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        disabled={values.education.length >= 3}
                        onClick={() =>
                          push({
                            title: "",
                            institution: "",
                            major: "",
                            year_in_edu: "",
                            year_out_edu: "",
                            gpa: "",
                          })
                        }
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </FieldArray>
                <br />
                <FieldArray name="organization">
                  {({ push, remove }) => (
                    <div>
                      <Typography variant="h6" fontFamily="Montserrat">
                        Organization
                      </Typography>
                      <Typography variant="body2" color="#4D4D4D">
                        *Maksimum 3 organization
                      </Typography>
                      {values.organization.map((org, idx) => {
                        const organizations = `organization[${idx}].organization`;
                        const touchedOrganization = getIn(
                          touched,
                          organizations
                        );
                        const errorOrganization = getIn(errors, organizations);

                        const scope = `organization[${idx}].scope`;
                        const touchedScope = getIn(touched, scope);
                        const errorScope = getIn(errors, scope);

                        const duration = `organization[${idx}].duration_org`;
                        const touchedDuration = getIn(touched, duration);
                        const errorDuration = getIn(errors, duration);

                        const description = `organization[${idx}].description_org`;
                        const touchedDescription = getIn(touched, description);
                        const errorDescription = getIn(errors, description);

                        const position = `organization[${idx}].position_org`;
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
                                    name={organizations}
                                    value={org.organization}
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
                                    name={scope}
                                    value={org.scope}
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
                                    value={org.duration_org}
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
                                    value={org.position_org}
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
                                value={org.description_org}
                                required
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
                      <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        disabled={values.organization.length >= 3}
                        onClick={() =>
                          push({
                            organization: "",
                            scope: "",
                            duration_org: "",
                            description_org: "",
                            position_org: "",
                          })
                        }
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </FieldArray>
                <br />
                <FieldArray name="work_exp">
                  {({ push, remove }) => (
                    <div>
                      <Typography variant="h6" fontFamily="Montserrat">
                        Work Experience
                      </Typography>
                      <Typography variant="body2" color="#4D4D4D">
                        *Maksimum 3 work experience
                      </Typography>
                      {values.work_exp.map((work, idx) => {
                        const name = `work_exp[${idx}].company_name`;
                        const touchedCompanyName = getIn(touched, name);
                        const errorCompanyName = getIn(errors, name);

                        const position = `work_exp[${idx}].position_work`;
                        const touchedPosition = getIn(touched, position);
                        const errorPosition = getIn(errors, position);

                        const level = `work_exp[${idx}].level`;
                        const touchedLevel = getIn(touched, level);
                        const errorLevel = getIn(errors, level);

                        const industry = `work_exp[${idx}].industry`;
                        const touchedIndustry = getIn(touched, industry);
                        const errorIndustry = getIn(errors, industry);

                        const yearIn = `work_exp[${idx}].year_in_work`;
                        const touchedYearIn = getIn(touched, yearIn);
                        const errorYearIn = getIn(errors, yearIn);

                        const yearOut = `work_exp[${idx}].year_out_work`;
                        const touchedYearOut = getIn(touched, yearOut);
                        const errorYearOut = getIn(errors, yearOut);

                        const descriptionWork = `work_exp[${idx}].description_work`;
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
                                    name={name}
                                    value={work.company_name}
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
                                    name={position}
                                    value={work.position_work}
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
                                    name={level}
                                    value={work.level}
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
                                    name={industry}
                                    value={work.industry}
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
                                    value={work.year_in_work}
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
                                    value={work.year_out_work}
                                    required
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
                                value={work.description_work}
                                required
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
                      <Button
                        type="button"
                        variant="outlined"
                        disabled={values.work_exp.length >= 3}
                        color="secondary"
                        onClick={() =>
                          push({
                            company_name: "",
                            position_work: "",
                            level: "",
                            industry: "",
                            year_in_work: "",
                            year_out_work: "",
                            description_work: "",
                          })
                        }
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </FieldArray>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button type="submit" color="secondary" variant="contained">
                    submit
                  </Button>
                </Box>
              </Box>
            </Form>
          </Box>
        )}
      </Formik>
    </MyComponent>
  );
};

export default ProfileForm;
