import {
  CardContent,
  Typography,
  Divider,
  Card,
  Box,
  TableContainer,
  Table,
  TableBody,
} from "@mui/material";

import FavoritesTableRow from "../FavoritesTableRow";
import CustomPagination from "../../../Common/CustomPagination";
import { useState } from "react";

export default function FavoritesTable({ header, favorites }) {
  // We are using custom pagination hook
  const [indexOfLastItem, setIndexOfLastItem] = useState(null);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(null);
  const currPageItems = favorites.slice(indexOfFirstItem, indexOfLastItem);
<<<<<<< HEAD
  
=======

>>>>>>> 886ab8f (fix: page filters)
  return (
    <Card>
      <Box
        p={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            {header}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <CardContent sx={{ p: 4 }}>
        <TableContainer>
          <Box
            sx={{
              overflow: {
                lg: "auto",
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <Table
              aria-label="simple table"
              sx={{
                mt: 1,
                whiteSpace: "nowrap",
              }}
            >
              <TableBody>
                {favorites.length > 0 ? (
                  currPageItems.map((favorite) => (
                    <FavoritesTableRow
                      key={favorite.id}
                      props={favorite}
                      routePath={header}
                    />
                  ))
                ) : (
                  <Typography variant="h6">No favorites</Typography>
                )}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
        {favorites.length > 0 ? (
          <CustomPagination
            itemPageSize={4}
            itemsLength={favorites.length}
            setIndexOfLastItem={setIndexOfLastItem}
            setIndexOfFirstItem={setIndexOfFirstItem}
          />
        ) : null}
      </CardContent>
    </Card>
  );
}
