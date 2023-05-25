import { MdDashboard, MdAdd, MdImage } from "react-icons/md";
import { FiList } from "react-icons/fi";
import { BiReceipt } from "react-icons/bi";
import { Link } from "react-router-dom";

import logo from "/img/logo.png";

import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
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
          <Link to="/package-products" style={{ textDecoration: "none" }}>
            <li>
              <MdAdd className="icon" />
              <span>Yeni məhsul</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
