import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

import { useLoggedIn } from "../../config/Hooks";
import { ToastContainer } from "react-toastify";
import Loader from "../utils/Loader";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

import "./layout.scss";

const MainLayout = () => {
  const queryClient = new QueryClient();
  const isLoggedIn = useLoggedIn();

  const [openSidebar, setOpenSidebar] = useState(true);

  if (isLoggedIn === null) {
    return (
      <div
        className="d-flex align-items-center justify-content-center "
        style={{ height: "400px" }}
      >
        <Loader />
      </div>
    );
  } else if (isLoggedIn === false) {
    return <Navigate replace to="/login" />;
  } else if (isLoggedIn === true) {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <div className="main">
            <Sidebar openSidebar={openSidebar} />
            <div className="content">
              <Navbar
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
              <Outlet />
            </div>
          </div>
          <ToastContainer />
        </QueryClientProvider>
      </>
    );
  }
};

export default MainLayout;
