import * as React from "react";
import {
  Box,
  LinearProgress,
  Divider,
  Typography,
  Grid,
  Button,
  TextField,
  Modal,
} from "@mui/material";
import { RootContext } from "../../../../App";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from "../../../globalComponent/footer/Footer";
import notfound from "../../../../asset/image/no-data.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../../../asset/icon/logo.svg";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function CustomNoRowsOverlay() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <img
        width="120"
        height="100"
        // viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
        src={notfound}
        alt={""}
      ></img>
      <Box sx={{ mt: -1 }}>No Data Recruiter</Box>
    </Box>
  );
}

export default function ListRecruiter({ bloc }) {
  const data = React.useContext(RootContext);
  let {
    allRecruiter,
    deleteRecruiterbyId,
    listRecruiter,
    isLoading,
    pageSize,
    setPageSize,
    modalRegister,
    setModalRegister,
    modalUpdate,
    setModalUpdate,
    doRegisterRecruiter,
    recruiterById,
    updateRecruiterById,
    setId,
  } = bloc();

  //useFormRegister
  let initialValueRegister = {
    fullname: "",
    email: "",
    password: "",
  };

  const validationRegister = Yup.object({
    email: Yup.string()
      .required("This field is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("This field is required")
      .min(6, "minimum 6 characters"),
    fullname: Yup.string()
      .required("This field is required")
      .min(6, "minimum 6 characters"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationRegister),
    defaultValues: initialValueRegister,
  });

  // Formik Register
  // const formikRegister = useFormik({
  //   initialValues: {
  //     fullname: "",
  //     email: "",
  //     password: "",
  //   },
  //   validationSchema: Yup.object({
  //     email: Yup.string()
  //       .required("This field is required")
  //       .email("Invalid email format"),
  //     password: Yup.string()
  //       .required("This field is required")
  //       .min(5, "minimum 6 characters"),
  //     fullname: Yup.string()
  //       .required("This field is required")
  //       .min(5, "minimum 6 characters"),
  //   }),
  //   onSubmit: () => {
  //     handleRegisterFront();
  //   },
  // });

  // const handleRegisterFront = () => {
  //   console.log(val);
  //   doRegisterRecruiter(formikRegister, data);
  // };
  const onSubmit = (val) => {
    // console.log(val);
    doRegisterRecruiter(val, data);
  };

  // Formik Update
  const formikUpdate = useFormik({
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
      handleUpdateFront();
      // navigateTo("/administrator/list/recruiter");
    },
  });

  // Columns configuration
  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      valueGetter: (params) => {
        return params?.row?.fullname;
      },
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      valueGetter: (params) => {
        return params?.row?.email;
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 250,
      type: "dateTime",
      valueGetter: (params) => {
        return params?.row?.CreatedAt && new Date(params?.row?.CreatedAt);
      },
    },
    {
      field: "delete",
      headerName: "Actions",
      type: "actions",
      minWidth: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => confirmDelete(params?.row)}
        />,
      ],
    },
  ];

  const getDataById = async (id) => {
    setModalUpdate(true);
    setId(id);
    const res = await recruiterById(id, data);
    
    formikUpdate.values.fullname = res.fullname;
    formikUpdate.values.email = res.email;
    formikUpdate.setFieldValue();
  };

  const handleUpdateFront = () => {
    updateRecruiterById(formikUpdate, data);
  };

  const confirmDelete = (dataDelete) => {
    console.log("data delete", dataDelete);
    if (window.confirm(`Are you sure to delete ${dataDelete.fullname}?`)) {
      deleteRecruiterbyId(dataDelete.ID, data);
    }
  };

  React.useEffect(() => {
    allRecruiter(data);
  }, []);

  return (
    <>
      {/* Start of Header */}
      <Grid container sx={{ marginTop: '8%' }}>
        <Grid item md={3} />
        <Grid item md={6} sm={12} xs={12}>
          <Typography
            component="div"
            textAlign="center"
            gutterBottom
            color="white"
            sx={{
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
            <Box
              sx={{
                letterSpacing: 6,
                boxShadow: 3,
                backgroundColor: "#171059",
                borderRadius: "15px",
                height: "10vh",
              }}
            >
              List of Recruiter
            </Box>
          </Typography>
          <Grid item md={3} />
        </Grid>
      </Grid>

      {/* Start of Register Recruiter */}
      <Modal open={modalRegister}>
        <Box
          sx={{
            marginX: "20%",
            boxShadow: 3,
            paddingX: "20px",
            marginTop: "2%",
            paddingBottom: "5%",
            ...style,
          }}
        >
          {/* <form onSubmit={formikRegister.handleSubmit}> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography textAlign="center">
              <img
                src={logo}
                style={{ width: "120px", height: "200px" }}
                alt="logo-tca"
              />
            </Typography>
            <Box mt={-7} mb={3}>
              <Typography
                textAlign="center"
                color="gray"
                variant="h5"
                component="div"
                gutterBottom
              >
                Register Recruiter Account
              </Typography>
            </Box>
            <Controller
              name={"fullname"}
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{marginBottom:'3%'}}
                  fullWidth
                  color="primary"
                  id="fullname"
                  label="Fullname"
                  variant="outlined"
                  size="small"
                  name="fullname"
                  {...field}
                  error={Boolean(errors.fullname)}
                  // helperText={errors.fullname}
                  helperText={errors.fullname ? errors.fullname?.message : ""}
                />
              )}
            ></Controller>
            {/* <TextField
              variant="outlined"
              color="primary"
              className="form-control cardForm text-center"
              type="text"
              name="fullname"
              label="Name"
              value={formikRegister.values.fullname || ""}
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
            />
            <p className="warning">
              {formikRegister.errors.fullname &&
              formikRegister.touched.fullname ? (
                <small style={{ color: "red" }} className="text-danger">
                  {formikRegister.errors.fullname}
                </small>
              ) : null}
            </p> */}

            {/* <TextField
              variant="outlined"
              color="primary"
              className="form-control cardForm text-center"
              type="email"
              name="email"
              label="Email"
              value={formikRegister.values.email || ""}
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
            />
            <p className="warning">
              {formikRegister.errors.email && formikRegister.touched.email ? (
                <small style={{ color: "red" }} className="text-danger">
                  {formikRegister.errors.email}
                </small>
              ) : null}
            </p> */}

            <Controller
              name={"email"}
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  sx={{marginBottom:'3%'}}
                  color="primary"
                  id="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  name="email"
                  {...field}
                  error={Boolean(errors.email)}
                  helperText={errors.email ? errors.email?.message : ""}
                />
              )}
            ></Controller>

            {/* <TextField
              variant="outlined"
              color="primary"
              className="form-control cardForm text-center"
              type="password"
              name="password"
              label="Password"
              value={formikRegister.values.password || ""}
              onChange={formikRegister.handleChange}
              onBlur={formikRegister.handleBlur}
            />
            <p className="warning">
              {formikRegister.errors.password &&
              formikRegister.touched.password ? (
                <small style={{ color: "red" }} className="text-danger">
                  {formikRegister.errors.password}
                </small>
              ) : null}
            </p> */}

            <Controller
              name={"password"}
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  sx={{marginBottom:'3%'}}
                  type="password"
                  color="primary"
                  id="password"
                  label="Password"
                  variant="outlined"
                  size="small"
                  name="password"

                  error={Boolean(errors.password)}
                  {...field}
                  helperText={errors.password ? errors.password?.message : ""}
                  
                />
              )}
            ></Controller>
            <Box display="flex" justifyContent="center">
              <Button
                variant="outlined"
                sx={{ marginRight: "5%" }}
                color="primary"
                textAlign="center"
                onClick={() => {
                  setModalRegister(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                value="submit"
                color="primary"
                textAlign="center"
                // disabled={!(formikRegister.isValid && formikRegister.dirty)}
                marginLeft="20px"
              >
                SUBMIT
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      {/* End of Register Recruiter */}

      {/* Start of Update Recruiter */}
      <Modal open={modalUpdate}>
        <Box
          sx={{
            marginX: "20%",
            boxShadow: 3,
            paddingX: "20px",
            marginTop: "2%",
            paddingBottom: "5%",
            ...style,
          }}
        >
          <form onSubmit={formikUpdate.handleSubmit}>
            <Typography textAlign="center">
              <img
                src={logo}
                style={{ width: "120px", height: "200px" }}
                alt="logo-tca"
              />
            </Typography>
            <Box mt={-7} mb={3}>
              <Typography
                textAlign="center"
                color="gray"
                variant="h5"
                component="div"
                gutterBottom
              >
                Edit Recruiter Account
              </Typography>
            </Box>

            <TextField
              variant="outlined"
              color="primary"
              className="form-control cardForm text-center"
              type="text"
              name="fullname"
              label="Name"
              value={formikUpdate.values.fullname || ""}
              onChange={formikUpdate.handleChange}
              onBlur={formikUpdate.handleBlur}
            />
            <p className="warning">
              {formikUpdate.errors.fullname && formikUpdate.touched.fullname ? (
                <small style={{ color: "red" }} className="text-danger">
                  {formikUpdate.errors.fullname}
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
              value={formikUpdate.values.email || ""}
              onChange={formikUpdate.handleChange}
              onBlur={formikUpdate.handleBlur}
            />
            <p className="warning">
              {formikUpdate.errors.email && formikUpdate.touched.email ? (
                <small style={{ color: "red" }} className="text-danger">
                  {formikUpdate.errors.email}
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
                  setModalUpdate(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                value="submit"
                color="primary"
                textAlign="center"
                disabled={!(formikUpdate.isValid && formikUpdate.dirty)}
                marginLeft="20px"
              >
                SUBMIT
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      {/* End of Update Recruiter */}

      {/* Start of Table */}
      <Box sx={{ height: 500, width: "80%", marginX: "auto", marginY: 3 }}>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box>
              <Button
                variant="contained"
                onClick={() => setModalRegister(true)}
              >
                Add Recruiter
              </Button>
            </Box>
            <DataGrid
              loading={isLoading}
              rows={listRecruiter}
              columns={columns}
              getRowId={(row) => row.ID}
              onRowClick={(params) => getDataById(params?.row?.ID)}
              pagination
              pageSize={pageSize}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              onPageSizeChange={(newPage) => setPageSize(newPage)}
              componentsProps={{}}
              components={{
                Toolbar: CustomToolbar,
                LoadingOverlay: LinearProgress,
                NoRowsOverlay: CustomNoRowsOverlay,
              }}
            />
          </Box>
        </Box>
      </Box>
      {/* End of Table */}
      <Footer />
    </>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "30%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CustomToolbar(props) {
  return (
    <GridToolbarContainer>
      <GridToolbarDensitySelector />
      <Divider orientation="vertical" />
      <GridToolbarFilterButton />
      <Divider orientation="vertical" />
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  );
}
