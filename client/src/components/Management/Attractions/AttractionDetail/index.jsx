import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { getAttraction } from "../../../../api/attraction";

import "./styles.css";
import "react-multi-carousel/lib/styles.css";

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
  const { id } = useParams();

  const { isAuth } = useSelector((state) => state.auth);

  const [accommodations, setAccommodations] = useState({});
  const [currAttraction, setCurrAttraction] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [favorite, setFavorite] = useLocalStorageState(
    [],
    "favoriteAttractions"
  );

  const isFavorite = favorite
    ?.map((attraction) => String(attraction.id))
    .includes(id);

  const [isSidebarOpen] = useState(true);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  useEffect(() => {
    async function getAPIAttraction() {
      try {
        const { data: currAttraction, isLoading } = await getAttraction(id);
        setAccommodations(currAttraction?.data?.accommodations);
        setCurrAttraction(currAttraction?.data?.currAttraction?.[0]);
        setIsLoading(isLoading);
      } catch (error) {
        console.log(error);
      }
    }
    getAPIAttraction();
  }, []);

  if (isLoading) return;

  const nearby = findNearbyCoordinates(
    isLoading,
    currAttraction.latitude,
    currAttraction.longitude,
    accommodations
  );

  return (
    <Container
      sx={{ mt: 15, pb: 6, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)" }}
      maxWidth="lg"
    >
      <CustomMenu
        sx={{
          paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={0.7}>
          <Box display="flex" alignItems="center">
            <BackButton />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <CardCover record={currAttraction} recordPath="attractions" />

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

        <MapLocator
          latitude={currAttraction.latitude}
          longitude={currAttraction.longitude}
          name={currAttraction.name}
        />

        <Recommendation nearby={nearby} responsive={responsive} />
      </Grid>
    </Container>
  );
}
