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
  console.log("setFavorite", `favorite${routePath}`);

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
            <img src={image} width="100px" height="100px" />
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
