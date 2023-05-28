import { useState } from "react";
import "./navbar.scss";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material";

import noImage from "/img/noImage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import newRequest from "../../config/newReguest";

import { MdMenu } from "react-icons/md";

const Navbar = ({ openSidebar, setOpenSidebar }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    localStorage.removeItem("currentUser");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  const setAuthorizationToken = (token) => {
    axios.defaults.headers.common["Authorization"] = token;
  };

  const handleTest = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const { token } = currentUser;
    setAuthorizationToken(token);
    try {
      const response = await newRequest.post("/logout", {
        token,
      });
    } catch (error) {
      alert("auth", error);
    }
  };
  return (
    <AppBar position="sticky" style={{ backgroundColor: "rgb(15, 179, 45)" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          className="justify-content-between align-items-center"
        >
          <IconButton
            color="inherit"
            onClick={() => setOpenSidebar(!openSidebar)}
            edge="start"
            sx={{ mr: 2, cursor: "pointer" }}
          >
            <MdMenu />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <div className="profile">
              <p>Admin</p>
              <span>Elxan Civishov</span>
            </div>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profili aç">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={noImage} />
                </IconButton>
              </Tooltip>
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
                <MenuItem onClick={() => handleTest()}>
                  <Typography textAlign="center">Profil</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleLogout()}>
                  <Typography textAlign="center">Çıxış</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
