import { Link } from "react-router-dom";

import { Button, Box, TableRow, TableCell, Typography } from "@mui/material";

import useLocalStorageState from "../../../../hooks/useLocalStorageState";
import { trimSentence } from "../../../../utils/trimSentence";
import { deleteFromFavoriteAttraction } from "../../../../api/attraction";
import { deleteFromFavoriteFestival } from "../../../../api/festival";
import { deleteFromFavoriteAccommodation } from "../../../../api/accommodation";

export default function FavoritesTableRow({ props, routePath }) {
  const { id, image, name, description } = props;
  console.log("props", props);

  console.log("setFavorite", `favorite${routePath}`);

  // const handleDeleteFavorite = (id) => {
  //   setFavorite((favorite) =>
  //     favorite.filter((attr) => parseInt(attr.id) !== parseInt(id))
  //   );
  // };

  const handleDeleteFavorite = async(id) => {
    try {
      if (routePath === "Attractions") {
        await deleteFromFavoriteAttraction(id);
      }
      else if (routePath === "Accommodations") {
        await deleteFromFavoriteAccommodation(id);
      }
      else if (routePath === "Festivals") {
        await deleteFromFavoriteFestival(id);
      }
    }catch (err){
      console.log(err);
    }
  }
  
  return (
    <>
      <TableRow>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            <img src={
            image
              ? `http://localhost:4000/images/${routePath}/${image}`
              : `http://localhost:4000/images/${routePath}/image-placeholder.jpg`
          
          } width="100px" height="100px" />
          </Typography>
        </TableCell>
        <TableCell>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                }}
              >
                {name}
              </Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {trimSentence(description, 50) ||
              "No description included in this record"}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Button
            component={Link}
            to={`/${routePath?.toLowerCase()}/${id}`}
            variant="contained"
            color="primary"
            size="small"
            sx={{
              mr: 1,
              mb: 1,
            }}
          >
            View
          </Button>
          <Button
            onClick={() => handleDeleteFavorite(id)}
            variant="contained"
            color="error"
            size="small"
            sx={{
              mr: 1,
              mb: 1,
            }}
          >
            Remove
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
