import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useSelector } from "react-redux";

import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";

import Menu from "../../components/Common/Menu";
import CustomCard from "../../components/Common/CustomCard";
import FilterAttraction from "../../components/Management/Attractions/FilterAttraction";
import useGetAttractions from "../../hooks/useGetAttractions";
import useLocalStorageState from "../../hooks/useLocalStorageState";
import CustomPagination from "../../components/Common/CustomPagination";
import { addToFavoriteAttraction, getFavoriteAttractions } from "../../api/attraction";
import axios from "axios";
import { addToFavoriteAccommodation } from "../../api/accommodation";

export default function Attractions() {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const userId = JSON.parse(localStorage.getItem("userId"))
  // Since we are using redux, we can get the attractions data from the store
  const { isAuth } = useSelector((state) => state.auth);

  const attractions = useSelector((store) => store.attraction.attractions.data);
  const searchResults = attractions;

  const [items, setItems] = useState();
  const [favorite, setFavorite] = useState([]);

  // useState for searchbar
  const [queryAttractions, setQueryAttractions] = useState("");

  // useState for filter attractions
  const [filterLocation, setFilterLocation] = useState();

  // We are using custom pagination hook
  const [indexOfLastItem, setIndexOfLastItem] = useState(null);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(null);

  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");

  // const [favorite, setFavorite] = useLocalStorageState(
  //   [],
  //   "favoriteAttractions"
  // );



  const navigate = useNavigate();

  // Fetch attractions from our custom hook
  const { isLoading } = useGetAttractions();

  const handleAddFavorite = async (id) => {
    try {
    !isAuth && <Navigate to="user/login" />;

      await addToFavoriteAttraction(id, userId);
    } catch (err) {
      console.log(err);
    }
  };


  // const handleAddFavorite = (attraction) => {
  //   !isAuth && navigate("/user/login");

  //   isAuth && setFavorite((curAttraction) => [...curAttraction, attraction]);
  // };

  const handleOnClickSearch = (e) => {
    e.preventDefault();

    queryAttractions.length > 3 &&
      setItems(
        searchResults
          .filter((item) =>
            item.name.toLowerCase().includes(queryAttractions.toLowerCase())
          )
          .slice(indexOfFirstItem, indexOfLastItem)
      );

    !queryAttractions.length && setItems(searchResults);
  };

  const handleChangeLocation = (e) => {
    setFilterLocation(e.target.textContent);
    !e.target.textContent.length && setItems(searchResults);
  };

  const handleFilterAttractions = (e) => {
    e.preventDefault();
    
      if (filterLocation?.length > 0 &&
        minFee?.length > 0 &&
        maxFee?.length > 0 ) {
          setItems(
            searchResults
              .filter((attraction) =>
                attraction.address
                  ?.toLowerCase()
                  .includes(filterLocation?.toLowerCase())
              )
              .filter(
                (attr) => (Number(attr.entrance_fee) >= Number(minFee)) &&( Number(attr.entrance_fee) <= Number(maxFee))
              )
          );
  
      }else if(minFee?.length > 0 &&
        maxFee?.length > 0){
          setItems(
            searchResults.filter(
              (attr) =>
                Number(attr.entrance_fee) >= Number(minFee) &&
                Number(attr.entrance_fee) <= Number(maxFee)
            )
          );
      }
      else{
        setItems(
          searchResults.filter((attraction) =>
            attraction.address
              ?.toLowerCase()
              .includes(filterLocation.toLowerCase())
          )
        );
      }
    

  };
  
  useEffect(() => {
    const getAttractions = async() => {
      try{
  
        setItems(attractions);
        const favoriteAttractions = await getFavoriteAttractions(userId)
        setFavorite(favoriteAttractions.data);
      }catch(err){
        console.log();
      }
    }
    getAttractions();
  }, [attractions]);

  // !isLoading && !queryAttractions.length
  //   ? items?.length < attractions?.length
  //     ? attractions?.length
  //     : items?.length
  //   : items?.length;

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
          attractions={attractions}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />

        <Grid container>
          <Grid item xs={12} lg={3}>
            <FilterAttraction
              filterLocation={filterLocation}
              handleChangeLocation={handleChangeLocation}
              minFee={minFee}
              setMinFee={setMinFee}
              maxFee={maxFee}
              setMaxFee={setMaxFee}
              handleFilterAttractions={handleFilterAttractions}
              handleOnClickSearch={handleOnClickSearch}
              setQueryAttractions={setQueryAttractions}
            />
          </Grid>
          <Grid item xs={12} lg={9}>
            <Grid container>
            {/* {!isLoading && <Grid container>
              {!isLoading &&
              items?.length ? 
                items.map((attraction) => (
                    <CustomCard
                      key={attraction.id}
                      props={attraction}
                      favorite={favorite}
                      isType="attractions"
                      onAddFavorite={handleAddFavorite}
                    />
                  ))
                  .slice(indexOfFirstItem, indexOfLastItem)
                } */}
              {!isLoading && <Grid container>
                {!isLoading &&
                items?.length ? 
                  items.map((attraction) => (
                    <CustomCard
                      key={attraction.id}
                      props={attraction}
                      favorite={favorite}
                      isType="attractions"
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
                      No attraction found
                    </Typography>}
              </Grid>
              }
            </Grid>
            {!isLoading && queryAttractions?.length && <CustomPagination
              itemsLength={items?.length < attractions?.length
                  ? items?.length < attractions?.length
                    ? items?.length
                    : attractions?.length
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
