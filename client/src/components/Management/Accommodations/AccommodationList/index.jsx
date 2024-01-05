import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Typography,
  Button,
  TableCell,
  TableRow,
  Box,
  Backdrop,
} from "@mui/material";
import styled from "styled-components";

import {
  deleteAccommodation,
  editAccommodation,
} from "../../../../api/accommodation";
import AccommodationEdit from "../AccommodationEdit";
import ModalContainer from "../../../Common/ModalContainer";
import {
  FAILED_DELETE_ACCOMMODATION,
  FAILED_UPDATED_ACCOMMODATION,
  SUCCESS_DELETE_ACCOMMODATION,
  SUCCESS_UPDATED_ACCOMMODATION,
} from "../../../../redux/store/accommodationSlice";

const StyledTypography = styled(Typography)`
  display: inline-block;
  width: 200px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AccommodationList({ props }) {
  const {
    id,
    image,
    name,
    address,
    price,
    latitude,
    longitude,
    contact,
    status,
    direction,
    description,
    amenities,
  } = props;

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const accommodations = useSelector(
    (store) => store.accommodation.accommodations.data
  );
  const [currAmenities, setCurrAmenities] = useState({}); // State to hold selected values
  const [accommodationStatus, setAccommodationStatus] = useState("");

  const [values, setValues] = useState({
    name: "",
    price: "",
    longitude: "",
    latitude: "",
    address: "",
    contact: "",
    description: "",
    direction: "",
    status: accommodationStatus,
    image: null,
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleSwitchChange = (e) => {
    setValues({ ...values, fullyBooked: e.target.checked });
  };

  const handleAccommodationStatus = (e) => {
    setAccommodationStatus(e.target.textContent);
  };

  const handleOpen = (e) => {
    accommodations.find(
      (accommodation) =>
        accommodation.id == e.id && setValues({ ...accommodation })
    );
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      await deleteAccommodation(id);
      dispatch(SUCCESS_DELETE_ACCOMMODATION());
    } catch (err) {
      dispatch(FAILED_DELETE_ACCOMMODATION(err.response.data.message));
      console.log(err);
    }
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
      formData.append("status", accommodationStatus);
      formData.append(
        "amenities",
        !Object.keys(currAmenities).length
          ? values.amenities
          : Object.keys(currAmenities)
      );
      formData.append("description", values.description);
      formData.append("direction", values.direction);

      await editAccommodation(id, formData);
      dispatch(SUCCESS_UPDATED_ACCOMMODATION());
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

      handleClose();
    } catch (error) {
      dispatch(FAILED_UPDATED_ACCOMMODATION(error.response.data.message));
      handleClose();

      console.log(error);
    }
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
          <Typography color="textSecondary" variant="h6">
            <img
              src={`http://localhost:4000/images/accommodations/${
                image ? image : "image-placeholder.jpg"
              }`}
              width="100px"
              height="100px"
            />
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
                {address || "No address included in this record"}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {price}
          </Typography>
        </TableCell>
        <TableCell>
          <StyledTypography color="textSecondary" variant="h6">
            <strong>Long:</strong> {longitude} <br />
            <strong>Lan:</strong> {latitude}
          </StyledTypography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {contact}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {status}
          </Typography>
        </TableCell>
        <TableCell>
          <StyledTypography color="textSecondary" variant="h6">
            {description || "No description included in this record"}
          </StyledTypography>
        </TableCell>
        <TableCell>
          <StyledTypography color="textSecondary" variant="h6">
            {direction || "No direction included in this record"}
          </StyledTypography>
        </TableCell>
        <TableCell>
          <StyledTypography color="textSecondary" variant="h6">
            {String(amenities).length > 0 &&
              String(amenities) !== "null" &&
              String(amenities)
                .split(",")
                .map(
                  (amenity) =>
                    String(amenity.replace(/[[\]"]+/g, "")) !== "false" && (
                      <Typography
                        key={amenity}
                        variant="h6"
                        sx={{
                          backgroundColor: "#689597",
                          color: "#fff",
                          display: "inline-block",
                          padding: "0.3rem",
                          fontSize: "0.8rem",
                          borderRadius: "0.3rem",
                          marginRight: "0.5rem",
                        }}
                      >
                        {String(amenity.replace(/[[\]"]+/g, ""))}
                      </Typography>
                    )
                )}
          </StyledTypography>
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
        <AccommodationEdit
          values={values}
          handleAccommodationStatus={handleAccommodationStatus}
          accommodationStatus={accommodationStatus}
          setAccommodationStatus={setAccommodationStatus}
          setAmenities={setCurrAmenities}
          handleSwitchChange={handleSwitchChange}
          handleFileChange={handleFileChange}
          handleClose={handleClose}
          onSubmit={onSubmit}
          modalHeader={"Edit Accommodation"}
          onChange={onChange}
        />
      </ModalContainer>
    </>
  );
}
