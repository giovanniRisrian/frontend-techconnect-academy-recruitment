import * as React from "react";
import { Typography } from "@mui/material";
import { RootContext } from "../../../../App";

export default function ListRecruiter({ bloc }) {
  const data = React.useContext(RootContext);

  let { allRecruiter, deleteRecruiterbyId, listRecruiter, recruiterById } =
    bloc();

  React.useEffect(() => {
    allRecruiter(data);
  }, []);

  console.log("cobaa", listRecruiter);
  return (
    <>
      <Typography
        variant="h3"
        fontFamily="Montserrat"
        textAlign="center"
        sx={{ paddingTop: "2%" }}
      >
        List Recruiter
      </Typography>
    </>
  );
}
