import { Grid } from "@mui/material";

import FavoritesTable from "../FavoritesTable";

export default function FavoritesList() {
  const favoriteAttractions = localStorage.getItem("favoriteAttractions");

  const favoriteAccommodations = localStorage.getItem("favoriteAccommodations");

  const favoriteFestivals = localStorage.getItem("favoriteFestivals");

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FavoritesTable
          header="Attractions"
          favorites={favoriteAttractions ? JSON.parse(favoriteAttractions) : []}
        />
        <FavoritesTable
          header="Accommodations"
          favorites={
            favoriteAccommodations ? JSON.parse(favoriteAccommodations) : []
          }
        />
        <FavoritesTable
          header="Festivals"
          favorites={favoriteFestivals ? JSON.parse(favoriteFestivals) : []}
        />
      </Grid>
    </Grid>
  );
}
