import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { Typography, Container, Box, Grid, useMediaQuery } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";

import AddFavoriteIcon from "../../../Common/Icons/AddFavoriteIcon";
import BackButton from "../../../Common/Buttons/BackButton";
import CardCover from "../../../Common/CardCover";
import CustomMenu from "../../../Common/CustomMenu";
import DeleteFavoriteIcon from "../../../Common/Icons/DeleteFavoriteIcon";
import MapLocator from "../../../Common/MapLocator";
import Recommendation from "../../../Common/Recommedation";
import useLocalStorageState from "../../../../hooks/useLocalStorageState";
import { getFestival } from "../../../../api/festival";
import { findNearbyCoordinates } from "../../../../utils/findNearbyCoordinates";
import { formatLongDate } from "../../../../utils/formatDate";

import "react-multi-carousel/lib/styles.css";
import "./styles.css";

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
  const { id } = useParams();
  const { isAuth } = useSelector((state) => state.auth);

  const [accommodations, setAccommodations] = useState({});
  const [currFestival, setCurrFestival] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [favorite, setFavorite] = useLocalStorageState([], "favoriteFestivals");

  const isFavorite = favorite
    ?.map((festival) => String(festival.id))
    .includes(id);

  const [isSidebarOpen] = useState(true);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  useEffect(() => {
    async function getAPIFestival() {
      try {
        const { data: currFestival, isLoading } = await getFestival(id);
        setAccommodations(currFestival?.data?.accommodations);
        setCurrFestival(currFestival?.data?.currFestival?.[0]);
        setIsLoading(isLoading);
      } catch (error) {
        console.log(error);
      }
    }
    getAPIFestival();
  }, []);

  if (isLoading) return;

  const nearby = findNearbyCoordinates(
    isLoading,
    currFestival.latitude,
    currFestival.longitude,
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
          <CardCover record={currFestival} recordPath="festivals" />

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
                  favorite={currFestival}
                  setFavorite={setFavorite}
                  detailId={id}
                />
              )}
              <Typography sx={{ ml: 0 }} variant="h4" component="div">
                <h1>{currFestival?.name}</h1>
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

        <MapLocator
          latitude={currFestival?.latitude}
          longitude={currFestival?.longitude}
          name={currFestival?.name}
        />

        <Recommendation nearby={nearby} responsive={responsive} />
      </Grid>
    </Container>
  );
}
