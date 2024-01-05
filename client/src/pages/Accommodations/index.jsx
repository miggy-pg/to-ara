import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Box, Container, Grid, useMediaQuery } from "@mui/material";

import CustomMenu from "../../components/Common/CustomMenu";
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

  console.log(
    "selector: ",
    useSelector((store) => store.accommodation)
  );

  const searchResults = accommodations;

  const [items, setItems] = useState();

  // useState for searchbar
  const [queryAccommodations, setQueryAccommodations] = useState("");

  // useState for for accommodation status if fully-booked or not
  const [accommodationStatus, setAccommodationStatus] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // for filter attractions
  const [filterLocation, setFilterLocation] = useState("");

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
        setItems(
          searchResults.filter((accommodation) =>
            accommodation.address
              ?.toLowerCase()
              .includes(filterLocation.toLowerCase())
          )
        );
    } catch (err) {
      console.log(err);
    } finally {
      setFilterLocation("");
      setAccommodationStatus("");
      setMinPrice("");
      setMaxPrice("");
    }
  };

  useEffect(() => {
    setItems(accommodations);
  }, [accommodations]);

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
        {/* <CustomMenu
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
          }}
          accommodations={accommodations}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        /> */}

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
            <Grid container>
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
                ))}
            </Grid>
            <CustomPagination
              itemsLength={!isLoading && accommodations.length}
              setIndexOfLastItem={setIndexOfLastItem}
              setIndexOfFirstItem={setIndexOfFirstItem}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
