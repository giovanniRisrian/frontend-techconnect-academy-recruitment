import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendar,
  faLocationDot,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { LoadingButton } from "@mui/lab";
import {
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const steps = [
  "Administration",
  "Assesment",
  "Interview",
  "Offering Letter",
  "Welcome to SMM",
];
export default function BasicModal({ open, status, handleClose, loading }) {
  let active = 0;

  const handleActive = () => {
    if (status?.ApplyProcess?.SelectionProcessId === 1) {
      active = 0;
    } else if (status?.ApplyProcess?.SelectionProcessId === 2) {
      active = 1;
    } else if (status?.ApplyProcess?.SelectionProcessId === 3) {
      active = 2;
    } else if (status?.ApplyProcess?.SelectionProcessId === 4) {
      active = 3;
    } else if (status?.ApplyProcess?.SelectionProcessId === 5) {
      active = 4;
    } else if (status?.ApplyProcess?.SelectionProcessId === 6) {
      active = 5;
    }
    return active;
  };
  return (
    <>
      {loading ? (
        <LoadingButton loading={true} />
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <DialogTitle id="alert-dialog-title">
            {status.ProgramPost?.ProgramName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box display="flex" marginLeft="10px">
                <FontAwesomeIcon icon={faTags} style={{ marginTop: "4px" }} />
                <Typography
                  color="#343434"
                  gutterBottom
                  sx={{ marginLeft: "10px" }}
                >
                  {status.ProgramPost?.ProgramTypeName.toUpperCase()}
                </Typography>
              </Box>
              <Box display="flex" marginLeft="10px">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ marginTop: "4px" }}
                />
                <Typography
                  color="#343434"
                  gutterBottom
                  sx={{ marginLeft: "10px" }}
                >
                  {status.ProgramPost?.ProgramLocation?.Address}
                </Typography>
              </Box>
              <Box display="flex" marginLeft="10px">
                <FontAwesomeIcon icon={faCalendar} />
                <Typography color="#343434" sx={{ marginLeft: "10px" }}>
                  {dayjs(status.ProgramPost?.ProgramActivity?.OpenDate).format(
                    "DD/MM/YYYY"
                  )}
                  <span>-</span>
                  {dayjs(status.ProgramPost?.ProgramActivity?.CloseDate).format(
                    "DD/MM/YYYY"
                  )}
                </Typography>
              </Box>
              <Box sx={{ marginTop: "20px" }}>
                <Stepper activeStep={handleActive()}>
                  {steps.map((label, index) => (
                    <Step key={label} sx={{ fontSize: "16px" }}>
                      <StepLabel
                      >
                        {label}{" "}
                        {status.ApplyProcess?.Accepted === "Rejected" ? (
                          index === active ? (
                            <div style={{ color: "red" }}>Rejected</div>
                          ) : (
                            <></>
                          )
                        ) : (
                          <> </>
                        )}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleClose} sx={{backgroundColor:'#8645FF', color:'white'}}>
            <FontAwesomeIcon icon={faArrowLeft} style={{marginRight:'10px'}}/>

              Back
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
