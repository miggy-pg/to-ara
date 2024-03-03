<<<<<<< HEAD
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

=======
>>>>>>> 886ab8f (fix: page filters)
import {
  Box,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";

import useProtectedInfo from "../../../hooks/useProtectedInfo";
<<<<<<< HEAD
=======
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
>>>>>>> 886ab8f (fix: page filters)

export default function UserBox({
  handleOnClickProfileMenu,
  anchorProfileMenu,
  handleCloseProfileMenu,
}) {
  const { logout } = useProtectedInfo();
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleOnClickProfileMenu}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            src={"userimg"}
            alt={"userimg"}
            sx={{
              width: "30px",
              height: "30px",
            }}
          />
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorProfileMenu}
        keepMounted
        open={Boolean(anchorProfileMenu)}
        onClose={handleCloseProfileMenu}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "250px",
            right: 0,
            top: "70px !important",
          },
        }}
      >
        <Link
          to="/user/account/profile"
          style={{ textDecoration: "none", color: "black" }}
        >
          <MenuItem>
            <Avatar
              sx={{
                width: "35px",
                height: "35px",
              }}
            />
            <Box
              sx={{
                ml: 2,
              }}
            >
              My account
            </Box>
          </MenuItem>
        </Link>
        <Divider />
        {isAdmin ? (
          <>
            <Link
              to={`${
                window.location.pathname.includes("dashboard")
                  ? "/"
                  : "/dashboard"
              }`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>
                <ListItemIcon>
                  <DashboardIcon fontSize="small" />
                </ListItemIcon>
                {`${
                  window.location.pathname.includes("dashboard")
                    ? "Pages"
                    : "Dashboard"
                }`}
              </MenuItem>
            </Link>
            <Divider />
          </>
        ) : null}

        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
