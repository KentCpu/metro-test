import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { HomePage } from "@pages/home";
import { NotFoundPage } from "@pages/notFound";
import { Layout } from "./Layout";
import { Routes } from "@shared/constants";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

const router = createBrowserRouter(
  [
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
  ],
  { basename: basename || undefined }
);

export function Router() {
  return <RouterProvider router={router} />;
}
