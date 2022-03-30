import * as React from "react";
import { Box, LinearProgress, Divider, Typography, Grid } from "@mui/material";
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
import notfound from "../../../../asset/image/no-data.png"


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
    handleClickRow,
    isLoading,
  } = bloc();

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

  const confirmDelete = (dataDelete) => {
    console.log("data delete", dataDelete);
    if (window.confirm(`Are you sure to delete ${dataDelete.fullname}?`)) {
      deleteRecruiterbyId(dataDelete.ID, data);
    }
  };

  React.useEffect(() => {
    allRecruiter(data);
  }, []);

  // console.log("cobaa", listRecruiter);
  return (
    <>
      {/* Start of Header */}
      <Grid container sx={{ marginTop: 5 }}>
        <Grid item md={3} />
        <Grid item md={6} sm={12} xs={12}>
          <Typography
            component="div"
            textAlign="center"
            gutterBottom
            color='white'
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
            <Box sx={{ letterSpacing: 6, boxShadow:3, backgroundColor:'#171059', borderRadius:'15px', height:'10vh' }}>List of Recruiter</Box>
          </Typography>
          <Grid item md={3} />
        </Grid>
      </Grid>

      {/* Start of Table */}
      <Box sx={{ height: 500, width: "80%", marginX: "auto", marginY: 10 }}>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box sx={{ flexGrow: 1 }}>
            <DataGrid
              loading={isLoading}
              rows={listRecruiter}
              columns={columns}
              getRowId={(row) => row.ID}
              onRowClick={(params) => handleClickRow(params?.row?.ID)}
              // pagination
              // pageSize={pageSize}
              // rowsPerPageOptions={[5, 10, 20]}
              // onPageSizeChange={(newPage) => setPageSize(newPage)}
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
