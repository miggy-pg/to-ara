import { TextField, Button, Switch, Typography, Box } from "@mui/material";

export default function UserEdit({
  values,
  handleSwitchChange,
  handleClose,
  onSubmit,
  onChange,
}) {
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <TextField
        id="name"
        name="name"
        label="Name"
        variant="outlined"
        onChange={(e) => onChange(e)}
        defaultValue={values.name}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        onChange={(e) => onChange(e)}
        defaultValue={values.email}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        id="password"
        name="password"
        label="Password"
        variant="outlined"
        onChange={(e) => onChange(e)}
        defaultValue={values.password}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        id="phone"
        name="phone"
        label="Phone"
        variant="outlined"
        onChange={(e) => onChange(e)}
        defaultValue={values.phone}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        id="address"
        name="address"
        label="Address"
        variant="outlined"
        onChange={(e) => onChange(e)}
        defaultValue={values.address}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", alignItems: "Center" }}>
        <Typography>Admin</Typography>
        <Switch
          checked={values.admin}
          onChange={(e) => handleSwitchChange(e)}
          inputProps={{ "aria-label": "Is admin?" }}
        />
      </Box>
      <br />
      <Button type="submit" variant="contained">
        Update
      </Button>
      <Button
        onClick={handleClose}
        variant="contained"
        color="error"
        sx={{
          ml: 2,
        }}
      >
        Close
      </Button>
    </form>
  );
}
