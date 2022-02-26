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
import logo from "../../../../asset/icon/logo.svg";

import jwt_decode from "jwt-decode";
import LogoutButton from "../../logout/LogoutButton";
const pages = ["Home", "About Us", "Program / Certificate"];
const pageLink = ["/", "/about", "/vacancy"];
const settings = ["Profile", "Upload CV", "Status", "Logout"];
const settingsLink = ["/profil", "/dashboard", "/status", "/logout"];
const settingsRecruiter = ["Recruiter Page", "Dashboard", "Logout"];
const settingsLinkRecruiter = ["/recruiter", "/dashboard", "/logout"];

const NavbarCompontent = () => {
  const data = React.useContext(RootContext);

  if (data.userInfo) {
    settings[0] = settingsRecruiter[0];
    settingsLink[0] = settingsLinkRecruiter[0];
    let userInfo = jwt_decode(data.userInfo);
  }
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
    <AppBar position="static" style={{ background: "#CAFDFF" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <img
              src={logo}
              alt="logo-tca"
              style={{ height: "75px", width: "75px" }}
            />
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
                <MenuItem key={page} onClick={()=> handleCloseNavMenu(navigate(pageLink[index]))}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
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
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              
              <Button
                key={page}
                onClick={() => navigate(pageLink[index])}
                sx={{ my: 2, color: "#343434", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!data.userInfo ? (
              // <>
              //   <Button onClick={() => navigate("/login")}>Login</Button> |{" "}
              //   <Button onClick={() => navigate("/register")}>register</Button>{" "}
              // </>
              <div />
            ) : (
              <Tooltip title="Open settings">
                {/* <Button></Button> */}
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
        <hr 
        style={{color:"#ADDEE1"}}
        />
      </Container>
    </AppBar>
  );
};
export default NavbarCompontent;
