import { useContext } from "react";
import { RootContext } from "../../../../App";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import Stack from "@mui/material/Stack";
const UploadButtonComponent = ({ bloc }) => {
  const { doUpload } = bloc();
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
    console.log(e.target.value);
    doUpload({ file: e.target.files[0] }, data, setInfo);
  };
  return (
    <>
      <br></br>
      <label htmlFor="contained-button-file">
        <Input
          accept="image/pdf/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleUpload}
        />
        <Button variant="contained" component="span">
          Upload Resume
        </Button>
      </label>
      <div>
        match_score : {info.match_score}
        <br></br>Information : <br/>{info.summary.text}<br/>
      {/* <br/><br/>email :<br/> {info.summary.email}<br/>GPA : <br/>{info.summary.gpa} <br/> Skill : <br/>{info.summary.skill} */}
      </div>
      <br></br>
      {/* <button onClick={handleUpload}>Upload</button> */}
    </>
  );
};
export default UploadButtonComponent;
