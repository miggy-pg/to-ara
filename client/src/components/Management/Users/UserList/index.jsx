import { useState } from "react";

import {
  Avatar,
  Typography,
  Button,
  TableCell,
  TableRow,
  Box,
  Backdrop,
} from "@mui/material";

import { deleteUser, editUser } from "../../../../api/user";
import UserEdit from "../UserEdit";
import ModalContainer from "../../../Common/ModalContainer";
import { useDispatch } from "react-redux";
import {
  FAILED_DELETE_USER,
  FAILED_UPDATED_USER,
  SUCCESS_DELETE_USER,
  SUCCESS_UPDATED_USER,
} from "../../../../redux/store/authSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 850,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function UserList({ props, users }) {
  const { id, name, email, phone, address, admin } = props;

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    admin: false,
  });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSwitchChange = (e) => {
    setValues({ ...values, admin: e.target.checked });
  };

  const handleOpen = (e) => {
    users.find((user) => user.id == e.id && setValues({ ...user }));
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      await deleteUser(id);
      dispatch(SUCCESS_DELETE_USER());
    } catch (err) {
      dispatch(FAILED_DELETE_USER(err.response.data.message));
      console.log(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await editUser(id, values);
      dispatch(SUCCESS_UPDATED_USER());
      setValues({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        admin: false,
      });

      handleClose();
    } catch (error) {
      dispatch(FAILED_UPDATED_USER(error.response.data.message));
      handleClose();
      console.log(error);
    }
  };

  const adminMarkerStyle = {
    backgroundColor: admin ? "green" : "red",
    width: "1.5rem",
    height: "1.5rem",
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            {id}
          </Typography>
        </TableCell>
        <TableCell>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                }}
              >
                {name}
              </Typography>
              <Typography
                color="textSecondary"
                sx={{
                  fontSize: "13px",
                }}
              >
                {email}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {phone}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {address}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            <Avatar sx={adminMarkerStyle} />
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Button
            onClick={() => handleOpen({ id })}
            variant="contained"
            color="primary"
            sx={{
              mr: 1,
              mb: 1,
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete({ id })}
            variant="contained"
            color="error"
            sx={{
              mr: 1,
              mb: 1,
            }}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>

      <ModalContainer
        handleClose={handleClose}
        Backdrop={Backdrop}
        open={open}
        style={style}
      >
        <UserEdit
          values={values}
          handleSwitchChange={handleSwitchChange}
          handleClose={handleClose}
          onSubmit={onSubmit}
          modalHeader={"Edit User"}
          onChange={onChange}
        />
      </ModalContainer>
    </>
  );
}
