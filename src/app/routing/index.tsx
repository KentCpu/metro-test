import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { HomePage } from "@pages/home";
import { NotFoundPage } from "@pages/not-found";
import { Layout } from "./Layout";
import { Routes } from "@shared/constants";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: Routes.Home,
        element: <HomePage />,
      },
      {
        path: Routes.NotFound,
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
