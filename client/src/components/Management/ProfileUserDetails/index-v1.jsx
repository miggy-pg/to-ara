import {
  CardContent,
  Divider,
  Card,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useEffect, useState } from "react";
import { getLoggedInUser, onUpdateUser } from "../../../api/user";

export default function ProfileUserDetails() {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    contact: "",
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function fetchUser() {
      console.log();
      const { data: currUser } = await getLoggedInUser();
      setUserData((currData) => ({
        ...currData,
        ...currUser?.data?.user?.[0],
      }));
    }

    fetchUser();
  }, []);

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await onUpdateUser(userData);
      console.log("data: ", data);
      setError("");
      setSuccess(data.message);
      setUserData({
        name: "",
        email: "",
        password: "",
        address: "",
        contact: "",
      });
      setIsEditProfile(false);
    } catch (error) {
      console.log(error);
      // setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Personal Details
              </Typography>
              <Typography variant="subtitle2">
                Manage informations related to your personal account
              </Typography>
            </Box>
            <Button
              variant="text"
              startIcon={<EditTwoToneIcon />}
              onClick={() => setIsEditProfile((editing) => !editing)}
            >
              Edit
            </Button>
          </Box>
          <Divider />
          {isEditProfile ? (
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    <TextField
                      id="name"
                      name="name"
                      label="Name"
                      onChange={(e) => onChange(e)}
                      defaultValue={userData.name}
                      type="text"
                      variant="outlined"
                      sx={{
                        mb: 2,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      onChange={(e) => onChange(e)}
                      defaultValue={userData.email}
                      type="email"
                      variant="outlined"
                      sx={{
                        mb: 2,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    <TextField
                      id="password"
                      name="password"
                      label="Password"
                      onChange={(e) => onChange(e)}
                      defaultValue={userData.password}
                      type="password"
                      variant="outlined"
                      sx={{
                        mb: 2,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box sx={{ maxWidth: { xs: "auto", sm: 300 } }}>
                    <TextField
                      id="address"
                      name="address"
                      label="Address"
                      onChange={(e) => onChange(e)}
                      defaultValue={userData.address}
                      type="text"
                      variant="outlined"
                      sx={{
                        mb: 2,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box sx={{ maxWidth: { xs: "auto", sm: 300 } }}>
                    <TextField
                      id="contact"
                      name="contact"
                      label="Contact"
                      onChange={(e) => onChange(e)}
                      defaultValue={userData.contact}
                      type="text"
                      variant="outlined"
                      sx={{
                        mb: 2,
                      }}
                    />
                  </Box>
                </Grid>
                <Button type="submit" onClick={onSubmit}>
                  Save
                </Button>
              </Grid>
            </CardContent>
          ) : (
            <CardContent sx={{ p: 4 }}>
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                    <Box pr={3} pb={2}>
                      Name:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Typography color="black">
                      <b> {userData.name}</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                    <Box pr={3} pb={2}>
                      Email:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Typography color="black">
                      <b> {userData.email}</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                    <Box pr={3} pb={2}>
                      Password:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Typography color="black">
                      <b> {userData.password.replace(/./g, "*")}</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                    <Box pr={3} pb={2}>
                      Address:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Box sx={{ maxWidth: { xs: "auto", sm: 300 } }}>
                      <Typography color="black">{userData.address}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                    <Box pr={3} pb={2}>
                      Contact:
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Box sx={{ maxWidth: { xs: "auto", sm: 300 } }}>
                      <Typography color="black">{userData.contact}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Typography>
            </CardContent>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}
