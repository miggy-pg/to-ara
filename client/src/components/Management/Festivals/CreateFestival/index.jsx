import styled from "styled-components";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TextField, Button, Input } from "@mui/material";

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

export default function CreateFestival({
  handleFileChange,
  handleClose,
  onSubmit,
  onChange,
}) {
  return (
    <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
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
        id="address"
        name="address"
        label="Address"
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
      <Input
        id="festival_date"
        name="festival_date"
        type="date"
        label="Festival Date"
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
      <Button
        component="label"
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        sx={{ mb: 3 }}
      >
        Upload image
        <VisuallyHiddenInput
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
      <br />

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
    </form>
  );
}
