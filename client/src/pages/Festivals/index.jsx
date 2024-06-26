import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";

import Menu from "../../components/Common/Menu";
import CustomCard from "../../components/Common/CustomCard";
import FestivalFilter from "../../components/Management/Festivals/FestivalFilter";
import useGetFestivals from "../../hooks/useGetFestivals";
import useLocalStorageState from "../../hooks/useLocalStorageState";
import CustomPagination from "../../components/Common/CustomPagination";
import { addToFavoriteFestival, getFavoriteFestival } from "../../api/festival";

export default function Festivals() {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const userId = JSON.parse(localStorage.getItem("userId"))

  // Since we are using redux, we can get the festivals data from the store
  const { isAuth } = useSelector((state) => state.auth);

  const festivals = useSelector((store) => store.festival.festivals.data);
  const searchResults = festivals;

  const [items, setItems] = useState();

  const [queryFestivals, setQueryFestivals] = useState("");

  const [filterLocation, setFilterLocation] = useState();
  const [fromDateRange, setFromDateRange] = useState("");
  const [toDateRange, setToDateRange] = useState("");

  // We are using custom pagination hook
  const [indexOfLastItem, setIndexOfLastItem] = useState(null);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(null);

  const [favorite, setFavorite] = useLocalStorageState([], "favoriteFestivals");

  const navigate = useNavigate();

  // Fetch festivals from our custom hook
  const { isLoading } = useGetFestivals();

  // const handleAddFavorite = (attraction) => {
  //   !isAuth && navigate("/user/login");

  //   isAuth && setFavorite((curFestival) => [...curFestival, attraction]);
  // };
  const handleAddFavorite = async (id) => {
    try {
    !isAuth && <Navigate to="user/login" />;

      await addToFavoriteFestival(id, userId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnClickSearch = (e) => {
    e.preventDefault();

    queryFestivals.length > 3 &&
      setItems(
        searchResults
          .filter((item) =>
            item.name.toLowerCase().includes(queryFestivals.toLowerCase())
          )
          .slice(indexOfFirstItem, indexOfLastItem)
      );

    !queryFestivals.length && setItems(searchResults);
  };

  const handleChangeLocation = (e) => {
    setFilterLocation(e.target.textContent);
    !e.target.textContent.length && setItems(searchResults);
  };

  const handleFilterFestivals = (e) => {
    e.preventDefault();

    
    console.log("fromDateRange")

      if (filterLocation?.length > 0 &&
        fromDateRange?.length > 0 &&
        toDateRange?.length > 0 ) {
          setItems(
            searchResults
              .filter((attraction) =>
                attraction?.address
                  ?.toLowerCase()
                  .includes(filterLocation?.toLowerCase())
              )
              .filter(
                (festival) =>
                  new Date(festival?.festival_date).setHours(0, 0, 0, 0) >=
                    new Date(String(fromDateRange)).setHours(0, 0, 0, 0) &&
                  new Date(festival?.festival_date).setHours(0, 0, 0, 0) <=
                    new Date(String(toDateRange)).setHours(0, 0, 0, 0)
              )
          );
  
      }else if (fromDateRange?.length > 0 &&
        toDateRange?.length > 0){
          setItems(
            searchResults.filter(
              (festival) =>
                new Date(festival.festival_date).setHours(0, 0, 0, 0) >=
                  new Date(String(fromDateRange)).setHours(0, 0, 0, 0) &&
                new Date(festival.festival_date).setHours(0, 0, 0, 0) <=
                  new Date(String(toDateRange)).setHours(0, 0, 0, 0)
            )
          );
      }else{
        setItems(
          searchResults.filter((attraction) =>
            attraction.address
              ?.toLowerCase()
              .includes(filterLocation.toLowerCase())
          )
        );
      }
  }
    

  useEffect(() => {
    setItems(festivals);
    const getFavorites = async () => {
      const favoriteAttractions = await getFavoriteFestival(userId)
      setFavorite(favoriteAttractions.data);
    }
    getFavorites()

  }, [festivals]);

  return (
    <Box
      id="hero"
      sx={{
        backgroundColor: "background.paper",
        position: "relative",
        pt: 17,
        pb: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Menu
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
          }}
          festivals={festivals}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />

        <Grid container>
          <Grid item xs={12} lg={3}>
            <FestivalFilter
              fromDateRange={fromDateRange}
              setFromDateRange={setFromDateRange}
              toDateRange={toDateRange}
              setToDateRange={setToDateRange}
              handleFilterFestivals={handleFilterFestivals}
              handleOnClickSearch={handleOnClickSearch}
              handleChangeLocation={handleChangeLocation}
              setQueryFestivals={setQueryFestivals}
            />
          </Grid>
          <Grid item xs={12} lg={9}>
            {!isLoading && <Grid container>
              {!isLoading &&
              items?.length ? 
                items.map((festival) => (
                  <CustomCard
                    key={festival.id}
                    props={festival}
                    favorite={favorite}
                    isType="festivals"
                    onAddFavorite={handleAddFavorite}
                  />
                ))
              :
              <Typography
                    sx={{
                      fontSize: "28px",
                      fontWeight: "500",
                    }}
                  >
                    No festival found
                  </Typography>}
            </Grid>
            }
            {!isLoading && queryFestivals?.length && <CustomPagination
              itemsLength={
                !queryFestivals.length &&
                items?.length < festivals?.length
                  ? items?.length < festivals?.length
                    ? items?.length
                    : festivals?.length
                  : items?.length
              }
              setIndexOfLastItem={setIndexOfLastItem}
              setIndexOfFirstItem={setIndexOfFirstItem}
            /> || ""}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
