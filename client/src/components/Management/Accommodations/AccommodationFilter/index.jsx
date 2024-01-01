import {
  Autocomplete,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import { barangays } from "../../../../constants/barangays";
import { accommodationStatus } from "../../../../constants/accommodationStatus";

export default function AccommodationFilter({
  filterLocation,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  handleAccommodationStatus,
  handleFilterAccommodations,
  handleChangeLocation,
  handleOnClickSearch,
  setQueryAccommodations,
}) {
  return (
    <CardContent
      sx={{
        width: "80%",
        padding: "0 !important",
        pb: "0 !important",
      }}
    >
      <TextField
        label="Search"
        onChange={(e) => setQueryAccommodations(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton onClick={handleOnClickSearch}>
                <SearchIcon/>
              </IconButton>
            </InputAdornment>
          ),
        }}
        size="small"
        sx={{ mb: 3 }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "h3.fontSize",
              marginBottom: "0",
            }}
            gutterBottom
          >
            Filter
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography
          color="textSecondary"
          sx={{
            fontSize: "14px",
            marginLeft: "0.1rem",
            marginBottom: "0.5rem",
          }}
        >
          Location
        </Typography>
        <Autocomplete
          disablePortal
          onChange={handleChangeLocation}
          value={filterLocation}
          id="location-autocomplete"
          options={barangays}
          fullWidth
          groupBy={(option) => option.city}
          sx={{ mb: 2 }}
          renderInput={(params) => <TextField {...params} label="Select" />}
        />
        <Typography
          color="textSecondary"
          sx={{
            fontSize: "14px",
            marginLeft: "0.1rem",
            marginBottom: "0.5rem",
          }}
        >
          Status
        </Typography>
        <Autocomplete
          disablePortal
          onChange={handleAccommodationStatus}
          value={filterLocation}
          id="location-autocomplete"
          options={accommodationStatus}
          fullWidth
          sx={{ mb: 2 }}
          renderInput={(params) => <TextField {...params} label="Select" />}
        />
        <Typography
          color="textSecondary"
          sx={{
            fontSize: "14px",
            marginLeft: "0.1rem",
            marginBottom: "0.5rem",
          }}
        >
          Price
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Minimum"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              sx={{ height: "20%", width: "100%", fontSize: "10px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Maximum"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              sx={{ height: "20%", width: "100%", fontSize: "10px" }}
            />
          </Grid>
        </Grid>
      </Box>
      <Button
        type="submit"
        onClick={handleFilterAccommodations}
        variant="contained"
        size="small"
        sx={{ mt: 5 }}
      >
        <FilterAltIcon sx={{ width: "1rem", height: "1rem" }} />
        Filter
      </Button>
    </CardContent>
  );
}
