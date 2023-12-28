import { useEffect, useState } from "react";

import {
  Typography,
  Table,
  Box,
  Backdrop,
  TableBody,
  Button,
} from "@mui/material";

import TableHeader from "../../components/Common/TableContainer/TableHeader";
import UserList from "../../components/Management/Users/UserList";
import TableContainer from "../../components/Common/TableContainer";
import ModalContainer from "../../components/Common/ModalContainer";
import CustomPagination from "../../components/Common/CustomPagination";
import CreateUser from "../../components/Management/Users/CreateUser";
import { createUser, getUsers } from "../../api/user";

import { USER_HEADERS } from "../../constants/headers";
import { useDispatch } from "react-redux";
import {
  FAILED_CREATE_USER,
  SUCCESS_CREATE_USER,
} from "../../redux/store/authSlice";

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

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState({});
  const dispatch = useDispatch();

  // We are using custom pagination hook
  const [indexOfLastItem, setIndexOfLastItem] = useState(null);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(null);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    admin: false,
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSwitchChange = (e) => {
    setValues({ ...values, admin: e.target.checked });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createUser(values);
      dispatch(SUCCESS_CREATE_USER());
      setError("");
      setSuccess(data.message);
      setValues({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        admin: false,
      });

      const cleanURL = window.location.origin + window.location.pathname;
      window.history.replaceState(null, null, cleanURL);

      handleClose();
    } catch (error) {
      console.log("error: ", error);
      dispatch(FAILED_CREATE_USER(error.response.data.message));
      handleClose();

      setSuccess("");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: users, isLoading } = await getUsers();
        setUsers(users.data);
        setIsLoading(isLoading);
      } catch (error) {
        console.log(error);
        setError(error.response.data.errors[0].msg);
      }
    }
    fetchData();
  }, [setUsers]);

  const currPageItems =
    !isLoading && users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Button sx={{ ml: 3 }} onClick={handleOpen} variant="contained">
        Create User
      </Button>
      <TableContainer>
        <Typography variant="h3">Users</Typography>
        <Box
          sx={{
            overflow: {
              xs: "auto",
              sm: "unset",
            },
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              mt: 3,
              whiteSpace: "nowrap",
            }}
          >
            <TableHeader data={USER_HEADERS} />
            <TableBody>
              {!isLoading &&
                currPageItems.map((user, i) => (
                  <UserList key={i} props={user} users={users} />
                ))}
            </TableBody>
          </Table>
          <CustomPagination
            itemsLength={!isLoading && users.length}
            setIndexOfLastItem={setIndexOfLastItem}
            setIndexOfFirstItem={setIndexOfFirstItem}
          />
        </Box>
      </TableContainer>

      {/* CREATE MODAL FORM */}
      <ModalContainer
        handleClose={handleClose}
        Backdrop={Backdrop}
        open={open}
        modalHeader={"Create Attraction"}
        style={style}
      >
        <CreateUser
          error={error}
          handleSwitchChange={handleSwitchChange}
          handleClose={handleClose}
          onSubmit={onSubmit}
          onChange={onChange}
        />
      </ModalContainer>
    </>
  );
}
