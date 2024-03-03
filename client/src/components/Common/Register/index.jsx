import { useState } from "react";
import {
  Container,
  CardContent,
  TextField,
  Divider,
  Card,
  Grid,
  Box,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { onRegistration } from "../../../api/auth";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import CustomMenu from "../CustomMenu";
=======
import Menu from "../Menu";
>>>>>>> 886ab8f (fix: page filters)
import { useDispatch } from "react-redux";
import {
  FAILED_CREATE_USER,
  SUCCESS_CREATE_USER,
} from "../../../redux/store/authSlice";

export default function Register() {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await onRegistration(values);
      setError("");
      dispatch(SUCCESS_CREATE_USER(data.message));
      setValues({ name: "", email: "", password: "" });
    } catch (error) {
      console.log(error);
<<<<<<< HEAD
      error.response.data.errors.map((err) => dispatch(FAILED_CREATE_USER(err.msg)));
=======
      dispatch(FAILED_CREATE_USER(error.response.data.message));
      // setError(error.response.data.errors[0].msg);
>>>>>>> 886ab8f (fix: page filters)
      setSuccess("");
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
<<<<<<< HEAD
        <CustomMenu
=======
        <Menu
>>>>>>> 886ab8f (fix: page filters)
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
                Register
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
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={(e) => onChange(e)}
                value={values.name}
                fullWidth
                sx={{
                  mb: 2,
                }}
                required
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                onChange={(e) => onChange(e)}
                value={values.email}
                fullWidth
                sx={{
                  mb: 2,
                }}
                required
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={(e) => onChange(e)}
                value={values.password}
                fullWidth
                sx={{
                  mb: 2,
                }}
                required
              />

              <Grid
                container
                spacing={0}
                sx={{
                  mb: 2,
                }}
              ></Grid>
              <Typography variant="h5">
                <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
                <div style={{ color: "green", margin: "10px 0" }}>
                  {success}
                </div>
              </Typography>
              <div>
                <Button type="submit" color="primary" variant="contained">
                  Register
                </Button>
                <Typography variant="h4" sx={{ mt: 2 }}>
                  Already have an account?{" "}
                  <Link
                    to="/user/login"
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    Login here
                  </Link>
                </Typography>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
