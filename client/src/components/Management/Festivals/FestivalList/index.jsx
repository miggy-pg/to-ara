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

import { deleteFestival, editFestival } from "../../../../api/festival";
<<<<<<< HEAD
import { formatLongDate } from "../../../../utils/formatDate";
=======
// import FestivalEdit from "../FestivalEdit";
>>>>>>> 886ab8f (fix: page filters)
import ModalContainer from "../../../Common/ModalContainer";
import FestivalEdit from "../FestivalEdit";
import {
  FAILED_DELETE_FESTIVAL,
  FAILED_UPDATED_FESTIVAL,
  SUCCESS_DELETE_FESTIVAL,
  SUCCESS_UPDATED_FESTIVAL,
} from "../../../../redux/store/festivalSlice";

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
  width: 500,
  height: 850,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function FestivalList({ props }) {
  console.log("props: ", props);
  const {
    id,
    name,
    image,
    address,
    festival_date,
    longitude,
    latitude,
    description,
  } = props;

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const festivals = useSelector((store) => store.festival.festivals.data);
  const [values, setValues] = useState({
    name: "",
    location: "",
    festival_date: null,
    longitude: "",
    latitude: "",
    description: "",
    image: null,
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleOpen = (e) => {
    festivals.find(
      (festival) => festival.id == e.id && setValues({ ...festival })
    );
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      await deleteFestival(id);
      dispatch(SUCCESS_DELETE_FESTIVAL());
    } catch (err) {
      dispatch(FAILED_DELETE_FESTIVAL(err.response.data.message));
      console.log(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("location", values.location);
      formData.append("festival_date", values.festival_date);
      formData.append("longitude", values.longitude);
      formData.append("latitude", values.latitude);
      formData.append("description", values.description);

      await editFestival(id, formData);
      dispatch(SUCCESS_UPDATED_FESTIVAL());
      setValues({
        name: "",
        location: "",
        festival_date: null,
        longitude: "",
        latitude: "",
        description: "",
        image: null,
      });

      handleClose();
    } catch (error) {
      dispatch(FAILED_UPDATED_FESTIVAL(error.response.data.message));
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
              src={`http://localhost:4000/images/festivals/${image ? image : "image-placeholder.jpg"}`}
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
<<<<<<< HEAD
            <strong>Long:</strong> {longitude} <br/>
            <strong>Lan:</strong> {latitude}
=======
            {longitude}
            {latitude}
>>>>>>> 886ab8f (fix: page filters)
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
<<<<<<< HEAD
            {formatLongDate(festival_date)}
=======
            {festival_date}
>>>>>>> 886ab8f (fix: page filters)
          </Typography>
        </TableCell>
        <TableCell>
          <StyledTypography color="textSecondary" variant="h6">
            {description}
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
        <FestivalEdit
          values={values}
          handleFileChange={handleFileChange}
          handleClose={handleClose}
          onSubmit={onSubmit}
          modalHeader={"Edit Festival"}
          onChange={onChange}
        />
      </ModalContainer>
    </>
  );
}
