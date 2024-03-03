import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import PlaceIcon from "@mui/icons-material/Place";
import Carousel from "react-multi-carousel";
import RoofingIcon from "@mui/icons-material/Roofing";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { styled } from "@mui/material/styles";

import Menu from "../../../Common/Menu";
import MapLocator from "../../../Common/MapLocator";
import useLocalStorageState from "../../../../hooks/useLocalStorageState";
import findNearbyCoordinates from "../../../../utils/findNearbyCoordinates";
import { getFestival } from "../../../../api/festival";

import "./styles.css";
import "react-multi-carousel/lib/styles.css";
import { formatLongDate } from "../../../../utils/formatDate";
import { getAccommodations } from "../../../../api/accommodation";

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;
    .MuiCardMedia-root {
      height: ${theme.spacing(46)};
    }
`
);

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

export default function FestivalDetail() {
  const { isAuth } = useSelector((state) => state.auth);

  const [accommodations, setAccommodations] = useState({})
  const [festivals, setFestivals] = useState({});
  const [currFestival, setCurrFestival] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const [favorite, setFavorite] = useLocalStorageState([], "favoriteFestivals");

  const isFavorite = favorite
    ?.map((festival) => String(festival.id))
    .includes(id);

  const [isSidebarOpen] = useState(true);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleDeleteFavorite = (id) => {
    !isAuth && <Navigate to="user/login" />;

    isAuth &&
      setFavorite((favoriteFestival) =>
        favoriteFestival.filter((attr) => parseInt(attr.id) !== parseInt(id))
      );
  };

  const handleAddFavorite = (festival) => {
    setFavorite((curFestival) => [...curFestival, festival]);
  };

  const handleAdd = () => {
    !isAuth && navigate("/user/login");

    const newAddedFavorite = {
      image: currFestival.image,
      name: currFestival.name,
      description: currFestival.description,
      id: id,
    };
    isAuth && !isFavorite && handleAddFavorite(newAddedFavorite);
  };

  useEffect(() => {
    async function getAPIFestival() {
      try {
        const { data: currFestival, isLoading } = await getFestival(id);
        setFestivals(currFestival?.data?.festivals);
        setCurrFestival(currFestival?.data?.currFestival?.[0]);
        setIsLoading(isLoading);
      } catch (error) {
        console.log(error);
      }
    }
    getAPIFestival();
  }, []);
  
  useEffect(() => {
    async function fetchAccommodations() {
      const { data: accoms } = await getAccommodations();
      const { data: accommodations } = accoms
      setAccommodations(accommodations)
    }
    fetchAccommodations()
  },[])

  const nearby = findNearbyCoordinates(
    isLoading,
    currFestival.latitude,
    currFestival.longitude,
    !isLoading && accommodations
  );

  return (
    <Container
      sx={{ mt: 15, pb: 6, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)" }}
      maxWidth="lg"
    >
      <Menu
        sx={{
          paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={0.7}>
          <Box display="flex" alignItems="center">
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
                currFestival?.image
                  ? `http://localhost:4000/images/festivals/${currFestival?.image}`
                  : "http://localhost:4000/images/festivals/image_placeholder.jpg"
              }
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          </CardCover>
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
                <h1>{currFestival.name}</h1>
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ mb: "1rem" }} color="text.primary">
              {formatLongDate(currFestival?.festival_date)}
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 2, pr: 10 }}>
              {currFestival.description ||
                "No description available for this festival"}
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
                    {currFestival?.address || "No address available"}
                  </strong>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* MAP LOCATION */}
        <Grid item xs={3}>
          <Box display="flex" alignItems="center">
            {!isLoading && currFestival?.latitude && currFestival?.longitude && (
              <MapLocator
                latitude={currFestival?.latitude}
                longitude={currFestival?.longitude}
                name={currFestival?.name}
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
                            accommodation?.image
                              ? `http://localhost:4000/images/accommodations/${accommodation?.image}`
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
      </Grid>
    </Container>
  );
}
