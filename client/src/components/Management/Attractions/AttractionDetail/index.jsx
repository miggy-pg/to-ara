import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
<<<<<<< HEAD
import { useParams } from "react-router";

import { Typography, Container, Box, Grid, useMediaQuery } from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import PlaceIcon from "@mui/icons-material/Place";

import AddFavoriteIcon from "../../../Common/Icons/AddFavoriteIcon";
import CustomMenu from "../../../Common/CustomMenu";
import DeleteFavoriteIcon from "../../../Common/Icons/DeleteFavoriteIcon";
import MapLocator from "../../../Common/MapLocator";
import useLocalStorageState from "../../../../hooks/useLocalStorageState";
import CardCover from "../../../Common/CardCover";
import BackButton from "../../../Common/Buttons/BackButton";
import Recommendation from "../../../Common/Recommedation";
import { findNearbyCoordinates } from "../../../../utils/findNearbyCoordinates";
import { convertTo12HourFormat } from "../../../../utils/formatTime";
=======
import { Navigate, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import {
  Typography,
  Card,
  Tooltip,
  CardMedia,
  Container,
  Box,
  Grid,
  IconButton,
  Divider,
  CardHeader,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlaceIcon from "@mui/icons-material/Place";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import Carousel from "react-multi-carousel";
import RoofingIcon from "@mui/icons-material/Roofing";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { styled } from "@mui/material/styles";

import Menu from "../../../Common/Menu";
import MapLocator from "../../../Common/MapLocator";
import useLocalStorageState from "../../../../hooks/useLocalStorageState";
import findNearbyCoordinates from "../../../../utils/findNearbyCoordinates";
>>>>>>> 886ab8f (fix: page filters)
import { getAttraction } from "../../../../api/attraction";

import "./styles.css";
import "react-multi-carousel/lib/styles.css";
<<<<<<< HEAD
=======
import { convertTo12HourFormat } from "../../../../utils/formatTime";
import { getAccommodations } from "../../../../api/accommodation";

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;
    .MuiCardMedia-root {
      height: ${theme.spacing(46)};
    }
`
);
>>>>>>> 886ab8f (fix: page filters)

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default function AttractionDetail() {
<<<<<<< HEAD
  const { id } = useParams();

  const { isAuth } = useSelector((state) => state.auth);

  const [accommodations, setAccommodations] = useState({});
  const [currAttraction, setCurrAttraction] = useState({});
  const [isLoading, setIsLoading] = useState(true);

=======
  const { isAuth } = useSelector((state) => state.auth);

  const [accommodations, setAccommodations] = useState({})
  const [attractions, setAttractions] = useState({});
  const [currAttraction, setCurrAttraction] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

>>>>>>> 886ab8f (fix: page filters)
  const [favorite, setFavorite] = useLocalStorageState(
    [],
    "favoriteAttractions"
  );

  const isFavorite = favorite
    ?.map((attraction) => String(attraction.id))
    .includes(id);

  const [isSidebarOpen] = useState(true);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

<<<<<<< HEAD
=======
  const handleDeleteFavorite = (id) => {
    !isAuth && <Navigate to="user/login" />;

    isAuth &&
      setFavorite((favoriteAttraction) =>
        favoriteAttraction.filter((attr) => parseInt(attr.id) !== parseInt(id))
      );
  };

  const handleAddFavorite = (attraction) => {
    setFavorite((curAttraction) => [...curAttraction, attraction]);
  };

  const handleAdd = () => {
    !isAuth && navigate("/user/login");

    const newAddedFavorite = {
      image: currAttraction.image,
      name: currAttraction.name,
      description: currAttraction.description,
      id: id,
    };
    isAuth && !isFavorite && handleAddFavorite(newAddedFavorite);
  };

>>>>>>> 886ab8f (fix: page filters)
  useEffect(() => {
    async function getAPIAttraction() {
      try {
        const { data: currAttraction, isLoading } = await getAttraction(id);
<<<<<<< HEAD
        setAccommodations(currAttraction?.data?.accommodations);
=======
        setAttractions(currAttraction?.data?.attractions);
>>>>>>> 886ab8f (fix: page filters)
        setCurrAttraction(currAttraction?.data?.currAttraction?.[0]);
        setIsLoading(isLoading);
      } catch (error) {
        console.log(error);
      }
    }
    getAPIAttraction();
  }, []);

<<<<<<< HEAD
  if (isLoading) return;
=======
  
  useEffect(() => {
    async function fetchAccommodations() {
      const { data: accoms } = await getAccommodations();
      const { data: accommodations } = accoms
      setAccommodations(accommodations)
    }
    fetchAccommodations()
  },[])
>>>>>>> 886ab8f (fix: page filters)

  const nearby = findNearbyCoordinates(
    isLoading,
    currAttraction.latitude,
    currAttraction.longitude,
<<<<<<< HEAD
    accommodations
  );

=======
    !isLoading && accommodations
  );

    

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
          <CardCover record={currAttraction} recordPath="attractions" />

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
                currAttraction.image
                  ? `http://localhost:4000/images/attractions/${currAttraction.image}`
                  : "http://localhost:4000/images/attractions/image-placeholder.jpg"
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
                  favorite={currAttraction}
                  setFavorite={setFavorite}
                  detailId={id}
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
>>>>>>> 886ab8f (fix: page filters)
                />
              )}
              <Typography sx={{ ml: 0 }} variant="h4" component="div">
                <h1>{currAttraction?.name}</h1>
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ py: 2 }} color="text.primary">
              Visiting Hours: &nbsp;
              {convertTo12HourFormat(
                String(currAttraction?.visiting_hours_from)
              )}{" "}
              -{" "}
              {convertTo12HourFormat(String(currAttraction?.visiting_hours_to))}
            </Typography>
            <Typography variant="h4" sx={{ mb: "1rem" }}>
              Entrance Fee: <strong>₱{currAttraction?.entrance_fee}</strong>
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              {currAttraction?.description ||
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
                    {currAttraction?.address || "No address available"}
                  </strong>
                </Typography>
              </Box>
            </Box>
            <Box
              display={{ xs: "block", md: "flex" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DirectionsBusIcon />
                <Typography sx={{ ml: 2 }} variant="h4">
                  <strong>Direction:</strong>{" "}
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ ml: 5, mt: 2, pr: 10 }} variant="h5">
              {currAttraction?.direction || "No direction available"}
            </Typography>
          </Box>
        </Grid>

<<<<<<< HEAD
        <MapLocator
          latitude={currAttraction.latitude}
          longitude={currAttraction.longitude}
          name={currAttraction.name}
        />

        <Recommendation nearby={nearby} responsive={responsive} />
=======
        {/* MAP LOCATION */}
        <Grid item xs={3}>
          <Box display="flex" alignItems="center">
            {!isLoading && currAttraction?.latitude && currAttraction?.latitude && (
              <MapLocator
                latitude={currAttraction?.latitude}
                longitude={currAttraction?.longitude}
                name={currAttraction.name}
              />
            )}
          </Box>
        </Grid>

        <Grid item xs={12}>
          {nearby.length > 0 ? (
            <Card>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <RoofingIcon />
                <CardHeader title="Recommended Accommodations" />
              </Box>
              <Divider />
              <Carousel
                responsive={responsive}
                autoPlay={true}
                swipeable={true}
                draggable={true}
                showDots={true}
                infinite={true}
                transitionDuration={10000}
                partialVisible={false}
                dotListClass="custom-dot-list-style"
              >
                {nearby.map((accommodation, index) => {
                  return (
                    <div
                      className="slider"
                      key={index}
                      style={{
                        objectFit: "cover",
                        width: "90%",
                        height: "80%",
                      }}
                    >
                      <Link
                        to={`/accommodations/${accommodation.id}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <img
                          src={
                            accommodation.image
                              ? `http://localhost:4000/images/accommodations/${accommodation.image}`
                              : "http://localhost:4000/images/accommodations/image-placeholder.jpg"
                          }
                          alt={`${accommodation.name}`}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                        <Typography
                          variant="h4"
                          sx={{
                            fontSize: "0.9rem",
                            textAlign: "center",
                          }}
                        >
                          {accommodation?.name} - {accommodation?.price}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontSize: "0.9rem",
                            textAlign: "center",
                          }}
                        >
                          {accommodation?.status || "No status available"}
                        </Typography>
                      </Link>
                    </div>
                  );
                })}
              </Carousel>
            </Card>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", ml: 5 }}>
              <RoofingIcon />
              <Typography sx={{ ml: 2 }}>
                No accommodations near the area
              </Typography>
            </Box>
          )}
        </Grid>
>>>>>>> 886ab8f (fix: page filters)
      </Grid>
    </Container>
  );
}
