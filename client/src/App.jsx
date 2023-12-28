import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";

import AppLayout from "./components/Common/AppLayout";
import AttractionSubPage from "./features/Attractions";
import AttractionDetail from "./components/Management/Attractions/AttractionDetail";
import Attractions from "./pages/Attractions";
import Dashboard from "./pages/Dashboard";
import Festivals from "./pages/Festivals";
import FestivalSubPage from "./features/Festivals";
import HomePage from "./pages/HomePage";
import Login from "./components/Common/Login";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Register from "./components/Common/Register";
import UserSubPage from "./features/User";
import AccommodationSubPage from "./features/Accommodations";
import Accommodations from "./pages/Accommodations";
import AccommodationDetail from "./components/Management/Accommodations/AccommodationDetail";

import { baseTheme } from "./assets/global/theme-variable";
import FestivalDetail from "./components/Management/Festivals/FestivalDetail";
import { Toaster } from "react-hot-toast";

function PrivateRoutes() {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to="user/login" />}</>;
}

function AdminPrivateRoutes() {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  return (
    <>
      {!isAdmin && window.location.pathname.includes("dashboard") && <Outlet />}
    </>
  );
}

function RestrictRoutes() {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/" />}</>;
}

function App() {
  const theme = baseTheme;

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route element={<PrivateRoutes />}>
              <Route element={<AppLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="dashboard/users" element={<UserSubPage />} />
                <Route
                  path="dashboard/attractions"
                  element={<AttractionSubPage />}
                />
                <Route
                  path="dashboard/accommodations"
                  element={<AccommodationSubPage />}
                />
                <Route
                  path="dashboard/festivals"
                  element={<FestivalSubPage />}
                />
              </Route>
              <Route path="user/account/profile" element={<Profile />} />
            </Route>
            <Route element={<RestrictRoutes />}>
              <Route path="user/login" element={<Login />} />
              <Route path="user/register" element={<Register />} />
            </Route>
            <Route path="attractions/" element={<Attractions />} />
            <Route path="attractions/:id" element={<AttractionDetail />} />
            <Route path="festivals/" element={<Festivals />} />
            <Route path="festivals/:id" element={<FestivalDetail />} />
            <Route path="accommodations/" element={<Accommodations />} />
            <Route
              path="accommodations/:id"
              element={<AccommodationDetail />}
            />
            <Route path="map/" element={<Map />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            maxWidth: "600px",
            padding: "16px 24px",
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;
