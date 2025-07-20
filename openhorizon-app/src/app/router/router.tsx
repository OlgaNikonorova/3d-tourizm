import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import AuthPage from "../../pages/authPage/authPage";
import HomePage from "../../pages/homePage/homePage";
import { NotFoundPage } from "../../pages/notFoundPage/notFoundPage";
import ProfilePage from "../../pages/profilePage/profilePage";
import ResetPasswordPage from "../../pages/resetPasswordPage/resetPasswordPage";
import { AppLayout } from "../layout/appLayout";
import ProtectedLayout from "../layout/protectedLayout";
import PublicLayout from "../layout/publicLayout";
import FavoritesPage from "../../pages/favoritesPage/favoritesPage";

import CreateCityPage from "../../pages/createCityPage/createCityPage";
import CityPage from "../../pages/cityPage/cityPage";
import ScrollToTop from "../../widgets/scrollToTop/scrollToTop";
import EditCityPage from "../../pages/updateCityPage/updateCityPage";

const publicRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/city/:id",
    element: <CityPage />,
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/favorites",
    element: <FavoritesPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/create-city",
    element: <CreateCityPage editMode={true} />,
  },
  {
    path: "/edit-city/:id",
    element: <EditCityPage />,
  },
];

const routes: RouteObject[] = [
  {
    element: (
      <>
        <ScrollToTop />
        <AppLayout />
      </>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        element: <PublicLayout />,
        children: publicRoutes,
      },
      {
        element: <ProtectedLayout />,
        children: protectedRoutes,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes, { basename: "/" });
