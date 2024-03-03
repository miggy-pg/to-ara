import styled from "styled-components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  TextField,
  Button,
  Autocomplete,
  Grid,
  Box,
  Typography,
  Switch,
} from "@mui/material";
import { amenities } from "../../../../constants/amenities";
import { accommodationStatus } from "../../../../constants/accommodationStatus";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CreateAccomodation({
  setAmenities,
  handleAccommodationStatus,
  handleFileChange,
  handleClose,
  onSubmit,
  onChange,
}) {
  return (
    <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            onChange={(e) => onChange(e)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            id="price"
            name="price"
            label="Price"
            variant="outlined"
            onChange={(e) => onChange(e)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            id="longitude"
            name="longitude"
            label="Longitude"
            variant="outlined"
            onChange={(e) => onChange(e)}
            fullWidth
            sx={{ mb: 2 }}
            inputProps={{
              placeholder: "E.g., -73.935242",
            }}
          />
          <TextField
            id="latitude"
            name="latitude"
            label="Latitude"
            variant="outlined"
            onChange={(e) => onChange(e)}
            fullWidth
            sx={{ mb: 2 }}
            inputProps={{
              placeholder: "E.g., 40.935242",
            }}
          />
          <TextField
            id="address"
            name="address"
            label="Address"
            variant="outlined"
            onChange={(e) => onChange(e)}
            fullWidth
            sx={{ mb: 2 }}
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
            id="location-autocomplete"
            options={accommodationStatus}
            fullWidth
            sx={{ mb: 2 }}
            renderInput={(params) => <TextField {...params} label="Select" />}
          />
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 5, mt: 3 }}
          >
            Upload image
            <VisuallyHiddenInput
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            id="contact"
            name="contact"
            label="Contact"
            variant="outlined"
            onChange={(e) => onChange(e)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            onChange={(e) => onChange(e)}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <TextField
            id="direction"
            name="direction"
            label="Direction"
            variant="outlined"
            onChange={(e) => onChange(e)}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />

          <Autocomplete
            multiple
            id="multiple-value-autocomplete"
            options={amenities}
            getOptionLabel={(option) => option.label}
            onChange={(event, newValue) => {
              // When the value changes, update the state with the selected values
              setAmenities(
                newValue.reduce(
                  (acc, val) => ({ ...acc, [val.value]: val.label }),
                  {}
                )
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Amenities"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }} justifyContent="center" container>
          <Button type="submit" variant="contained">
            Create
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            sx={{ ml: 2 }}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
