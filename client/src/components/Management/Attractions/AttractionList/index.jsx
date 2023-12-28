import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  Typography,
  Button,
  TableCell,
  TableRow,
  Box,
  Backdrop,
} from "@mui/material";

import { deleteAttraction, editAttraction } from "../../../../api/attraction";
import AttractionEdit from "../AttractionEdit";
import ModalContainer from "../../../Common/ModalContainer";
import {
  FAILED_UPDATED_ATTRACTION,
  FAILED_DELETE_ATTRACTION,
  SUCCESS_UPDATED_ATTRACTION,
  SUCCESS_DELETE_ATTRACTION,
} from "../../../../redux/store/attractionsSlice";

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
  height: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AttractionList({ props }) {
  const {
    id,
    name,
    image,
    address,
    contact_number,
    longitude,
    latitude,
    description,
    direction,
    entrance_fee,
    visiting_hours,
  } = props;

  const [open, setOpen] = useState(false);
  const attractions = useSelector((store) => store.attraction.attractions.data);
  const [values, setValues] = useState({
    name: "",
    visiting_hours_from: "",
    visiting_hours_to: "",
    entrance_fee: 0,
    address: "",
    longitude: 0,
    latitude: 0,
    contact: "",
    description: "",
    direction: "",
    image: null,
  });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleOpen = (e) => {
    attractions.find(
      (attraction) => attraction.id == e.id && setValues({ ...attraction })
    );
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      await deleteAttraction(id);
      dispatch(SUCCESS_DELETE_ATTRACTION());
    } catch (err) {
      dispatch(FAILED_DELETE_ATTRACTION(err.response.data.message));
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
      formData.append("description", values.description);
      formData.append("direction", values.direction);

      await editAttraction(id, formData);
      dispatch(SUCCESS_UPDATED_ATTRACTION());
      setValues({
        name: "",
        visiting_hours_from: "",
        address: "",
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
      dispatch(FAILED_UPDATED_ATTRACTION(error.response.data.message));
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
              src={`http://localhost:4000/images/attractions/${image ? image : "image-placeholder.jpg"}`}
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
                {address}
              </Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {visiting_hours}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {entrance_fee}
          </Typography>
        </TableCell>
        <TableCell>
          <StyledTypography color="textSecondary" variant="h6">
            {longitude}
            {latitude}
          </StyledTypography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {contact_number}
          </Typography>
        </TableCell>
        <TableCell>
          <StyledTypography color="textSecondary" variant="h6">
            {description}
          </StyledTypography>
        </TableCell>
        <TableCell>
          <StyledTypography color="textSecondary" variant="h6">
            {direction}
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
        <AttractionEdit
          values={values}
          handleFileChange={handleFileChange}
          handleClose={handleClose}
          onSubmit={onSubmit}
          modalHeader={"Edit Attraction"}
          onChange={onChange}
        />
      </ModalContainer>
    </>
  );
}
