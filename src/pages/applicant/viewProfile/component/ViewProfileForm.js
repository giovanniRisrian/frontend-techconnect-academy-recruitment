import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Input,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import dayjs from "dayjs";
import * as Yup from "yup";
import MyComponent from "../../../homepage/BackgroundImage";
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../../../../App";
import jwt_decode from "jwt-decode";
import avatar from "../../../../asset/image/avatar.png";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { convert } from "../../../../utils/ConvertDate";
import UploadButton from "../../../globalComponent/uploadButton/UploadButton";

const validationSchema = Yup.object().shape({
  Personal: Yup.object().shape({
    Name: Yup.string().required("This field is required"),
    Gender: Yup.string().required("This field is required"),
    BirthDate: Yup.date().required("This field is required"),
    Domicile: Yup.string().required("This field is required"),
    Email: Yup.string()
      .required("This field is required")
      .email("Invalid format email"),
    TelephoneNo: Yup.string().required("This field is required"),
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
  SkillSet: Yup.array().of(
    Yup.object().shape({
      Skill: Yup.string().required("This field is required"),
    })
  ),
});

const ViewProfileForm = ({ bloc }) => {
  const { addProfile, getDataByID } = bloc();
  const [file, setFile] = useState(false);
  const data = useContext(RootContext);
  let userInfo = jwt_decode(data.userInfo);
  // let [uploadPhoto, setUpload] = useState(false);
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

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const {
    fields: SkillSetField,
    append: SkillSetAppend,
    remove: SkillSetRemove,
  } = useFieldArray({ control, name: "SkillSet" });

  const {
    fields: EducationField,
    append: EducationAppend,
    remove: EducationRemove,
  } = useFieldArray({ control, name: "Education" });

  const {
    fields: OrganizationField,
    append: OrganizationAppend,
    remove: OrganizationRemove,
  } = useFieldArray({ control, name: "Organization" });

  const {
    fields: WorkExperienceField,
    append: WorkExperienceAppend,
    remove: WorkExperienceRemove,
  } = useFieldArray({ control, name: "WorkExperience" });

  const onSubmit = (values) => {
    values.Personal.BirthDate = convert(values.Personal.BirthDate);
    values.WorkExperience.YearIn = convert(values.WorkExperience.YearIn);
    values.WorkExperience.YearOut = convert(values.WorkExperience.YearOut);
    addProfile(values, file, data);
    changeDisable(!disabled);
  };

  useEffect(() => {
    getDataByID(userInfo.id, data, changeInitial);
  }, []);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

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
      <Box
        sx={{
          padding: "30px",
        }}
      >
        {initialValues.Personal?.ResumeFile ? (
          <div>
            {initialValues.Personal?.ResumeFile.split(":")[0].split(".")[1] ===
            "pdf" ? (
              <Button
                color="primary"
                variant="contained"
                sx={{ marginTop: "10px" }}
              >
                <a style={{textDecoration:'none'}}
                  download={initialValues.Personal?.Name}
                  title="Download pdf document"
                  href={`data:application/pdf;base64,${
                    initialValues.Personal.ResumeFile.split(":")[1]
                  }`}
                >
                  Download Resume
                </a>
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                sx={{ marginTop: "10px" }}
              >
                <a style={{textDecoration:'none'}}
                  download={
                    initialValues.Personal.Name +
                    "." +
                    initialValues.Personal.ResumeFile.split(":")[0].split(
                      "."
                    )[1]
                  }
                  title="Download Image"
                  href={`data:application/png;base64,${
                    initialValues.Personal.ResumeFile.split(":")[1]
                  }`}
                >
                  Download Resume
                </a>
              </Button>
            )}
          </div>
        ) : (
          <div></div>
        )}
        <UploadButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box autoComplete="off">
            {disabled ? (
              <>
                <Box display="flex" justifyContent="center" alignItems="center">
                  {initialValues.Personal?.PhotoFile ? (
                    <img
                      src={`data:image/jpeg/png;base64,${initialValues.Personal.PhotoFile}`}
                      alt="photo_profile"
                      style={{ height: "200px" }}
                    />
                  ) : (
                    <img
                      src={avatar}
                      style={{ height: "200px" }}
                      alt="photo_profile"
                    />
                  )}
                </Box>
                <Box display="flex" justifyContent="center">
                  <Button
                    color="secondary"
                    variant="contained"
                    sx={{ marginTop: "10px" }}
                    onClick={() => changeDisable(!disabled)}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </>
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
                <Grid item md={5}>
                  <Controller
                    name={"Personal.Name"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={"Name*"}
                        fullWidth
                        size="small"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          readOnly: disabled,
                        }}
                        error={Boolean(errors.Personal?.Name)}
                        helperText={
                          errors.Personal?.Name
                            ? errors.Personal?.Name.message
                            : ""
                        }
                      />
                    )}
                  />
                  <br />
                  <Controller
                    name={"Personal.Gender"}
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormControl fullWidth>
                          <InputLabel
                            id="Gender"
                            color="secondary"
                            textAlign="center"
                          >
                            Gender
                          </InputLabel>

                          <Select
                            sx={{ marginTop: "15px" }}
                            {...field}
                            label={"Gender*"}
                            fullWidth
                            size="small"
                            color="secondary"
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              readOnly: disabled,
                            }}
                            error={Boolean(errors.Personal?.Gender)}
                            helperText={
                              errors.Personal?.Name
                                ? errors.Personal?.Name.message
                                : ""
                            }
                          >
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                          </Select>
                        </FormControl>
                      </>
                    )}
                  />
                  <br />
                  <Controller
                    name={"Personal.BirthDate"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        sx={{ marginTop: "25px" }}
                        size="small"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        label="Birth Date*"
                        value={dayjs(field.value?.BirthDate).format(
                          "YYYY-MM-DD"
                        )}
                        // onChange={e => field.onChange(e)}
                        {...field}
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          readOnly: disabled,
                        }}
                        error={Boolean(errors.Personal?.BirthDate)}
                        helperText={
                          errors.Personal?.BirthDate
                            ? errors.Personal?.BirthDate.message
                            : ""
                        }
                      />
                    )}
                  />

                  <br />
                  <Controller
                    name={"Personal.Domicile"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        sx={{ marginTop: "15px" }}
                        size="small"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        label="Domicile*"
                        name="Personal.Domicile"
                        {...field}
                        InputProps={{
                          readOnly: disabled,
                        }}
                        error={Boolean(errors.Personal?.Domicile)}
                        helperText={
                          errors.Personal?.Domicile
                            ? errors.Personal?.Domicile.message
                            : ""
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item md={1} />
                <Grid item md={5}>
                  <Controller
                    name={"Personal.Email"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        size="small"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        label="Email*"
                        name="Personal.Email"
                        {...field}
                        InputProps={{
                          readOnly: disabled,
                        }}
                        type="email"
                        error={Boolean(errors.Personal?.Email)}
                        helperText={
                          errors.Personal?.Email
                            ? errors.Personal?.Email.message
                            : ""
                        }
                      />
                    )}
                  />

                  <br />
                  <Controller
                    name={"Personal.TelephoneNo"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        size="small"
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        label="Phone*"
                        value={field.value.Personal?.TelephoneNo}
                        {...field}
                        InputProps={{
                          readOnly: disabled,
                        }}
                        error={Boolean(errors.Personal?.TelephoneNo)}
                        helperText={
                          errors.Personal?.TelephoneNo
                            ? errors.Personal?.TelephoneNo.message
                            : ""
                        }
                      />
                    )}
                  />
                  <Controller
                    name={"Personal.TotalWorkingExperience"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        margin="normal"
                        fullWidth
                        color="secondary"
                        id="TotalWorkingExperience"
                        label="Experience in Year"
                        variant="outlined"
                        size="small"
                        name="Personal.TotalWorkingExperience"
                        {...field}
                        InputProps={{
                          readOnly: disabled,
                        }}
                        type="number"
                      />
                    )}
                  />
                  <Controller
                    name={"Personal.SalaryExpectation"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        margin="normal"
                        color="secondary"
                        id="SalaryExpectation"
                        label="Salary Expectation"
                        variant="outlined"
                        size="small"
                        name="Personal.SalaryExpectation"
                        {...field}
                        InputProps={{
                          readOnly: disabled,
                        }}
                        type="number"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={1} />
              </Grid>
              <Grid item md={12}>
                {SkillSetField.map((SkillSet, index) => {
                  const handleDelete = () => {
                    if (window.confirm("Are you sure delete this data?")) {
                      SkillSetRemove(index);
                    }
                  };
                  return (
                    <div key={index}>
                      <Grid container>
                        <Grid item md={5}>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                margin="normal"
                                color="secondary"
                                label="Skill*"
                                variant="outlined"
                                size="small"
                                {...field}
                                InputProps={{
                                  readOnly: disabled,
                                }}
                                error={Boolean(errors.SkillSet?.Skill)}
                                helperText={
                                  errors.SkillSet?.Skill
                                    ? errors.SkillSet?.Skill.message
                                    : ""
                                }
                              />
                            )}
                            name={`SkillSet[${index}].Skill`}
                            control={control}
                          />
                        </Grid>
                        <Grid item md={1}>
                          {index === 0 ? (
                            <div />
                          ) : (
                            <Box>
                              {disabled ? (
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
                                    marginLeft: "15px",
                                  }}
                                  onClick={() => handleDelete()}
                                  InputProps={{
                                    readOnly: disabled,
                                  }}
                                >
                                  X
                                </Button>
                              )}
                            </Box>
                          )}
                        </Grid>
                        <Grid item md={5} />
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
                    disabled={SkillSetField.length >= 10}
                    onClick={() =>
                      SkillSetAppend({
                        Name: "",
                      })
                    }
                  >
                    Add SkillSet
                  </Button>
                )}
              </Grid>
            </Grid>
            <Typography
              variant="h6"
              fontFamily="Montserrat"
              sx={{ marginTop: "15px" }}
            >
              Education
            </Typography>
            <Typography variant="body2" color="#4D4D4D">
              *Maximum 3 Education
            </Typography>
            <div>
              {EducationField.map((values, idx) => {
                const handleDelete = () => {
                  if (window.confirm("Are you sure delete this data?")) {
                    EducationRemove(idx);
                  }
                };
                return (
                  <div key={idx}>
                    <Grid container spacing={2}>
                      <Grid item md={5}>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              fullWidth
                              margin="normal"
                              color="secondary"
                              label="Title*"
                              variant="outlined"
                              size="small"
                              {...field}
                              InputProps={{
                                readOnly: disabled,
                              }}
                              error={Boolean(errors?.Education?.[idx]?.Title)}
                              helperText={
                                errors?.Education?.[idx]?.Title
                                  ? errors?.Education?.[idx]?.Title.message
                                  : ""
                              }
                            />
                          )}
                          name={`Education[${idx}].Title`}
                          control={control}
                        />
                        <br />
                        <Controller
                          render={({ field }) => (
                            <TextField
                              fullWidth
                              margin="normal"
                              color="secondary"
                              label="Institution*"
                              variant="outlined"
                              size="small"
                              {...field}
                              InputProps={{
                                readOnly: disabled,
                              }}
                              error={Boolean(
                                errors?.Education?.[idx]?.Institution
                              )}
                              helperText={
                                errors?.Education?.[idx]?.Institution
                                  ? errors?.Education?.[idx]?.Institution
                                      .message
                                  : ""
                              }
                            />
                          )}
                          name={`Education[${idx}].Institution`}
                          control={control}
                        />
                        <br />
                        <Controller
                          render={({ field }) => (
                            <TextField
                              fullWidth
                              margin="normal"
                              color="secondary"
                              label="Major*"
                              variant="outlined"
                              size="small"
                              {...field}
                              InputProps={{
                                readOnly: disabled,
                              }}
                              error={Boolean(errors?.Education?.[idx]?.Major)}
                              helperText={
                                errors?.Education?.[idx]?.Major
                                  ? errors?.Education?.[idx]?.Major.message
                                  : ""
                              }
                            />
                          )}
                          name={`Education[${idx}].Major`}
                          control={control}
                        />
                      </Grid>
                      <Grid item md={1} />
                      <Grid item md={5}>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              fullWidth
                              margin="normal"
                              color="secondary"
                              label="Year In*"
                              variant="outlined"
                              size="small"
                              {...field}
                              InputProps={{
                                readOnly: disabled,
                              }}
                              type="number"
                              error={Boolean(errors?.Education?.[idx]?.YearIn)}
                              helperText={
                                errors?.Education?.[idx]?.YearIn
                                  ? errors?.Education?.[idx]?.YearIn.message
                                  : ""
                              }
                            />
                          )}
                          name={`Education[${idx}].YearIn`}
                          control={control}
                        />
                        <br />
                        <Controller
                          render={({ field }) => (
                            <TextField
                              fullWidth
                              margin="normal"
                              color="secondary"
                              label="Year Out*"
                              variant="outlined"
                              size="small"
                              {...field}
                              InputProps={{
                                readOnly: disabled,
                              }}
                              error={Boolean(errors?.Education?.[idx]?.YearOut)}
                              helperText={
                                errors?.Education?.[idx]?.YearOut
                                  ? errors?.Education?.[idx]?.YearOut.message
                                  : ""
                              }
                              type="number"
                            />
                          )}
                          name={`Education[${idx}].YearOut`}
                          control={control}
                        />
                        <br />
                        <Controller
                          render={({ field }) => (
                            <TextField
                              fullWidth
                              margin="normal"
                              color="secondary"
                              label="GPA*"
                              variant="outlined"
                              size="small"
                              {...field}
                              InputProps={{
                                readOnly: disabled,
                              }}
                              error={Boolean(errors?.Education?.[idx]?.GPA)}
                              helperText={
                                errors?.Education?.[idx]?.GPA
                                  ? errors?.Education?.[idx]?.GPA.message
                                  : ""
                              }
                            />
                          )}
                          name={`Education[${idx}].GPA`}
                          control={control}
                        />
                      </Grid>
                      <Grid item md={1}>
                        {idx === 0 ? (
                          <div />
                        ) : (
                          <Box>
                            {disabled ? (
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
                          </Box>
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
                  disabled={EducationField.length >= 3}
                  onClick={() =>
                    EducationAppend({
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

            {/* Organization */}
            <Typography
              variant="h6"
              fontFamily="Montserrat"
              sx={{ marginTop: "15px" }}
            >
              Organization
            </Typography>
            <Typography variant="body2" color="#4D4D4D">
              *Maximum 3 Organization
            </Typography>
            <div>
              {OrganizationField.map((values, idx) => {
                const handleDelete = () => {
                  if (window.confirm("Are you sure delete this data?")) {
                    OrganizationRemove(idx);
                  }
                };
                return (
                  <div key={idx}>
                    <Grid container>
                      <Grid container spacing={2}>
                        <Grid item md={5}>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                margin="normal"
                                color="secondary"
                                label="Organization"
                                variant="outlined"
                                size="small"
                                {...field}
                                InputProps={{
                                  readOnly: disabled,
                                }}
                              />
                            )}
                            name={`Organization[${idx}].Organization`}
                            control={control}
                          />
                          <br />
                          <Controller
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                margin="normal"
                                color="secondary"
                                label="Scope"
                                variant="outlined"
                                size="small"
                                {...field}
                                InputProps={{
                                  readOnly: disabled,
                                }}
                              />
                            )}
                            name={`Organization[${idx}].Scope`}
                            control={control}
                          />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={5}>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                margin="normal"
                                color="secondary"
                                label="Duration in Year"
                                variant="outlined"
                                size="small"
                                {...field}
                                InputProps={{
                                  readOnly: disabled,
                                }}
                                type="number"
                              />
                            )}
                            name={`Organization[${idx}].Duration`}
                            control={control}
                          />
                          <br />
                          <Controller
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                margin="normal"
                                color="secondary"
                                label="Position"
                                variant="outlined"
                                size="small"
                                {...field}
                                InputProps={{
                                  readOnly: disabled,
                                }}
                              />
                            )}
                            name={`Organization[${idx}].Position`}
                            control={control}
                          />
                        </Grid>
                        <Grid item md={1}>
                          {idx === 0 ? (
                            <div />
                          ) : (
                            <Box>
                              {disabled ? (
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
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item md={11}>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                size="small"
                                multiline
                                minRows={3}
                                color="secondary"
                                margin="normal"
                                variant="outlined"
                                label="Description"
                                InputProps={{
                                  readOnly: disabled,
                                }}
                                {...field}
                              />
                            )}
                            name={`Organization[${idx}].Description`}
                            control={control}
                          />
                        </Grid>
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
                  disabled={OrganizationField.length >= 3}
                  onClick={() =>
                    OrganizationAppend({
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
            {/* Work Experience */}
            <Typography
              variant="h6"
              fontFamily="Montserrat"
              sx={{ marginTop: "15px" }}
            >
              Work Experience
            </Typography>
            <Typography variant="body2" color="#4D4D4D">
              *Maximum 3 work experience
            </Typography>
            <div>
              {WorkExperienceField.map((values, idx) => {
                const handleDelete = () => {
                  if (window.confirm("Are you sure delete this data?")) {
                    WorkExperienceRemove(idx);
                  }
                };
                return (
                  <div key={idx}>
                    <Grid container>
                      <Grid container spacing={2}>
                        <Grid item md={5}>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                size="small"
                                color="secondary"
                                margin="normal"
                                variant="outlined"
                                label="Company Name"
                                InputProps={{
                                  readOnly: disabled,
                                }}
                                {...field}
                              />
                            )}
                            name={`WorkExperience[${idx}].CompanyName`}
                            control={control}
                          />
                          <br />
                          <Controller
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                size="small"
                                color="secondary"
                                margin="normal"
                                variant="outlined"
                                label="Position"
                                InputProps={{
                                  readOnly: disabled,
                                }}
                                {...field}
                              />
                            )}
                            name={`WorkExperience[${idx}].Position`}
                            control={control}
                          />

                          <br />
                          <Controller
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                size="small"
                                color="secondary"
                                margin="normal"
                                variant="outlined"
                                label="Level"
                                InputProps={{
                                  readOnly: disabled,
                                }}
                                {...field}
                              />
                            )}
                            name={`WorkExperience[${idx}].Level`}
                            control={control}
                          />
                        </Grid>
                        <Grid item md={1} />
                        <Grid item md={5}>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                size="small"
                                color="secondary"
                                margin="normal"
                                variant="outlined"
                                label="Industry"
                                InputProps={{
                                  readOnly: disabled,
                                }}
                                {...field}
                              />
                            )}
                            name={`WorkExperience[${idx}].Industry`}
                            control={control}
                          />

                          <br />

                          <Controller
                            name={`WorkExperience[${idx}].YearIn`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                size="small"
                                color="secondary"
                                margin="normal"
                                variant="outlined"
                                label="Start Date"
                                InputProps={{
                                  readOnly: disabled,
                                }}
                                type="date"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={dayjs(
                                  field.value?.WorkExperience?.[idx].YearIn
                                ).format("YYYY-MM-DD")}
                                {...field}
                              />
                            )}
                          />

                          <br />
                          <Controller
                            name={`WorkExperience[${idx}].YearOut`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                size="small"
                                color="secondary"
                                margin="normal"
                                variant="outlined"
                                label="End Date"
                                InputProps={{
                                  readOnly: disabled,
                                }}
                                type="date"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={dayjs(
                                  field.value?.WorkExperience?.[idx].YearOut
                                ).format("YYYY-MM-DD")}
                                {...field}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item md={1}>
                          {idx === 0 ? (
                            <div />
                          ) : (
                            <Box>
                              {disabled ? (
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
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item md={11}>
                          <Controller
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                size="small"
                                multiline
                                minRows={3}
                                color="secondary"
                                margin="normal"
                                variant="outlined"
                                label="Description"
                                InputProps={{
                                  readOnly: disabled,
                                }}
                                {...field}
                              />
                            )}
                            name={`WorkExperience[${idx}].Description`}
                            control={control}
                          />
                        </Grid>
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
                  disabled={WorkExperienceField.length >= 3}
                  color="secondary"
                  onClick={() =>
                    WorkExperienceAppend({
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
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              {disabled ? (
                <div />
              ) : (
                <>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => changeDisable(!disabled)}
                    sx={{ marginRight: "20px" }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    // onClick={() => changeDisable(!disabled)}
                  >
                    Submit
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </form>
      </Box>
    </MyComponent>
  );
};

export default ViewProfileForm;
