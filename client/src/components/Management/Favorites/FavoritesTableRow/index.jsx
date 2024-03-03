import { Link } from "react-router-dom";

import { Button, Box, TableRow, TableCell, Typography } from "@mui/material";

import useLocalStorageState from "../../../../hooks/useLocalStorageState";
import { trimSentence } from "../../../../utils/trimSentence";

export default function FavoritesTableRow({ props, routePath }) {
  const { id, image, name, description } = props;

  const [favorite, setFavorite] = useLocalStorageState(
    [],
    `favorite${routePath}`
  );
<<<<<<< HEAD
  console.log("setFavorite", routePath);
=======
  console.log("setFavorite", `favorite${routePath}`);
>>>>>>> 886ab8f (fix: page filters)

  const handleDeleteFavorite = (id) => {
    setFavorite((favorite) =>
      favorite.filter((attr) => parseInt(attr.id) !== parseInt(id))
    );
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
<<<<<<< HEAD
            <img
              src={`http://localhost:4000/images/${routePath.toLowerCase()}/${
                image ? image : "image-placeholder.jpg"
              }`}
              width="100px"
              height="100px"
            />
=======
            <img src={image} width="100px" height="100px" />
>>>>>>> 886ab8f (fix: page filters)
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
<<<<<<< HEAD
            {/* {trimSentence(description, 50) ||
              "No description included in this record"} */}
=======
            {trimSentence(description, 50) ||
              "No description included in this record"}
>>>>>>> 886ab8f (fix: page filters)
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
