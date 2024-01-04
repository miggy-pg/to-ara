import { Link } from "react-router-dom";

import {
  Typography,
  Card,
  Box,
  Grid,
  Divider,
  CardHeader,
} from "@mui/material";
import Carousel from "react-multi-carousel";
import RoofingIcon from "@mui/icons-material/Roofing";

export default function Recommendation(props) {
  const { nearby, responsive } = props;

  return (
    <Grid item xs={12}>
      {nearby.length > 0 ? (
        <Card>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <RoofingIcon />
            <CardHeader title="Recommended Accommodations" />
          </Box>
          <Divider />
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            transitionDuration={10000}
            partialVisible={false}
            dotListClass="custom-dot-list-style"
          >
            {nearby.map((accommodation, index) => {
              return (
                <div
                  className="slider"
                  key={index}
                  style={{
                    objectFit: "cover",
                    width: "90%",
                    height: "80%",
                  }}
                >
                  <Link
                    to={`/accommodations/${accommodation.id}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <img
                      src={
                        accommodation?.image
                          ? `http://localhost:4000/images/accommodations/${accommodation.image}`
                          : `http://localhost:4000/images/accommodations/image-placeholder.jpg`
                      }
                      alt={`${accommodation?.name}`}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: "0.9rem",
                        textAlign: "center",
                      }}
                    >
                      {accommodation?.name} -
                      {accommodation?.price || "No price"}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: "0.9rem",
                        textAlign: "center",
                      }}
                    >
                      {accommodation?.status || "No status available"}
                    </Typography>
                  </Link>
                </div>
              );
            })}
          </Carousel>
        </Card>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", ml: 5 }}>
          <RoofingIcon />
          <Typography sx={{ ml: 2 }}>
            No accommodations near the area
          </Typography>
        </Box>
      )}
    </Grid>
  );
}
