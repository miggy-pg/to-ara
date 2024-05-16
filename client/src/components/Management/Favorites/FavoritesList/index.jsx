import { Grid } from "@mui/material";

import FavoritesTable from "../FavoritesTable";
import { useMemo, useState } from "react";
import { getFavoriteAttractions } from "../../../../api/attraction";
import { getFavoriteAccommodations } from "../../../../api/accommodation";
import { getFavoriteFestival } from "../../../../api/festival";

export default function FavoritesList() {
   const [favoriteAttractions, setFavoriteAttractions] = useState([]);
  const [favoriteAccommodations, setFavoriteAccommodations] = useState([]);
  const [favoriteFestivals, setFavoriteFestivals] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userId"))

  //  const favoriteAccommodations = localStorage.getItem("favoriteAccommodations");
   
  //  const favoriteFestivals = localStorage.getItem("favoriteFestivals");
   
   const attrs = useMemo(() => {
      const getAttractionFavorites = async () => {
        const favorites = await getFavoriteAttractions(userId) 
        setFavoriteAttractions(favorites.data)

        const favoriteAccommodations = await getFavoriteAccommodations(userId)
        setFavoriteAccommodations(favoriteAccommodations.data)

        const favoriteFestivals = await getFavoriteFestival(userId)
        setFavoriteFestivals(favoriteFestivals.data)
     }
     getAttractionFavorites()
   },[userId]);

   console.log("attrs: ", attrs);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FavoritesTable
          header="Attractions"
          favorites={favoriteAttractions ? favoriteAttractions : []}
        />
        <FavoritesTable
          header="Accommodations"
          favorites={
            favoriteAccommodations ? favoriteAccommodations : []
          }
        />
        <FavoritesTable
          header="Festivals"
          favorites={favoriteFestivals ? favoriteFestivals : []}
        />
      </Grid>
    </Grid>
  );
}
