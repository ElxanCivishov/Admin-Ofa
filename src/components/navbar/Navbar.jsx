import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { RequestLogout } from "../../config/newReguest";
import { MdMenu } from "react-icons/md";
import noImage from "/img/noImage.png";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  MenuItem,
} from "@mui/material";

import "./navbar.scss";

const Navbar = ({ openSidebar, setOpenSidebar }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const { user } = currentUser;

  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await RequestLogout()
      .then(() => {
        localStorage.setItem("currentUser", null);
        toast.success("Çıxış tamamlandı.");
        navigate("/login");
      })
      .catch((err) => toast.error(err?.response?.data?.message));
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: "rgb(15, 179, 45)" }}>
      <Container maxWidth="xxl">
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
              {/* <span>Elxan Civishov</span> */}
            </div>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="photo" src={user.profile_photo_url || noImage} />
              </IconButton>
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
