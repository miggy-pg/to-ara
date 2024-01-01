import {
  Autocomplete,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Input,
  Divider,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import { barangays } from "../../../../constants/barangays";

export default function FestivalFilter({
  fromDateRange,
  setFromDateRange,
  toDateRange,
  setToDateRange,
  handleFilterFestivals,
  handleOnClickSearch,
  handleChangeLocation,
  setQueryFestivals,
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
        onChange={(e) => setQueryFestivals(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
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
          id="location-autocomplete"
          options={barangays}
          fullWidth
          groupBy={(option) => option.city}
          onChange={handleChangeLocation}
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
          Festival Date
        </Typography>
        <Divider />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Typography
              color="textSecondary"
              sx={{
                fontSize: "14px",
                marginLeft: "0.1rem",
                marginBottom: "0.5rem",
              }}
            >
              From
            </Typography>
            <Input
              placeholder="From"
              type="date"
              variant="outlined"
              value={fromDateRange}
              onChange={(e) => setFromDateRange(e.target.value)}
              sx={{ height: "100%", width: "100%", fontSize: "10px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              color="textSecondary"
              sx={{
                fontSize: "14px",
                marginLeft: "0.1rem",
                marginBottom: "0.5rem",
              }}
            >
              To
            </Typography>
            <Input
              placeholder="To"
              type="date"
              variant="outlined"
              value={toDateRange}
              onChange={(e) => setToDateRange(e.target.value)}
              sx={{ height: "100%", width: "100%", fontSize: "10px" }}
            />
          </Grid>
        </Grid>
      </Box>
      <Button
        type="submit"
        onClick={handleFilterFestivals}
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
