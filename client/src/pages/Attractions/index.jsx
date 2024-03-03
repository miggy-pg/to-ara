import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

<<<<<<< HEAD
import { Box, Container, Grid, useMediaQuery } from "@mui/material";

import CustomMenu from "../../components/Common/CustomMenu";
=======
import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";

import Menu from "../../components/Common/Menu";
>>>>>>> 886ab8f (fix: page filters)
import CustomCard from "../../components/Common/CustomCard";
import FilterAttraction from "../../components/Management/Attractions/FilterAttraction";
import useGetAttractions from "../../hooks/useGetAttractions";
import useLocalStorageState from "../../hooks/useLocalStorageState";
import CustomPagination from "../../components/Common/CustomPagination";

export default function Attractions() {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Since we are using redux, we can get the attractions data from the store
  const { isAuth } = useSelector((state) => state.auth);

  const attractions = useSelector((store) => store.attraction.attractions.data);
  const searchResults = attractions;

  const [items, setItems] = useState();

  // useState for searchbar
  const [queryAttractions, setQueryAttractions] = useState("");

  // useState for filter attractions
<<<<<<< HEAD
  const [filterLocation, setFilterLocation] = useState("");
=======
  const [filterLocation, setFilterLocation] = useState();
>>>>>>> 886ab8f (fix: page filters)

  // We are using custom pagination hook
  const [indexOfLastItem, setIndexOfLastItem] = useState(null);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(null);

  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");

  const [favorite, setFavorite] = useLocalStorageState(
    [],
    "favoriteAttractions"
  );

  const navigate = useNavigate();

  // Fetch attractions from our custom hook
  const { isLoading } = useGetAttractions();

  const handleAddFavorite = (attraction) => {
    !isAuth && navigate("/user/login");

    isAuth && setFavorite((curAttraction) => [...curAttraction, attraction]);
  };

<<<<<<< HEAD
  // searchbar search location
=======
>>>>>>> 886ab8f (fix: page filters)
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

<<<<<<< HEAD
  // filter attractions by location
=======
>>>>>>> 886ab8f (fix: page filters)
  const handleChangeLocation = (e) => {
    setFilterLocation(e.target.textContent);
    !e.target.textContent.length && setItems(searchResults);
  };

<<<<<<< HEAD
  const priceFilter = minFee.length > 0 && maxFee.length > 0;
  const filterLocationLength = filterLocation.length > 0
=======
  console.log("filterLocation: ", filterLocation)
  console.log("minFee: ", minFee)
  console.log("maxFee: ", maxFee)
>>>>>>> 886ab8f (fix: page filters)

  const handleFilterAttractions = (e) => {
    e.preventDefault();
    
<<<<<<< HEAD
    filterLocationLength > 0 &&
      priceFilter &&
      setItems(
        searchResults
          .filter(
            (attr) => 
            Number(attr.entrance_fee) >= Number(minFee) && 
            Number(attr.entrance_fee) <= Number(maxFee)
            )
          .filter((attraction) =>
=======
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
>>>>>>> 886ab8f (fix: page filters)
            attraction.address
              ?.toLowerCase()
              .includes(filterLocation.toLowerCase())
          )
<<<<<<< HEAD
          
            );
            
    !filterLocationLength && priceFilter &&
      setItems(
        searchResults.filter(
          (attr) =>
            Number(attr.entrance_fee) >= Number(minFee) &&
            Number(attr.entrance_fee) <= Number(maxFee)
        )
      );

    !priceFilter && filterLocationLength > 0 &&
      setItems(
        searchResults.filter((attraction) =>
          attraction.address
            ?.toLowerCase()
            .includes(filterLocation.toLowerCase())
        )
      );
  };


=======
        );
      }
    

  };
  console.log("items: ", items);
>>>>>>> 886ab8f (fix: page filters)
  useEffect(() => {
    setItems(attractions);
  }, [attractions]);

<<<<<<< HEAD
=======
  // !isLoading && !queryAttractions.length
  //   ? items?.length < attractions?.length
  //     ? attractions?.length
  //     : items?.length
  //   : items?.length;
>>>>>>> 886ab8f (fix: page filters)

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
<<<<<<< HEAD
=======
          attractions={attractions}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
>>>>>>> 886ab8f (fix: page filters)
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
<<<<<<< HEAD
              {!isLoading &&
                items.length > 0 &&
                items
                  .map((attraction) => (
=======
            {/* {!isLoading && <Grid container>
              {!isLoading &&
              items?.length ? 
                items.map((attraction) => (
>>>>>>> 886ab8f (fix: page filters)
                    <CustomCard
                      key={attraction.id}
                      props={attraction}
                      favorite={favorite}
                      isType="attractions"
                      onAddFavorite={handleAddFavorite}
                    />
                  ))
<<<<<<< HEAD
                  .slice(indexOfFirstItem, indexOfLastItem)}
            </Grid>
            <CustomPagination
              itemsLength={
                !isLoading &&
                !queryAttractions.length &&
                items?.length < attractions?.length
=======
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
>>>>>>> 886ab8f (fix: page filters)
                  ? items?.length < attractions?.length
                    ? items?.length
                    : attractions?.length
                  : items?.length
              }
              setIndexOfLastItem={setIndexOfLastItem}
              setIndexOfFirstItem={setIndexOfFirstItem}
<<<<<<< HEAD
            />
=======
            /> || ""}
>>>>>>> 886ab8f (fix: page filters)
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
