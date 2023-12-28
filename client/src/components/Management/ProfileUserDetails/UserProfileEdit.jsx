import { TextField, Button, Grid } from "@mui/material";

export default function UserProfileEdit({
  onSubmit,
  userData,
  onChange,
  handleClose,
}) {
  return (
    <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
      <Grid container>
        <TextField
          id="name"
          name="name"
          label="Name"
          onChange={(e) => onChange(e)}
          defaultValue={userData.name}
          type="text"
          variant="outlined"
          sx={{
            mb: 2,
          }}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          onChange={(e) => onChange(e)}
          defaultValue={userData.email}
          type="email"
          variant="outlined"
          sx={{
            mb: 2,
          }}
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          onChange={(e) => onChange(e)}
          defaultValue={userData.password}
          type="password"
          variant="outlined"
          sx={{
            mb: 2,
          }}
        />

        <TextField
          id="address"
          name="address"
          label="Address"
          onChange={(e) => onChange(e)}
          defaultValue={userData.address}
          type="text"
          variant="outlined"
          sx={{
            mb: 2,
          }}
        />
        <TextField
          id="contact"
          name="contact"
          label="Contact"
          onChange={(e) => onChange(e)}
          defaultValue={userData.contact}
          type="text"
          variant="outlined"
          sx={{
            mb: 2,
          }}
        />
        <Grid item xs={12} justifyContent="center" container>
          <Button onClick={onSubmit} type="submit" variant="contained">
            Update
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
