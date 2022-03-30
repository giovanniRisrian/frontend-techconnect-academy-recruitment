import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { RootContext } from "../../../../App";
import logo from "../../../../asset/image/logo.png";
import jwt_decode from "jwt-decode";
import avatar from "../../../../asset/image/avatar.png";
import LogoutButton from "../../logout/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRegistered,
  faRightFromBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Divider } from "@mui/material";

let pages = [
  "Home",
  "About Us",
  "Program / Certificate",
  // "Reccomendation Program/Certificate",
  // "Status",
];
let pageLink = [
  "/",
  "/about",
  "/vacancy",
  // "/applicant/reccomendation",
  // "/applicant/status",
];
let settings = ["Profile", "Logout"];
let settingsLink = ["/applicant/profile", "/logout"];

// Applicant configuration
let pagesApplicant = [
  "Home",
  "About Us",
  "Program / Certificate",
  "Reccomendation Program/Certificate",
];
let pageLinkApplicant = [
  "/",
  "/about",
  "/vacancy",
  "/applicant/reccomendation",
];

// Recruiter Configuration
let pagesRecruiter = ["Home", "About Us", "Program / Certificate", "Dashboard"];
let pageLinkRecruiter = ["/", "/about", "/vacancy", "/recruiter"];
let settingsRecruiter = ["Logout"];
let settingsLinkRecruiter = ["/logout"];
let photo = localStorage.getItem("photo");
let srcPhoto;
if (photo) {
  srcPhoto = "data:image/jpeg/png;base64," + photo;
} else {
  srcPhoto = null;
}
// Admin Configuration
let pagesAdmin = [
  "Home",
  "About Us",
  "Program / Certificate",
  "List Recruiter",
  "Register Recruiter",
];
let pageLinkAdmin = [
  "/",
  "/about",
  "/vacancy",
  "/administrator/list/recruiter",
  "/administrator/register/recruiter",
];
let settingAdmin = ["Logout"];
let settingsLinkAdmin = ["/logout"];
const NavbarCompontent = () => {
  const data = React.useContext(RootContext);

  if (data.userInfo) {
    let userInfo = jwt_decode(data.userInfo);

    console.log(userInfo);
    if (userInfo.Role === "recruiter") {
      settings = settingsRecruiter;
      settingsLink = settingsLinkRecruiter;
      pages = pagesRecruiter;
      pageLink = pageLinkRecruiter;
    } else if (userInfo.Role === "administrator") {
      settings = settingAdmin;
      settingsLink = settingsLinkAdmin;
      pages = pagesAdmin;
      pageLink = pageLinkAdmin;
    } else {
      pages = pagesApplicant;
      pageLink = pageLinkApplicant;
    }
  }
  console.log();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: "white" ,borderBottomLeftRadius:50,borderBottomRightRadius:50,position:"absolute"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" }, textShadow: 3 }}
          >
             <Button
                onClick={() => navigate('/')}
                sx={{
                  my: "auto",
                  color: "#8645FF",
                  display: "block",
                  fontFamily:"Arial,  sans-serif",
                  // backgroundColor: "#171059",
                  marginLeft: "10%",
                  borderRadius: "10px",
                  // borderRight: "0.01em solid white",
                  // borderTopRightRadius: "0",
                  // borderBottomRightRadius: "0",
                  // padding: "0.1em",
                  // height: "120%",
                }}
              >
                {/* <p>TCA Recruitment</p> */}
            <img
              src={logo}
              alt="logo-tca"
              style={{
                height: "60px",
                width: "80px",
                boxShadow: 3,
              }}
            /></Button>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={page}
                  onClick={() => handleCloseNavMenu(navigate(pageLink[index]))}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <Typography
            variant="h6"
            noWrap
            color="#343434"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <img
              src={logo}
              alt="logo-tca"
              style={{ height: "50px", width: "50px" }}
            />
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              // <Box>
              <Button
                key={page}
                onClick={() => navigate(pageLink[index])}
                sx={{
                  my: "auto",
                  color: "#8645FF",
                  display: "block",
                  fontFamily:"Arial,  sans-serif",
                  // backgroundColor: "#F5F5F5",
                  marginLeft: "10px",
                  // borderRight: "0.01em solid white",
                  // borderTopRightRadius: "0",
                  // borderBottomRightRadius: "0",
                  // padding: "0.1em",
                  // height: "120%",
                }}
              >
                <strong>
                {page}</strong>
                {/* <Box
                    sx={{
                      my: "auto",
                      borderRight: "0.01em solid white",
                      padding: "0.1em",
                      height: "100px",
                    }}
                  /> */}
              </Button>
              // </Box>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!data.userInfo ? (
              <Box display="flex" justifyContent="center">
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate("/login")}
                  sx={{
                    color: "#8645FF",
                    marginRight: "10px",
                    borderColor: "#8645FF",
                    borderRadius: "15px",
                    fontWeight: "600",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    style={{ marginRight: "10px" }}
                  />
                  Login
                </Button>{" "}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/register")}
                  sx={{
                    backgroundColor: "#8645FF",
                    borderRadius: "15px",
                    fontWeight: "600",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    style={{ marginRight: "10px" }}
                  />
                  register
                </Button>{" "}
              </Box>
            ) : (
              <Tooltip title="Open settings">
                {/* <Button></Button> */}
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={photo ? srcPhoto : avatar} />
                </IconButton>
              </Tooltip>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting === "Logout" ? (
                    <LogoutButton />
                  ) : (
                    <Typography
                      textAlign="center"
                      onClick={() => navigate(settingsLink[index])}
                    >
                      {setting}
                    </Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        {/* <hr 
        style={{color:"#ADDEE1"}}
        /> */}
      </Container>
    </AppBar>
  );
};
export default NavbarCompontent;
