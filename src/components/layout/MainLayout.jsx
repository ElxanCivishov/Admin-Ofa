import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { useLoggedIn } from "../../config/Hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./layout.scss";
import { useState } from "react";

const MainLayout = () => {
  const queryClient = new QueryClient();
  const isLoggedIn = useLoggedIn();

  const [openSidebar, setOpenSidebar] = useState(true);

  const handleCloseSideMenu = () => {
    setOpenSidebar(false);
  };

  if (isLoggedIn === null) {
    return <h2 style={{ color: "black" }}>loading...</h2>;
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
