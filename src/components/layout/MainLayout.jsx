import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { useLoggedIn } from "../../config/Hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./layout.scss";

const MainLayout = () => {
  const queryClient = new QueryClient();
  const isLoggedIn = useLoggedIn();
  if (isLoggedIn === null) {
    return <h2 style={{ color: "black" }}>loading...</h2>;
  } else if (isLoggedIn === false) {
    return <Navigate replace to="/login" />;
  } else if (isLoggedIn === true) {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <div className="main">
            <Sidebar />
            <div className="content">
              <Navbar />
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
