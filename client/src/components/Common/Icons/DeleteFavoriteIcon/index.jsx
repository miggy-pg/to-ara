import { Navigate } from "react-router";

import { FormControlLabel, Checkbox } from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function DeleteFavorite(props) {
  const { detailId, isFavorite, isAuth, setFavorite } = props;

  const handleDeleteFavorite = (id) => {
    !isAuth && <Navigate to="user/login" />;

    isAuth &&
      setFavorite((favoriteAccomodation) =>
        favoriteAccomodation.filter(
          (attr) => parseInt(attr.id) !== parseInt(id)
        )
      );
  };

  return (
    <FormControlLabel
      onClick={() => handleDeleteFavorite(detailId)}
      control={
        <Checkbox
          icon={<FavoriteOutlinedIcon />}
          checkedIcon={<FavoriteBorderOutlinedIcon />}
          checked={isFavorite}
          name="checkedH"
        />
      }
    />
  );
}
