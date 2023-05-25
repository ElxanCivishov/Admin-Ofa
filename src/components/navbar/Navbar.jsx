import "./navbar.scss";

import noImage from "/img/noImage.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="rigth">
        <div className="info">
          <a href="/profile">
            <p>Admin</p>
            <span>Civishov Elxan</span>
          </a>
        </div>
        <div className="profile">
          <img src={noImage} alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
