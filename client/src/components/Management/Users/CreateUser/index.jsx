import { TextField, Button, Switch, Typography, Box } from "@mui/material";

export default function CreateAttraction({
  error,
  handleSwitchChange,
  handleClose,
  onSubmit,
  onChange,
}) {
  return (
    <>
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
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          onChange={(e) => onChange(e)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          onChange={(e) => onChange(e)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          id="phone"
          name="phone"
          label="Phone"
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
        <Box sx={{ display: "flex", alignItems: "Center" }}>
          <Typography>Admin</Typography>
          <Switch
            onChange={(e) => handleSwitchChange(e)}
            inputProps={{ "aria-label": "Is admin?" }}
          />
        </Box>
        <Typography color="error">{error}</Typography>
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
    </>
  );
}
