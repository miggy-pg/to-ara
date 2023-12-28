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

import AttractionList from "../../components/Management/Attractions/AttractionList";
import TableContainer from "../../components/Common/TableContainer";
import TableHeader from "../../components/Common/TableContainer/TableHeader";
import ModalContainer from "../../components/Common/ModalContainer";
import CreateAttraction from "../../components/Management/Attractions/CreateAttraction";
import CustomPagination from "../../components/Common/CustomPagination";
import {
  FAILED_CREATE_ATTRACTION,
  SUCCESS_CREATE_ATTRACTION,
  setAttractions,
} from "../../redux/store/attractionsSlice";
import { createAttraction, getAttractions } from "../../api/attraction";
import { ATTRACTION_HEADERS } from "../../constants/headers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Attractions() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // We are using custom pagination hook
  const [indexOfLastItem, setIndexOfLastItem] = useState(null);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(null);

  const [values, setValues] = useState({
    name: "",
    address: "",
    visiting_hours_from: "",
    visiting_hours_to: "",
    entrance_fee: "",
    longitude: "",
    latitude: "",
    contact: "",
    description: "",
    direction: "",
    image: null,
  });

  const dispatch = useDispatch();
  const attractions = useSelector((store) => store.attraction.attractions.data);

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

    try {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("visiting_hours_from", values.visiting_hours_from);
      formData.append("visiting_hours_to", values.visiting_hours_to);
      formData.append("entrance_fee", values.entrance_fee);
      formData.append("longitude", values.longitude);
      formData.append("latitude", values.latitude);
      formData.append("contact", values.contact);
      formData.append("description", values.description);
      formData.append("direction", values.direction);

      const { data } = await createAttraction(formData);
      dispatch(SUCCESS_CREATE_ATTRACTION());
      setError("");
      setSuccess(data.message);
      setValues({
        name: "",
        address: "",
        visiting_hours_from: "",
        visiting_hours_to: "",
        entrance_fee: "",
        longitude: "",
        latitude: "",
        contact: "",
        description: "",
        image: null,
      });

      const cleanURL = window.location.origin + window.location.pathname;
      window.history.replaceState(null, null, cleanURL);

      handleClose();
    } catch (error) {
      console.log(error);
      dispatch(FAILED_CREATE_ATTRACTION(error.response.data.message));
      handleClose();

      setSuccess("");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: attractions } = await getAttractions();
        dispatch(setAttractions(attractions));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [dispatch]);

  const currPageItems =
    !isLoading && attractions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Button sx={{ ml: 3 }} onClick={handleOpen} variant="contained">
        Create Attraction
      </Button>

      <TableContainer>
        <Typography variant="h3">Attractions</Typography>
        <Box
          sx={{
            overflow: {
              lg: "auto",
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
            <TableHeader data={ATTRACTION_HEADERS} />
            <TableBody>
              {!isLoading &&
                currPageItems.map((user, i) => (
                  <AttractionList key={i} props={user} />
                ))}
            </TableBody>
          </Table>
          <CustomPagination
            itemsLength={!isLoading && attractions.length}
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
        <CreateAttraction
          handleFileChange={handleFileChange}
          handleClose={handleClose}
          onSubmit={onSubmit}
          onChange={onChange}
        />
      </ModalContainer>
    </>
  );
}
