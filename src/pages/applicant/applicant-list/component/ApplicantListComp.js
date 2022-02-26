import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Button,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import background from "../../../../asset/image/background.jpg";

const MyComponent = styled("div")({
  backgroundImage: `url(${background})`,
  backgroundSize: "contain",
  minHeight: "100vh",
});

const ApplicantListComp = ({ bloc }) => {
  const { applicantList, getListApplicant, handleSeeDetail } = bloc();
  React.useEffect(() => {
    getListApplicant();
  }, []);

  return (
    <MyComponent>
      <>
        {/* Start of Header */}
        <Grid container sx={{ paddingTop: 5 }}>
          <Grid item md={3} />
          <Grid item md={6} sm={12} xs={12}>
            <Typography
              component="div"
              textAlign="center"
              gutterBottom
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
              <Box sx={{ letterSpacing: 6 }}>Techconnect Academy</Box>
            </Typography>
            <Grid item md={3} />
          </Grid>
        </Grid>
        {/* End of header */}

        {/* Start of filter */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            p: 1,
            m: 1,
            borderRadius: 1,
          }}
        >
          <Button variant="contained" color="secondary">
            Program 1
          </Button>
          <Button variant="contained" color="secondary">
            Program 2
          </Button>
          <Button variant="contained" color="secondary">
            Program 3
          </Button>
          <Button variant="contained" color="secondary">
            Program 4
          </Button>
        </Box>
        {/* End of filter */}

        {/* Start of Table */}
        <Grid container sx={{ mt: 5 }}>
          <Grid item md={1} />
          <Grid item md={10}>
            <TableContainer sx={{ width: "100%" }}>
              <Table aria-label="">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography sx={{ fontWeight: "medium" }}>
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontWeight: "medium" }}>Age</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontWeight: "medium" }}>
                        College
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontWeight: "medium" }}>GPA</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontWeight: "medium" }}>
                        Working Experience
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontWeight: "medium" }}>
                        Program
                      </Typography>
                    </TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applicantList.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography sx={{ fontWeight: "medium" }}>
                          {row.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontWeight: "medium" }}>
                          {row.age}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontWeight: "medium" }}>
                          {row.college}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontWeight: "medium" }}>
                          {row.gpa}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontWeight: "medium" }}>
                          {row.work}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontWeight: "medium" }}>
                          {row.program}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          color="secondary"
                          onClick={() => handleSeeDetail(row.id)}
                        >
                          See Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack spacing={2}>
              <Pagination
                count={10}
                color="secondary"
                size="large"
                sx={{ mt: 1, marginX: "auto", marginBottom: 10 }}
              />
            </Stack>
          </Grid>
        </Grid>
        {/* End of Table */}
      </>
    </MyComponent>
  );
};

export default ApplicantListComp;
