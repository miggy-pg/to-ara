import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { AppBar, Box, Toolbar, Button } from "@mui/material";

import UserBox from "../UserBox";

export default function Navbar(props) {
  const { sx } = props;

  // Close/Open dropdown profile menu in the header
  const [anchorProfileMenu, setAnchorProfileMenu] = useState(null);

  const handleOnClickProfileMenu = (event) => {
    setAnchorProfileMenu(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setAnchorProfileMenu(null);
  };

  const { isAuth } = useSelector((state) => state.auth);

  return (
    <AppBar sx={sx} elevation={0}>
      <Toolbar>
        <Box flexGrow={1} />
        {isAuth ? (
          <UserBox
            handleOnClickProfileMenu={handleOnClickProfileMenu}
            anchorProfileMenu={anchorProfileMenu}
            handleCloseProfileMenu={handleCloseProfileMenu}
          />
        ) : (
          <>
            <NavLink to="/user/login">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mr: 1,
                  mb: {
                    xs: 1,
                    sm: 0,
                    lg: 0,
                  },
                }}
              >
                Login
              </Button>
            </NavLink>
            <NavLink to="/user/register">
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  mr: 1,
                  mb: {
                    xs: 1,
                    sm: 0,
                    lg: 0,
                  },
                }}
              >
                Register
              </Button>
            </NavLink>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
