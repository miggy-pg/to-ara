import {
  Autocomplete,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import { barangays } from "../../../../constants/barangays";

export default function FilterAttraction({
  filterLocation,
  handleChangeLocation,
  handleFilterAttractions,
  handleOnClickSearch,
  setQueryAttractions,
  minFee,
  maxFee,
  setMinFee,
  setMaxFee,
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
        onChange={(e) => setQueryAttractions(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon onClick={handleOnClickSearch} />
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
          Entrance Fee
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Minimum"
              type="number"
              value={minFee}
              onChange={(e) => setMinFee(e.target.value)}
              sx={{ height: "20%", width: "100%", fontSize: "10px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Maximum"
              type="number"
              value={maxFee}
              onChange={(e) => setMaxFee(e.target.value)}
              sx={{ height: "20%", width: "100%", fontSize: "10px" }}
            />
          </Grid>
        </Grid>
      </Box>
      <Button
        type="submit"
        onClick={handleFilterAttractions}
        variant="contained"
        size="small"
      >
        <FilterAltIcon sx={{ width: "1rem", height: "1rem" }} />
        Filter
      </Button>
    </CardContent>
  );
}
