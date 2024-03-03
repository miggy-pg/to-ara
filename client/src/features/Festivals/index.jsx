import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Typography,
  Table,
  Box,
  Backdrop,
  TableBody,
  Button,
} from "@mui/material";

import TableContainer from "../../components/Common/TableContainer";
import ModalContainer from "../../components/Common/ModalContainer";
import TableHeader from "../../components/Common/TableContainer/TableHeader";
import FestivalList from "../../components/Management/Festivals/FestivalList";
import CustomPagination from "../../components/Common/CustomPagination";
import {
  FAILED_CREATE_FESTIVAL,
  SUCCESS_CREATE_FESTIVAL,
  setFestivals,
} from "../../redux/store/festivalSlice";
import { createFestival, getFestivals } from "../../api/festival";

import { FESTIVAL_HEADERS } from "../../constants/headers";
import CreateFestival from "../../components/Management/Festivals/CreateFestival";

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
1;

export default function Festivals() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // We are using custom pagination hook
  const [indexOfLastItem, setIndexOfLastItem] = useState(null);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(null);

  const [values, setValues] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    festival_date: new Date().toISOString(),
    description: "",
    image: null,
  });

  const dispatch = useDispatch();
  const festivals = useSelector((store) => store.festival.festivals.data);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setValues({ ...values, image: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("festival_date: ", values.festival_date);
    try {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("latitude", values.latitude);
      formData.append("longitude", values.longitude);
      formData.append("festival_date", values.festival_date);
      formData.append("description", values.description);

      const { data } = await createFestival(formData);
      dispatch(SUCCESS_CREATE_FESTIVAL());
      setError("");
      setSuccess(data.message);
      setValues({
        name: "",
        address: "",
        latitude: "",
        longitude: "",
        festival_date: "",
        description: "",
        image: null,
      });

      const cleanURL = window.location.origin + window.location.pathname;
      window.history.replaceState(null, null, cleanURL);

      handleClose();
    } catch (error) {
      console.log(error);
      dispatch(FAILED_CREATE_FESTIVAL(error.response.data.message));
      handleClose();

      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  useEffect(() => {
    async function fetchFestivalData() {
      try {
        const { data: festivals } = await getFestivals();
        dispatch(setFestivals(festivals));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFestivalData();
  }, [dispatch]);

  const currPageItems =
    !isLoading && festivals.slice(indexOfFirstItem, indexOfLastItem);

  console.log("currPageItems", currPageItems);
  return (
    <>
      <Button sx={{ ml: 3 }} onClick={handleOpen} variant="contained">
        Create Festival
      </Button>
      <TableContainer>
        <Typography variant="h3">Festivals</Typography>
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
            <TableHeader data={FESTIVAL_HEADERS} />
            <TableBody>
              {!isLoading &&
                currPageItems.map((user, i) => (
                  <FestivalList key={i} props={user} />
                ))}
            </TableBody>
          </Table>
          <CustomPagination
            itemsLength={!isLoading && festivals.length}
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
        modalHeader={"Create Festival"}
        style={style}
      >
        <CreateFestival
          handleFileChange={handleFileChange}
          handleClose={handleClose}
          onSubmit={onSubmit}
          onChange={onChange}
        />
      </ModalContainer>
    </>
  );
}
