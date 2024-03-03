import { Grid, Box, Typography } from "@mui/material";
import StatCard from "../../components/Management/Dashboard/StatCard";
import { getLoggedInUser } from "../../api/user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFestivals } from "../../redux/store/festivalSlice";
import { getFestivals } from "../../api/festival";
import { getAccommodations } from "../../api/accommodation";
import { setAccommodations } from "../../redux/store/accommodationSlice";
import { getAttractions } from "../../api/attraction";
import { setAttractions } from "../../redux/store/attractionsSlice";

export default function DashboardFeature() {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    contact: "",
  });

  const festivals = useSelector((store) => store.festival.festivals.data);
  const accommodations = useSelector(
    (store) => store.accommodation.accommodations.data
  );
  const attractions = useSelector((store) => store.attraction.attractions.data);

  // Fetch all the data we needed since we are using redux
  // We need to trigger them again
  useEffect(() => {
    async function fetchUser() {
      console.log();
      const { data: currUser } = await getLoggedInUser();
      setUserData((currData) => ({
        ...currData,
        ...currUser?.data?.user?.[0],
      }));
    }
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
    fetchUser();
  }, [dispatch]);

  useEffect(() => {});

  return (
    <Box>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography color="textSecondary" variant="h3" sx={{ m: 3 }}>
            Hi! Welcome back
          </Typography>
          <Typography variant="h1" sx={{ m: 3, fontSize: "3rem" }}>
            {userData.name}
          </Typography>
          <Typography variant="h5" sx={{ m: 3 }}>
            Here&apos;s what&apos;s happening with your site today
          </Typography>

          <Grid container spacing={3}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <StatCard count={festivals?.length} label="Festivals" />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <StatCard count={accommodations?.length} label="Accommodations" />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <StatCard count={attractions?.length} label="Attractions" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
