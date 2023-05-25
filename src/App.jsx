import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import Jams from "./pages/products/Jams";
import PackageProducts from "./pages/products/PackageProducts";
import Gallery from "./pages/gallery/Gallery";
import Recipes from "./pages/recipes/Recipes";
import DryFruits from "./pages/products/DryFruits";
import FeatureList from "./components/utils/list/featureList";
import Product from "./pages/products/Product";
import Recipe from "./pages/recipes/Recipe";
import Add from "./pages/gallery/Add";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/dry-fruits",
          element: <DryFruits />,
        },
        {
          path: "/jams",
          element: <Jams />,
        },
        {
          path: "/package-products",
          element: <PackageProducts />,
        },
        {
          path: "/feature-list/:id",
          element: <FeatureList />,
        },
        {
          path: "/add-product",
          element: <Product />,
        },
        {
          path: "/edit-product/:id",
          element: <Product />,
        },
        {
          path: "/gallery",
          element: <Gallery />,
        },
        {
          path: "/add-gallery",
          element: <Add />,
        },
        {
          path: "/recipes",
          element: <Recipes />,
        },
        {
          path: "/recipe",
          element: <Recipe />,
        },
        {
          path: "/recipe/:id",
          element: <Recipe />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
