import {
  CardContent,
  Divider,
  Card,
  Grid,
  Box,
  Typography,
  Button,
  Backdrop,
} from "@mui/material";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useEffect, useState } from "react";
import { getLoggedInUser, onUpdateUser } from "../../../api/user";

import toast from "react-hot-toast";
import ModalContainer from "../../../components/Common/ModalContainer";
import UserProfileEdit from "./UserProfileEdit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  margin: "auto",
  p: 4,
};

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
      const { data, isLoading } = await onUpdateUser(userData).then((res) => {
        toast.success("Profile Updated Successfully");
        setIsEditProfile(isLoading);
      });
      setError("");
      setSuccess(data.message);
      setUserData({
        name: "",
        email: "",
        password: "",
        address: "",
        contact: "",
      });
      setIsEditProfile(isLoading);
    } catch (error) {
      console.log(error);
      // setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  return (
    <>
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
                onClick={handleOpen}
              >
                Edit
              </Button>
            </Box>
            <Divider />
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
          </Card>
        </Grid>
      </Grid>
      <ModalContainer
        handleClose={handleClose}
        Backdrop={Backdrop}
        open={open}
        style={style}
      >
        <UserProfileEdit
          userData={userData}
          handleClose={handleClose}
          onSubmit={onSubmit}
          modalHeader={"Edit Profile"}
          onChange={onChange}
        />
      </ModalContainer>
    </>
  );
}
