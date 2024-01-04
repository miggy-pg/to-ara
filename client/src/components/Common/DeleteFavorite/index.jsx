import { FormControlLabel, Checkbox } from "@mui/material";

import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function DeleteFavorite({ handleAdd }) {
  return (
    <FormControlLabel
      onClick={handleAdd}
      control={
        <Checkbox
          icon={<FavoriteOutlinedIcon />}
          checkedIcon={<FavoriteBorderOutlinedIcon />}
          checked={false}
          name="checkedH"
        />
      }
    />
  );
}
