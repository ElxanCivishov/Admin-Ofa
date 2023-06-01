import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import MainLayout from "./components/layout/MainLayout";
import Jams from "./pages/products/Jams";
import PackageProducts from "./pages/products/PackageProducts";
import Gallery from "./pages/gallery/Gallery";
import Recipes from "./pages/recipes/Recipes";
import DryFruits from "./pages/products/DryFruits";
import FeatureList from "./components/utils/list/FeatureList";
import AddProduct from "./components/product/AddProduct";
import Recipe from "./components/recipe/Recipe";
import ErrorPage from "./pages/errorPage/ErrorPage";
import NotFound from "./pages/notFound/NotFound";
import EditRecipe from "./components/recipe/EditRecipe";
import EditProduct from "./components/product/EditProduct";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    // {
    //   path: "/register",
    //   element: <Register />,
    // },
    {
      path: "/errorpage",
      element: <ErrorPage />,
    },

    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFound />,
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
          element: <AddProduct />,
        },
        {
          path: "/edit-product/:id",
          element: <EditProduct />,
        },
        {
          path: "/gallery",
          element: <Gallery />,
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
          element: <EditRecipe />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
