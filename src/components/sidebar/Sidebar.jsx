import { MdDashboard, MdAdd, MdImage } from "react-icons/md";
import { FiList } from "react-icons/fi";
import { BiReceipt } from "react-icons/bi";
import { Link } from "react-router-dom";

import logo from "/img/logo.png";
import favLogo from "/img/favicon.ico";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import "./sidebar.scss";

const Sidebar = ({ openSidebar }) => {
  return (
    <div className={openSidebar ? "sidebar active" : "sidebar"}>
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          {openSidebar ? (
            <img src={logo} alt="logo" />
          ) : (
            <img src={favLogo} alt="logo" />
          )}
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {openSidebar ? (
            <>
              <p className="title">Main</p>
              <Link to="/" style={{ textDecoration: "none" }}>
                <li>
                  <MdDashboard className="icon" />
                  <span>Dashboard</span>
                </li>
              </Link>
              <Link to="/gallery" style={{ textDecoration: "none" }}>
                <li>
                  <MdImage className="icon" />
                  <span>Qalereya</span>
                </li>
              </Link>
              <Link to="/recipes" style={{ textDecoration: "none" }}>
                <li>
                  <BiReceipt className="icon" />
                  <span>Reseptlər</span>
                </li>
              </Link>
              <p className="title">Məhsullar</p>
              <Link to="/dry-fruits" style={{ textDecoration: "none" }}>
                <li>
                  <FiList className="icon" />
                  <span>Quru meyvələr</span>
                </li>
              </Link>
              <Link to="/jams" style={{ textDecoration: "none" }}>
                <li>
                  <FiList className="icon" />
                  <span>Mürəbbələr</span>
                </li>
              </Link>
              <Link to="/package-products" style={{ textDecoration: "none" }}>
                <li>
                  <FiList className="icon" />
                  <span>Paket Məhsullar</span>
                </li>
              </Link>
              <p className="title">Yeni</p>
              <Link to="/add-product" style={{ textDecoration: "none" }}>
                <li>
                  <MdAdd className="icon" />
                  <span>Yeni məhsul</span>
                </li>
              </Link>
            </>
          ) : (
            <>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="dashboard">Dashboard</Tooltip>}
                className="in"
              >
                <Link to="/" style={{ textDecoration: "none" }}>
                  <li>
                    <MdDashboard className="icon" />
                    <span>Dashboard</span>
                  </li>
                </Link>
              </OverlayTrigger>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="gallery">Qalereya</Tooltip>}
              >
                <Link to="/gallery" style={{ textDecoration: "none" }}>
                  <li>
                    <MdImage className="icon" />
                    <span>Qalereya</span>
                  </li>
                </Link>
              </OverlayTrigger>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="recipes">Reseptlər</Tooltip>}
              >
                <Link to="/recipes" style={{ textDecoration: "none" }}>
                  <li>
                    <BiReceipt className="icon" />
                    <span>Reseptlər</span>
                  </li>
                </Link>
              </OverlayTrigger>
              <hr />
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="dry-fruits">Quru meyvələr</Tooltip>}
              >
                <Link to="/dry-fruits" style={{ textDecoration: "none" }}>
                  <li>
                    <FiList className="icon" />
                    <span>Quru meyvələr</span>
                  </li>
                </Link>
              </OverlayTrigger>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="jams">Mürəbbələr</Tooltip>}
              >
                <Link to="/jams" style={{ textDecoration: "none" }}>
                  <li>
                    <FiList className="icon" />
                    <span>Mürəbbələr</span>
                  </li>
                </Link>
              </OverlayTrigger>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="package-products">Paket Məhsullar</Tooltip>
                }
              >
                <Link to="/package-products" style={{ textDecoration: "none" }}>
                  <li>
                    <FiList className="icon" />
                    <span>Paket Məhsullar</span>
                  </li>
                </Link>
              </OverlayTrigger>
              <hr />
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="new-product">Yeni məhsul</Tooltip>}
              >
                <Link to="/add-product" style={{ textDecoration: "none" }}>
                  <li>
                    <MdAdd className="icon" />
                    <span>Yeni məhsul</span>
                  </li>
                </Link>
              </OverlayTrigger>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
