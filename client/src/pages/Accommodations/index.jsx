import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
<<<<<<< HEAD

import { Box, Container, Grid, useMediaQuery } from "@mui/material";

import CustomMenu from "../../components/Common/CustomMenu";
=======
import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";

import Menu from "../../components/Common/Menu";
>>>>>>> 886ab8f (fix: page filters)
import CustomCard from "../../components/Common/CustomCard";
import useGetAccommodations from "../../hooks/useGetAccommodation";
import AccommodationFilter from "../../components/Management/Accommodations/AccommodationFilter";
import useLocalStorageState from "../../hooks/useLocalStorageState";
import CustomPagination from "../../components/Common/CustomPagination";

export default function Accommodations() {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const { isAuth } = useSelector((state) => state.auth);

  // Since we are using redux, we can get the accommodations data from the store
  const accommodations = useSelector(
    (store) => store.accommodation.accommodations.data
  );
<<<<<<< HEAD

  console.log(
    "selector: ",
    useSelector((store) => store.accommodation)
  );

=======
>>>>>>> 886ab8f (fix: page filters)
  const searchResults = accommodations;

  const [items, setItems] = useState();

  // useState for searchbar
  const [queryAccommodations, setQueryAccommodations] = useState("");

  // useState for for accommodation status if fully-booked or not
  const [accommodationStatus, setAccommodationStatus] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

<<<<<<< HEAD
  // for filter attractions
  const [filterLocation, setFilterLocation] = useState("");
=======
  // useState for filter attractions
  const [filterLocation, setFilterLocation] = useState();
>>>>>>> 886ab8f (fix: page filters)

  // We are using custom pagination hook
  const [indexOfLastItem, setIndexOfLastItem] = useState(null);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(null);

  const [favorite, setFavorite] = useLocalStorageState(
    [],
    "favoriteAccommodations"
  );

  const navigate = useNavigate();

  // Fetch accommodations from our custom hook
  const { isLoading } = useGetAccommodations();

  const handleAddFavorite = (accommodation) => {
    !isAuth && navigate("/user/login");

    isAuth &&
      setFavorite((currAccommodation) => [...currAccommodation, accommodation]);
  };

  const handleOnClickSearch = (e) => {
    e.preventDefault();

    queryAccommodations.length > 3 &&
      setItems(
        searchResults
          .filter((item) =>
            item.name.toLowerCase().includes(queryAccommodations.toLowerCase())
          )
          .slice(indexOfFirstItem, indexOfLastItem)
      );

    !queryAccommodations.length && setItems(searchResults);
  };

  const handleChangeLocation = (e) => {
    setFilterLocation(e.target.textContent);

    !e.target.textContent.length && setItems(searchResults);
  };

  const handleAccommodationStatus = (e) => {
    setAccommodationStatus(e.target.textContent);

    !e.target.textContent.length && setItems(searchResults);
  };

  const handleFilterAccommodations = (e) => {
    e.preventDefault();

<<<<<<< HEAD
    const priceRange = minPrice?.length > 0 && maxPrice?.length > 0;

    try {
      filterLocation.length > 0 &&
        priceRange &&
        accommodationStatus.length > 0 &&
        setItems(
          searchResults
            .filter((attraction) =>
              attraction.address
                ?.toLowerCase()
                .includes(filterLocation.toLowerCase())
            )
            .filter(
              (attr) =>
                attr.entrance_fee >= minPrice && attr.entrance_fee <= maxPrice
            )
            .filter(
              (accommodation) => accommodation?.status === accommodationStatus
            )
        );
      !filterLocation &&
        priceRange &&
        setItems(
          searchResults.filter(
            (attr) => attr.price >= minPrice && attr.price <= maxPrice
          )
        );

      accommodationStatus.length > 0 &&
        setItems(
          searchResults.filter(
            (accommodation) => accommodation?.status === accommodationStatus
          )
        );

      filterLocation.length > 0 &&
=======
      const filterNotAll = !minPrice?.length && maxPrice?.length && !accommodationStatus?.length
      const filterNoStatusAndLoc = !accommodationStatus?.length && !filterLocation?.length
      const noPrice = !minPrice?.length && !maxPrice?.length


      if (filterLocation?.length > 0 &&
        minPrice?.length > 0 &&
        maxPrice?.length > 0 &&
        accommodationStatus?.length > 0) {
          setItems(
            searchResults
              .filter((attraction) =>
                attraction.address
                  ?.toLowerCase()
                  .includes(filterLocation.toLowerCase())
              )
              .filter(
                (attr) =>
                  attr.entrance_fee >= minPrice && attr.entrance_fee <= maxPrice
              )
              .filter(
                (accommodation) => accommodation?.status === accommodationStatus
              )
          );
          console.log("1")
      }
      if(minPrice?.length > 0 &&  maxPrice?.length > 0 && filterLocation?.length > 0 && !accommodationStatus?.length > 0){
          const accoms = searchResults.filter(
            (attr) =>( Number(attr.price) >= Number(minPrice)) && (Number(attr.price) <= Number(maxPrice))
          )
          setItems(
            accoms.filter((accommodation) =>
              accommodation.address
                ?.toLowerCase()
                .includes(filterLocation.toLowerCase())
            )
          )
             console.log("here")
      }

      if(minPrice?.length > 0 &&
        maxPrice?.length > 0 && accommodationStatus?.length > 0 && !filterLocation?.length > 0 ){
          const accoms = searchResults.filter(
            (attr) =>( Number(attr.price) >= Number(minPrice)) && (Number(attr.price) <= Number(maxPrice))
          )
          setItems(
            accoms.filter(
              (accommodation) => accommodation?.status == accommodationStatus)
          )
             console.log("here")
      }

      if(minPrice?.length > 0 &&
        maxPrice?.length > 0 && !accommodationStatus?.length > 0 && !filterLocation?.length > 0){
          setItems(
            searchResults.filter(
              (attr) =>( Number(attr?.price) >= Number(minPrice)) && (Number(attr?.price) <= Number(maxPrice))
            )
          );
             console.log("2") 
      }
      if (filterLocation?.length > 0 && accommodationStatus?.length > 0 && !minPrice?.length > 0 && !maxPrice?.length  > 0){
        setItems(
          searchResults.filter((accommodation) =>
            accommodation.address
              ?.toLowerCase()
              .includes(filterLocation.toLowerCase())
          ).filter(
            (accommodation) => accommodation?.status == accommodationStatus
          )
        );
        console.log("3")
      } 
      if (filterLocation?.length > 0 && !minPrice?.length > 0 && !maxPrice?.length > 0 && !accommodationStatus?.length  > 0){
>>>>>>> 886ab8f (fix: page filters)
        setItems(
          searchResults.filter((accommodation) =>
            accommodation.address
              ?.toLowerCase()
              .includes(filterLocation.toLowerCase())
          )
        );
<<<<<<< HEAD
    } catch (err) {
      console.log(err);
    } finally {
      setFilterLocation("");
      setAccommodationStatus("");
      setMinPrice("");
      setMaxPrice("");
    }
  };

=======
      
      } 
      if (accommodationStatus?.length > 0 && !minPrice?.length > 0 && !maxPrice?.length > 0 && !filterLocation?.length > 0){
        setItems(
          searchResults.filter(
            (accommodation) => accommodation?.status === accommodationStatus
          )
        );
        console.log("4")
      }
   

  };

  
  console.log("filterLocation: ", filterLocation)
  console.log("minPrice: ", minPrice)
  console.log("maxPrice: ", maxPrice)
  console.log("accommodationsStatus:: ", accommodationStatus)
