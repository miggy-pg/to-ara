import { Link, Navigate, useLocation } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { addToFavoriteAttraction } from "../../../api/attraction";
import { addToFavoriteAccommodation } from "../../../api/accommodation";
import { addToFavoriteFestival } from "../../../api/festival";
import { useSelector } from "react-redux";

export default function CustomCard({ props, favorite, isType, addFavorite }) {
  const { id: selectedId, image, name, description } = props;
  const { isAuth } = useSelector((state) => state.auth);

  const location = useLocation() 
  const handleAddFavorite = async (id) => {
    try {
      !isAuth && <Navigate to="user/login" />;

      if (location.pathname == "/attractions") {
        await addToFavoriteAttraction(id);
      } else if (location.pathname == "/accommodations") {
        await addToFavoriteAccommodation(id);
      } else if (location.pathname == "/festivals") {
        await addToFavoriteFestival(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isFavorite = favorite
    .map((attraction) => attraction.id)
    .includes(selectedId);
  // const handleAdd = () => {
  //   const newAddedFavorite = {
  //     image: image,
  //     name: name,
  //     description: description,
  //     id: selectedId,
  //   };
  //   !isFavorite && onAddFavorite(newAddedFavorite);
  // };

  function removeLastWordExceedingChars(inputString) {
    if (inputString.length > 23) {
      const words = inputString.split(" ");
      words.pop();
      return words.join(" ");
    }
    return inputString;
  }

  return (
    <Grid
      key={selectedId}
      item
      xs={12}
      lg={4}
      sx={{
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          p: 0,
          width: "100%",
        }}
      >
        <img
          src={
            image
              ? `http://localhost:4000/images/${isType}/${image}`
              : `http://localhost:4000/images/${isType}/image-placeholder.jpg`
          }
          alt="img"
          width="100%"
          height="265rem"
        />
        <CardContent
          sx={{
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
        >
          <Typography
            sx={{
              fontSize: "h4.fontSize",
              fontWeight: "500",
            }}
          >
            {removeLastWordExceedingChars(name)}
          </Typography>
          <Typography
            color="textSecondary"
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              mt: 1,
              minHeight: "9rem",
            }}
          >
            {description || "No description available for this record."}
          </Typography>
          {isType === "accommodations" && (
            <Typography
              color="textSecondary"
              sx={{
                fontSize: "0.9rem",
                fontWeight: "400",
                m: 1,
              }}
            >
              <strong>₱&nbsp;{props.price || "No price available"}</strong>
            </Typography>
          )}
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link to={`/${isType}/${selectedId}`}>
              <Button
                variant="contained"
                sx={{
                  mt: "0.9rem",
                }}
              >
                Read More
              </Button>
            </Link>
            {!isFavorite && (
              <FormControlLabel
                sx={{
                  mt: "0.9rem",
                  mr: 0,
                }}
                onClick={()=>handleAddFavorite(selectedId)}
                control={
                  <Checkbox
                    icon={<FavoriteOutlinedIcon />}
                    checked={false}
                    checkedIcon={<FavoriteBorderOutlinedIcon />}
                    name="checkedH"
                  />
                }
              />
            )}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
