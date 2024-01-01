import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { AppBar, Box, Toolbar, Button, CardContent } from "@mui/material";

import UserBox from "../UserBox";

export default function CustomMenu(props) {
  let { sx, page } = props;


  // Close/Open dropdown profile menu in the header
  const [anchorProfileMenu, setAnchorProfileMenu] = useState(null);

  const handleOnClickProfileMenu = (event) => {
    setAnchorProfileMenu(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setAnchorProfileMenu(null);
  };

  const { isAuth } = useSelector((state) => state.auth);
  const renderNavBar = !page == "home" && {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
  };

  return (
    <AppBar sx={{ ...sx, renderNavBar }} elevation={0}>
      <Toolbar>
        {page === "home" ? null : (
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Button sx={{ margin: 1 }} component={NavLink} to="/">
                Home
              </Button>
              <Button sx={{ margin: 1 }} component={NavLink} to="/festivals">
                Festivals
              </Button>
              <Button sx={{ margin: 1 }} component={NavLink} to="/attractions">
                Attractions
              </Button>
              <Button
                sx={{ margin: 1 }}
                component={NavLink}
                to="/accommodations"
              >
                Accommodations
              </Button>
              <Button sx={{ margin: 1 }} component={NavLink} to="/map">
                Browse Map
              </Button>
            </Box>
          </CardContent>
        )}

        <Box flexGrow={1} />
        {isAuth ? (
          <UserBox
            handleOnClickProfileMenu={handleOnClickProfileMenu}
            anchorProfileMenu={anchorProfileMenu}
            handleCloseProfileMenu={handleCloseProfileMenu}
          />
        ) : (
          <>
            {!window.location.pathname.includes("login") &&
              !window.location.pathname.includes("register") && (
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
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
