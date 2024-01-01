import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

import CustomMenu from "../../../Common/CustomMenu";
import MapLocator from "../../../Common/MapLocator";
import useLocalStorageState from "../../../../hooks/useLocalStorageState";
import { getAccommodation } from "../../../../api/accommodation";

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

  const [favorite, setFavorite] = useLocalStorageState(
    [],
    "favoriteAccommodations"
  );

  const isFavorite = favorite
    ?.map((accomodation) => String(accomodation.id))
    .includes(id);

  const [isSidebarOpen] = useState(true);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

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
        setIsLoading(isLoading);
      } catch (error) {
        console.log(error);
      }
    }
    getAPIAccomodation();
  }, []);

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
              </Typography>
            )}

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
                <h1>{currAccomodation?.name || "No name available"}</h1>
              </Typography>
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              {currAccomodation?.description ||
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
                    {currAccomodation?.address || "No address available"}
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
                    {currAccomodation?.price || "No price available"}
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
              {(!isLoading &&
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
              {currAccomodation?.direction || "No direction available"}
            </Typography>
          </Box>
        </Grid>

        {/* MAP LOCATION */}
        <Grid item xs={3}>
          <Box display="flex" alignItems="center">
            {!isLoading && (
              <MapLocator
                latitude={currAccomodation.latitude}
                longitude={currAccomodation.longitude}
                name={currAccomodation.name}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
