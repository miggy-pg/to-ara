// @mui material components
import { Container, Grid, Box, Tabs, Tab, useMediaQuery } from "@mui/material";
import { useState } from "react";
<<<<<<< HEAD
import CustomMenu from "../../components/Common/CustomMenu";
=======
import Menu from "../../components/Common/Menu";
>>>>>>> 886ab8f (fix: page filters)
import useLocalStorageState from "../../hooks/useLocalStorageState";
import styled from "styled-components";
import ProfileUserDetails from "../../components/Management/ProfileUserDetails";
import Favorites from "../../components/Management/Favorites/FavoritesList";

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

const tabs = [
  { value: "profile", label: "Profile" },
  { value: "favorites", label: "Favorites" },
];

export default function Profile() {
  const [queryAtractions, setQueryAttractions] = useState({});
  const [currentTab, setCurrentTab] = useState("profile");

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const [favorite, setFavorite] = useLocalStorageState(
    [],
    "favoriteAttractions"
  );

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Box
      id="hero"
      sx={{
        backgroundColor: "background.paper",
        position: "relative",
        pt: 15,
        pb: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg">
<<<<<<< HEAD
        <CustomMenu
=======
        <Menu
>>>>>>> 886ab8f (fix: page filters)
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
          }}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          setQueryAttractions={setQueryAttractions}
        />

        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12}>
              <TabsWrapper
                onChange={handleTabsChange}
                value={currentTab}
                variant="scrollable"
                scrollButtons="auto"
                textColor="primary"
                indicatorColor="primary"
              >
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </TabsWrapper>
            </Grid>
            <Grid item xs={12}>
              {currentTab === "profile" && <ProfileUserDetails />}
              {currentTab === "favorites" && <Favorites />}
            </Grid>
          </Grid>
        </Container>
      </Container>
    </Box>
  );
}
