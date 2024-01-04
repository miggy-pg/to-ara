import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { Typography, Container, Box, Grid, useMediaQuery } from "@mui/material";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import PlaceIcon from "@mui/icons-material/Place";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

import CustomMenu from "../../../Common/CustomMenu";
import MapLocator from "../../../Common/MapLocator";
import useLocalStorageState from "../../../../hooks/useLocalStorageState";
import { getAccommodation } from "../../../../api/accommodation";

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

  const [favorite, setFavorite] = useLocalStorageState(
    [],
    "favoriteAccommodations"
  );

  const isFavorite = favorite
    ?.map((accomodation) => String(accomodation.id))
    .includes(id);

  const [isSidebarOpen] = useState(true);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  useEffect(() => {
    async function getAPIAccomodation() {
      try {
        const { data: accommodation, isLoading } = await getAccommodation(id);
        setAccommodation(accommodation?.accommodation[0]);
        setIsLoading(isLoading);
      } catch (error) {
        console.log(error);
      }
    }
    getAPIAccomodation();
  }, []);

  if (isLoading) return;

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
          <CardCover record={accommodation} recordPath="accommodations" />
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
            {accommodation.status == "Available" ? (
              <Typography sx={StatusType(true)} variant="h5">
                Available
              </Typography>
            ) : (
              <Typography sx={StatusType(false)} variant="h5">
                Unavailable
              </Typography>
            )}

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
                  favorite={accommodation}
                  setFavorite={setFavorite}
                  detailId={id}
                />
              )}
              <Typography sx={{ ml: 0 }} variant="h4" component="div">
                <h1>{accommodation?.name || "No name available"}</h1>
              </Typography>
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              {accommodation?.description ||
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
                    {accommodation?.address || "No address available"}
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
                    {accommodation?.price || "No price available"}
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
              {(String(accommodation?.amenities).length > 0 &&
                String(accommodation.amenities) !== "null" &&
                String(accommodation.amenities)
                  .split(",")
                  .map((amenity) => (
                    <Typography key={amenity} variant="h6" sx={amenitiesStyle}>
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
              {accommodation?.direction || "No direction available"}
            </Typography>
          </Box>
        </Grid>

        <MapLocator
          latitude={accommodation.latitude}
          longitude={accommodation.longitude}
          name={accommodation.name}
        />
      </Grid>
    </Container>
  );
}
