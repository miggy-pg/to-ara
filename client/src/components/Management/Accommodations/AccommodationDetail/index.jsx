import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
<<<<<<< HEAD
import { useParams } from "react-router";

import { Typography, Container, Box, Grid, useMediaQuery } from "@mui/material";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import PlaceIcon from "@mui/icons-material/Place";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

import CustomMenu from "../../../Common/CustomMenu";
=======
import { Navigate, useNavigate, useParams } from "react-router";

import {
  Typography,
  Card,
  Tooltip,
  CardMedia,
  Container,
  Box,
  Grid,
  IconButton,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import PlaceIcon from "@mui/icons-material/Place";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { styled } from "@mui/material/styles";

import Menu from "../../../Common/Menu";
>>>>>>> 886ab8f (fix: page filters)
import MapLocator from "../../../Common/MapLocator";
import useLocalStorageState from "../../../../hooks/useLocalStorageState";
import { getAccommodation } from "../../../../api/accommodation";

<<<<<<< HEAD
import BackButton from "../../../Common/Buttons/BackButton";
import AddFavoriteIcon from "../../../Common/Icons/AddFavoriteIcon";
import DeleteFavoriteIcon from "../../../Common/Icons/DeleteFavoriteIcon";
import CardCover from "../../../Common/CardCover";

import "react-multi-carousel/lib/styles.css";
import "./styles.css";

const amenitiesStyle = {
  backgroundColor: "#689597",
  color: "#fff",
  display: "inline-block",
  padding: "0.3rem",
  fontSize: "0.8rem",
  borderRadius: "0.3rem",
  marginRight: "0.5rem",
};

function StatusType(type) {
  return {
    backgroundColor: `${type ? "#689597" : "#714343"}`,
    color: "#fff",
    display: "inline-block",
    padding: "0.3rem",
    fontSize: "0.8rem",
    borderRadius: "0.3rem",
    marginRight: "0.5rem",
    mb: 2,
  };
}

export default function AccommodationDetail() {
  const { id } = useParams();

  const { isAuth } = useSelector((state) => state.auth);

  const [accommodation, setAccommodation] = useState({});
  const [isLoading, setIsLoading] = useState(true);

=======
import "./styles.css";
import "react-multi-carousel/lib/styles.css";

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;
    .MuiCardMedia-root {
      height: ${theme.spacing(46)};
    }
`
);

export default function AccommodationDetail() {
  const { isAuth } = useSelector((state) => state.auth);

  const [accomodations, setAccomodations] = useState({});
  const [currAccomodation, setCurrAccomodation] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  console.log("accomodations: ", accomodations);
  const { id } = useParams();
  const navigate = useNavigate();

>>>>>>> 886ab8f (fix: page filters)
  const [favorite, setFavorite] = useLocalStorageState(
    [],
    "favoriteAccommodations"
  );

  const isFavorite = favorite
    ?.map((accomodation) => String(accomodation.id))
    .includes(id);

  const [isSidebarOpen] = useState(true);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

<<<<<<< HEAD
  useEffect(() => {
    async function getAPIAccomodation() {
      try {
        const { data: accommodation, isLoading } = await getAccommodation(id);
        setAccommodation(accommodation?.accommodation[0]);
=======
  const handleDeleteFavorite = (id) => {
    !isAuth && <Navigate to="user/login" />;

    isAuth &&
      setFavorite((favoriteAccomodation) =>
        favoriteAccomodation.filter(
          (attr) => parseInt(attr.id) !== parseInt(id)
        )
      );
  };

  const handleAddFavorite = (accomodation) => {
    setFavorite((curAccomodation) => [...curAccomodation, accomodation]);
  };

  const handleAdd = () => {
    !isAuth && navigate("/user/login");

    const newAddedFavorite = {
      image: currAccomodation.image,
      name: currAccomodation.name,
      description: currAccomodation.description,
      id: id,
    };
    isAuth && !isFavorite && handleAddFavorite(newAddedFavorite);
  };

  useEffect(() => {
    async function getAPIAccomodation() {
      try {
        const { data: currAccomodation, isLoading } = await getAccommodation(
          id
        );
        setAccomodations(currAccomodation?.data?.accomodations);
        setCurrAccomodation(currAccomodation?.data?.currAccomodation?.[0]);
>>>>>>> 886ab8f (fix: page filters)
        setIsLoading(isLoading);
      } catch (error) {
        console.log(error);
      }
    }
    getAPIAccomodation();
  }, []);

<<<<<<< HEAD
  if (isLoading) return;

=======
>>>>>>> 886ab8f (fix: page filters)
  return (
    <Container
      sx={{ mt: 15, pb: 6, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)" }}
      maxWidth="lg"
    >
<<<<<<< HEAD
      <CustomMenu
=======
      <Menu
>>>>>>> 886ab8f (fix: page filters)
        sx={{
          paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={0.7}>
          <Box display="flex" alignItems="center">
<<<<<<< HEAD
            <BackButton />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <CardCover record={accommodation} recordPath="accommodations" />
=======
            <Tooltip arrow placement="top" title="Go back">
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
                color="primary"
                sx={{ p: 2 }}
              >
                <ArrowBackTwoToneIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <CardCover>
            <CardMedia
              image={
                currAccomodation?.image
                  ? `http://localhost:4000/images/accommodations/${currAccomodation?.image}`
                  : "http://localhost:4000/images/accommodations/image-placeholder.jpg"
              }
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          </CardCover>
>>>>>>> 886ab8f (fix: page filters)
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              py: 1,
              px: 3,
              mb: 3,
            }}
          >
