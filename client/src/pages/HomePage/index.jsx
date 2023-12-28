import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  FormControl,
  styled,
  Typography,
  useMediaQuery,
  Autocomplete,
  TextField,
} from "@mui/material";

import Menu from "../../components/Common/Menu";
import "./styles.css";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

export default function HomePage() {
  const [navigate, setNavigate] = useState("");

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <Box
      id="hero"
      sx={{
        backgroundColor: "background.paper",
        position: "relative",
        pt: 17,
        pb: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Menu
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
            backgroundColor: "#ffffff",
          }}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          page="home"
        />
        <MainContent>
          <Container
            maxWidth="md"
            sx={{
              height: { xs: "22rem", lg: "20rem" },
            }}
          >
            <Box textAlign="center">
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{ my: 1, mb: 4 }}
              >
                They say the world has seven wonders. We say there are more
                wonders to look for in <br /> Lanao del Norte and Iligan City!
              </Typography>
            </Box>
            <Container maxWidth="xs">
              <Box textAlign="center">
                <FormControl variant="outlined" fullWidth>
                  <Autocomplete
                    disablePortal
                    id="home-page-dropdown"
                    options={homepageMenus}
                    onChange={(e) => setNavigate(e.target.textContent)}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="What are you looking for?"
                      />
                    )}
                  />
                </FormControl>
                <Button
                  variant="contained"
                  sx={{ mt: 4 }}
                  size="large"
                  component={Link}
                  to={navigate.toLowerCase()}
                >
                  Take me there
                </Button>
              </Box>
            </Container>
          </Container>
        </MainContent>
        <div className="banner" />
      </Container>
    </Box>
  );
}

const homepageMenus = [
  { label: "Attractions" },
  { label: "Festivals" },
  { label: "Accommodations" },
  { label: "Map" },
];
