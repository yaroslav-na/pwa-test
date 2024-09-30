import React, { FC } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Home, Layout, LogIn } from "./pages";
import { AuthProvider } from "./auth";

const routes = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <AuthProvider mustBeLogedIn={true} redirect={"/log-in"}>
            <Home />
          </AuthProvider>
        ),
      },
      {
        path: "log-in",
        element: (
          <AuthProvider mustBeLogedIn={false} redirect={"/"}>
            <LogIn />
          </AuthProvider>
        ),
      },
    ],
  },
]);

export const App: FC = () => {
  return <RouterProvider router={routes} />;
};
