import { useContext } from "react";
import { RootContext } from "../../../../App";
import * as React from "react";
import { styled } from "@mui/material/styles";
import {Button, Box} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
// import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import Stack from "@mui/material/Stack";
const UploadButtonComponent = ({ bloc }) => {
  const { doUpload, loading } = bloc();
  const Input = styled("input")({
    display: "none",
  });

  const [info, setInfo] = React.useState({
    summary: {
      text: "",
      phone_number: [""],
      email: [""],
      website: [""],
      skill: [""],
      address: [""],
      academic: [""],
      gpa: [""],
      experience: [""],
    },
    match_score: null,
  });
  const data = useContext(RootContext);
  const handleUpload = (e) => {
    // doUpload(data);
    // console.log(e.target.value);
    doUpload({ file: e.target.files[0] }, data, setInfo);
  };
  return (
    <>
      <br></br>
     {loading ?  
     <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          >

          <LoadingButton
            loading={loading}
            loadingPosition="center"
          >
            Loading
          </LoadingButton>
          </Box> : 
       <label htmlFor="contained-button-file">
        <Input
          accept="image/pdf/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleUpload}
        />
        <Button variant="contained" color="secondary" component="span">
        <FontAwesomeIcon icon={faFileUpload} style={{marginRight:'5px'}} />
          Upload Resume
        </Button>
      </label>
      }
    </>
  );
};
export default UploadButtonComponent;
