import { useEffect, useState } from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { MapContainer } from "react-leaflet/MapContainer";
import { Marker, Popup } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";

import CustomMenu from "../../components/Common/CustomMenu";
import "leaflet/dist/leaflet.css";
import { getAttractions } from "../../api/attraction";
import useGetAttractions from "../../hooks/useGetAttractions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFestivals } from "../../api/festival";
import { getAccommodations } from "../../api/accommodation";
import { setAttractions } from "../../redux/store/attractionsSlice";
import { setAccommodations } from "../../redux/store/accommodationSlice";
import { setFestivals } from "../../redux/store/festivalSlice";

const mapCenter = [7.98912823180871, 124.0208416308243];

export default function Map() {
  const { isLoading } = useGetAttractions();
  const attractions = useSelector((store) => store.attraction.attractions.data);
  const festivals = useSelector((store) => store.festival.festivals.data);
  const accommodations = useSelector(
    (store) => store.accommodation.accommodations.data
  );

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const dispatch = useDispatch();
  // Fetch all the data we needed since we are using redux
  // We need to trigger them again
  useEffect(() => {
    async function fetchFestivals() {
      const { data: festivals } = await getFestivals();
      dispatch(setFestivals(festivals));
    }

    async function fetchAccommodations() {
      const { data: accommodations } = await getAccommodations();
      dispatch(setAccommodations(accommodations));
    }

    async function fetchAttractions() {
      const { data: attractions } = await getAttractions();
      dispatch(setAttractions(attractions));
    }

    fetchAttractions();
    fetchAccommodations();
    fetchFestivals();
  }, [dispatch]);

  return (
    <Box
      id="hero"
      sx={{
        backgroundColor: "background.paper",
        position: "relative",
        pt: 15,
        pb: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          gutterBottom
          align="center"
          sx={{
            fontSize: "2.5rem",
          }}
        >
          Browse Map
        </Typography>
        <CustomMenu
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
            backgroundColor: "#ffffff",
          }}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />

        <MapContainer
          center={mapCenter}
          // dragging={false}
          // scrollWheelZoom={true}
          // zoomControl={false}
          zoom={10}
          style={{ width: "80%", height: "calc(100vh - 4rem)", margin: "auto" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!isLoading &&
            attractions.map((attraction, index) => (
              <div key={index}>
                <Marker position={[attraction.latitude, attraction.longitude]}>
                  <Popup>
                    <Link to={`/attractions/${attraction.id}`}>
                      {attraction.name}
                    </Link>
                  </Popup>
                </Marker>
              </div>
            ))}
          {!isLoading &&
            festivals.map((festival, index) => (
              <div key={index}>
                <Marker position={[festival.latitude, festival.longitude]}>
                  <Popup>
                    <Link to={`/festivals/${festival.id}`}>
                      {festival.name}
                    </Link>
                  </Popup>
                </Marker>
              </div>
            ))}
          {!isLoading &&
            accommodations.map((festival, index) => (
              <div key={index}>
                <Marker position={[festival.latitude, festival.longitude]}>
                  <Popup>
                    <Link to={`/accommodations/${festival.id}`}>
                      {festival.name}
                    </Link>
                  </Popup>
                </Marker>
              </div>
            ))}
        </MapContainer>
      </Container>
    </Box>
  );
}
