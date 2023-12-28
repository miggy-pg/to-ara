import {
  Autocomplete,
  Card,
  CardContent,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  TextField,
  Slider,
  Button,
} from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";

import { barangays } from "../../../constants/barangays";
import { amenities } from "../../../constants/amenities";

const icon = <CheckBoxOutlineBlankOutlinedIcon fontSize="small" />;
const checkedIcon = <CheckBoxOutlinedIcon fontSize="small" />;

export default function Filter() {
  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log(ev);
  };

  return (
    <Card
      sx={{
        pb: 0,
      }}
    >
      <CardContent
        sx={{
          pb: "0 !important",
        }}
      >
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

        <form onSubmit={(e) => onSubmit(e)}>
          <Box
            sx={{
              mb: 2,
            }}
          >
            <Autocomplete
              disablePortal
              id="location-autocomplete"
              options={barangays}
              fullWidth
              groupBy={(option) => option.city}
              renderInput={(params) => (
                <TextField {...params} label="Location" />
              )}
            />
            <Slider defaultValue={30} aria-label="slider" />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<CheckBoxOutlineBlankOutlinedIcon fontSize="small" />}
                  checkedIcon={<CheckBoxOutlinedIcon fontSize="small" />}
                  name="check-available-accomodation"
                />
              }
              label="Available"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<CheckBoxOutlineBlankOutlinedIcon fontSize="small" />}
                  checkedIcon={<CheckBoxOutlinedIcon fontSize="small" />}
                  name="check-fully-booked-accomodation"
                />
              }
              label="Fully Booked"
            />
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={amenities}
              disableCloseOnSelect
              groupBy={(option) => option.amenityLabel}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ margin: 0 }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Amenities"
                  placeholder="Favorites"
                />
              )}
            />
          </Box>
          <Button type="submit">Filter</Button>
        </form>
      </CardContent>
    </Card>
  );
}