<<<<<<< HEAD
            {accommodation.status == "Available" ? (
              <Typography sx={StatusType(true)} variant="h5">
                Available
              </Typography>
            ) : (
              <Typography sx={StatusType(false)} variant="h5">
                Unavailable
=======
            {currAccomodation?.status == "Available" ? (
              <Typography
                sx={{
                  backgroundColor: "#689597",
                  color: "#fff",
                  display: "inline-block",
                  padding: "0.3rem",
                  fontSize: "0.8rem",
                  borderRadius: "0.3rem",
                  marginRight: "0.5rem",
                  mb: 2,
                }}
                variant="h5"
              >
                {currAccomodation?.status || "Available"}
              </Typography>
            ) : (
              <Typography
                sx={{
                  backgroundColor: "#714343",
                  color: "#fff",
                  display: "inline-block",
                  padding: "0.3rem",
                  fontSize: "0.8rem",
                  borderRadius: "0.3rem",
                  marginRight: "0.5rem",
                  mb: 2,
                }}
                variant="h5"
              >
                {currAccomodation?.status || "Unavailable"}
>>>>>>> 886ab8f (fix: page filters)
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {isFavorite ? (
<<<<<<< HEAD
                <DeleteFavoriteIcon
                  detailId={id}
                  isFavorite={isFavorite}
                  isAuth={isAuth}
                  setFavorite={setFavorite}
                />
              ) : (
                <AddFavoriteIcon
                  isAuth={isAuth}
                  isFavorite={isFavorite}
                  favorite={accommodation}
                  setFavorite={setFavorite}
                  detailId={id}
                />
              )}
              <Typography sx={{ ml: 0 }} variant="h4" component="div">
                <h1>{accommodation?.name || "No name available"}</h1>
=======
                <FormControlLabel
                  onClick={() => handleDeleteFavorite(id)}
                  control={
                    <Checkbox
                      icon={<FavoriteOutlinedIcon />}
                      checkedIcon={<FavoriteBorderOutlinedIcon />}
                      checked={isFavorite}
                      name="checkedH"
                    />
                  }
                />
              ) : (
                <FormControlLabel
                  onClick={handleAdd}
                  control={
                    <Checkbox
                      icon={<FavoriteOutlinedIcon />}
                      checkedIcon={<FavoriteBorderOutlinedIcon />}
                      checked={false}
                      name="checkedH"
                    />
                  }
                />
              )}
              <Typography sx={{ ml: 0 }} variant="h4" component="div">
                <h1>{currAccomodation?.name || "No name available"}</h1>
>>>>>>> 886ab8f (fix: page filters)
              </Typography>
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 2 }}>
<<<<<<< HEAD
              {accommodation?.description ||
=======
              {currAccomodation?.description ||
>>>>>>> 886ab8f (fix: page filters)
                "No description available for this record"}
            </Typography>

            <Box
              display={{ xs: "block", md: "flex" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PlaceIcon />
                <Typography variant="h4" sx={{ ml: 2 }}>
                  <strong>
<<<<<<< HEAD
                    {accommodation?.address || "No address available"}
=======
                    {currAccomodation?.address || "No address available"}
>>>>>>> 886ab8f (fix: page filters)
                  </strong>
                </Typography>
              </Box>
            </Box>

            <Box
              display={{ xs: "block", md: "flex" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                &nbsp;
                <Typography variant="h2">
                  <strong>₱</strong>
                </Typography>
                &nbsp;
                <Typography variant="h4" sx={{ ml: 2 }}>
                  <strong>
<<<<<<< HEAD
                    {accommodation?.price || "No price available"}
=======
                    {currAccomodation?.price || "No price available"}
>>>>>>> 886ab8f (fix: page filters)
                  </strong>
                </Typography>
              </Box>
            </Box>

            <Box
              display={{ xs: "block", md: "flex" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <ChairAltIcon />
                <Typography variant="h4" sx={{ ml: 2 }}>
                  <strong>Amenities</strong>
                </Typography>
              </Box>
            </Box>

            <Typography sx={{ ml: 5, width: "50%" }} variant="h5">
<<<<<<< HEAD
              {(String(accommodation?.amenities).length > 0 &&
                String(accommodation.amenities) !== "null" &&
                String(accommodation.amenities)
                  .split(",")
                  .map((amenity) => (
                    <Typography key={amenity} variant="h6" sx={amenitiesStyle}>
=======
              {(!isLoading && currAccomodation?.amenities &&
                String(currAccomodation.amenities) !== "null" &&
                JSON.stringify(currAccomodation?.amenities)
                  .split(",")
                  .map((amenity) => (
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
>>>>>>> 886ab8f (fix: page filters)
                      {amenity.replace(/[[\]"]+/g, "")}
                    </Typography>
                  ))) ||
                "No amenities available"}
            </Typography>
            <Box
              display={{ xs: "block", md: "flex" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DirectionsBusIcon />
                <Typography sx={{ ml: 2, mt: 2 }} variant="h4">
                  <strong>Direction:</strong>{" "}
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ ml: 5, pr: 10, mt: 2 }} variant="h5">
<<<<<<< HEAD
              {accommodation?.direction || "No direction available"}
=======
              {currAccomodation?.direction || "No direction available"}
>>>>>>> 886ab8f (fix: page filters)
            </Typography>
          </Box>
        </Grid>

<<<<<<< HEAD
        <MapLocator
          latitude={accommodation.latitude}
          longitude={accommodation.longitude}
          name={accommodation.name}
        />
=======
        {/* MAP LOCATION */}
        <Grid item xs={3}>
          <Box display="flex" alignItems="center">
            {!isLoading && currAccomodation?.latitude && currAccomodation?.longitude && (
              <MapLocator
                latitude={currAccomodation?.latitude}
                longitude={currAccomodation?.longitude}
                name={currAccomodation.name}
              />
            )}
          </Box>
        </Grid>
>>>>>>> 886ab8f (fix: page filters)
      </Grid>
    </Container>
  );
}
