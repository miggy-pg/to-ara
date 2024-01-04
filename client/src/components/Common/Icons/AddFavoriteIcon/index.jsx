import { useNavigate } from "react-router";

import { FormControlLabel, Checkbox } from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function AddFavorite(props) {
  const { isAuth, isFavorite, favorite, detailId, setFavorite } = props;

  const navigate = useNavigate();

  const handleAddFavorite = (accomodation) => {
    setFavorite((curAccomodation) => [...curAccomodation, accomodation]);
  };

  const handleAdd = () => {
    !isAuth && navigate("/user/login");

    const newFavorite = {
      image: favorite.image,
      name: favorite.name,
      description: favorite.description,
      id: detailId,
    };

    isAuth && !isFavorite && handleAddFavorite(newFavorite);
  };
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