>>>>>>> 886ab8f (fix: page filters)
  useEffect(() => {
    setItems(accommodations);
  }, [accommodations]);

<<<<<<< HEAD
=======

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
        {/* <CustomMenu
=======
        <Menu
>>>>>>> 886ab8f (fix: page filters)
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
          }}
          accommodations={accommodations}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
<<<<<<< HEAD
        /> */}
=======
        />
>>>>>>> 886ab8f (fix: page filters)

        <Grid container>
          <Grid item xs={12} lg={3}>
            <AccommodationFilter
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              handleAccommodationStatus={handleAccommodationStatus}
              setAccommodationStatus={setAccommodationStatus}
              handleFilterAccommodations={handleFilterAccommodations}
              handleChangeLocation={handleChangeLocation}
              handleOnClickSearch={handleOnClickSearch}
              setQueryAccommodations={setQueryAccommodations}
            />
          </Grid>
          <Grid item xs={12} lg={9}>
<<<<<<< HEAD
            <Grid container>
=======
            {/* <Grid container>
>>>>>>> 886ab8f (fix: page filters)
              {!isLoading &&
                items.length > 0 &&
                items.map((accommodation) => (
                  <CustomCard
                    key={accommodation.id}
                    props={accommodation}
                    favorite={favorite}
                    isType="accommodations"
                    onAddFavorite={handleAddFavorite}
                  />
<<<<<<< HEAD
                ))}
            </Grid>
            <CustomPagination
              itemsLength={!isLoading && accommodations.length}
              setIndexOfLastItem={setIndexOfLastItem}
              setIndexOfFirstItem={setIndexOfFirstItem}
            />
=======
                ))
                }
            </Grid> */}
             {!isLoading && <Grid container>
              {!isLoading &&
              items?.length ? 
                items.map((accommodation) => (
                  <CustomCard
                    key={accommodation.id}
                    props={accommodation}
                    favorite={favorite}
                    isType="accommodations"
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
                    No accommodation found
                  </Typography>}
            </Grid>
            }

            {!isLoading && queryAccommodations?.length && <CustomPagination
              itemsLength={
                !queryAccommodations.length &&
                items?.length < accommodations?.length
                  ? items?.length < accommodations?.length
                    ? items?.length
                    : accommodations?.length
                  : items?.length
              }
              setIndexOfLastItem={setIndexOfLastItem}
              setIndexOfFirstItem={setIndexOfFirstItem}
            /> || ""}
>>>>>>> 886ab8f (fix: page filters)
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
