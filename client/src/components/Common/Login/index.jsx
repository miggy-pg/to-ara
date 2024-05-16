import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  Container,
  CardContent,
  TextField,
  Divider,
  Card,
  Grid,
  Box,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";

import {
  FAILED_LOGIN_USER,
  authenticateUser,
  setUserRole,
} from "../../../redux/store/authSlice";
import { onLogin } from "../../../api/auth";
import Menu from "../Menu";

export default function Login() {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await onLogin(values).then((res) => {
        console.log("res:", res);
        dispatch(setUserRole(res.data.admin));
        localStorage.setItem("isAdmin", res.data.admin);
        localStorage.setItem("userId", res.data.userId);
      });
      dispatch(authenticateUser());

      localStorage.setItem("isAuth", "true");
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      dispatch(FAILED_LOGIN_USER(error.response.data.message));
    }
  };

  return (
    <Box
      id="hero"
      sx={{
        backgroundColor: "background.paper",
        position: "relative",
        mt: 17,
        pb: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Menu
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
          }}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />
        <Card
          variant="outlined"
          sx={{
            p: 0,
          }}
        >
          <Box
            sx={{
              padding: "15px 30px",
            }}
            display="flex"
            alignItems="center"
          >
            <Box flexGrow={1}>
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                Login
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent
            sx={{
              padding: "30px",
            }}
          >
            <form onSubmit={(e) => onSubmit(e)}>
              <TextField
                onChange={(e) => onChange(e)}
                id="email"
                name="email"
                value={values.email}
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
              />
              <TextField
                onChange={(e) => onChange(e)}
                id="password"
                name="password"
                value={values.password}
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
              />

              <Grid
                container
                spacing={0}
                sx={{
                  mb: 2,
                }}
              ></Grid>
              <Typography>
                <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
              </Typography>

              <Button type="submit" color="primary" variant="contained">
                Login
              </Button>
              <Typography variant="h4" sx={{ mt: 2 }}>
                Don&apos;t have an account yet?{" "}
                <Link
                  to="/user/register"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  Register here
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
