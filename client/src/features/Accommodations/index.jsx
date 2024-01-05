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
import TableHeader from "../../components/Common/TableContainer/TableHeader";
import ModalContainer from "../../components/Common/ModalContainer";
import CreateAccomodation from "../../components/Management/Accommodations/CreateAccommodation";
import CustomPagination from "../../components/Common/CustomPagination";
import {
  FAILED_CREATE_ACCOMMODATION,
  SUCCESS_CREATE_ACCOMMODATION,
  setAccommodations,
} from "../../redux/store/accommodationSlice";
import {
  createAccommodation,
  getAccommodations,
} from "../../api/accommodation";
import { ACCOMODATION_HEADERS } from "../../constants/headers";
import AccommodationList from "../../components/Management/Accommodations/AccommodationList";

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

export default function Accommodations() {
  const [isLoading, setIsLoading] = useState(false);
  const [amenities, setAmenities] = useState({}); // State to hold selected values
  const [accommodationStatus, setAccommodationStatus] = useState("");

  // We are using custom pagination hook
  const [indexOfLastItem, setIndexOfLastItem] = useState(null);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(null);

  const [values, setValues] = useState({
    name: "",
    price: "",
    address: "",
    entrance_fee: "",
    longitude: "",
    latitude: "",
    status: accommodationStatus,
    contact: "",
    description: "",
    direction: "",
    image: null,
  });

  const dispatch = useDispatch();
  const accommodations = useSelector(
    (store) => store.accommodation.accommodations.data
  );

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

  const handleAccommodationStatus = (e) => {
    setAccommodationStatus(e.target.textContent);
  };

  // Fetch accomodations from our custom hook
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("address", values.address);
      formData.append("longitude", values.longitude);
      formData.append("latitude", values.latitude);
      formData.append("contact", values.contact);
      formData.append("status", accommodationStatus);
      formData.append("description", values.description);
      formData.append("direction", values.direction);
      formData.append("amenities", Object.keys(amenities));

      await createAccommodation(formData);
      dispatch(SUCCESS_CREATE_ACCOMMODATION());
      setAmenities({});
      setValues({
        name: "",
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

      const cleanURL = window.location.origin + window.location.pathname;
      window.history.replaceState(null, null, cleanURL);

      handleClose();
    } catch (error) {
      console.log(error);
      dispatch(FAILED_CREATE_ACCOMMODATION(error.response.data.message));
      handleClose();
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: accommodations } = await getAccommodations();
        setIsLoading(true);
        dispatch(setAccommodations(accommodations));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [dispatch]);

  const currPageItems = accommodations?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (isLoading) return;

  return (
    <>
      <Button sx={{ ml: 3 }} onClick={handleOpen} variant="contained">
        Create Accommodation
      </Button>
      <TableContainer>
        <Typography variant="h3">Accommodations</Typography>
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
            <TableHeader data={ACCOMODATION_HEADERS} />
            <TableBody>
              {currPageItems?.map((user, i) => (
                <AccommodationList
                  key={i}
                  props={user}
                  handleAccommodationStatus={handleAccommodationStatus}
                />
              ))}
            </TableBody>
          </Table>
          <CustomPagination
            itemsLength={accommodations?.length}
            setIndexOfLastItem={setIndexOfLastItem}
            setIndexOfFirstItem={setIndexOfFirstItem}
          />
        </Box>
      </TableContainer>

      <ModalContainer
        handleClose={handleClose}
        Backdrop={Backdrop}
        open={open}
        modalHeader={"Create Accommodation"}
        style={style}
      >
        <CreateAccomodation
          setAmenities={setAmenities}
          handleAccommodationStatus={handleAccommodationStatus}
          handleFileChange={handleFileChange}
          handleClose={handleClose}
          onSubmit={onSubmit}
          onChange={onChange}
        />
      </ModalContainer>
    </>
  );
}
