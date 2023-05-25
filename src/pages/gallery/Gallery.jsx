import "./gallery.scss";

import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import DeleteModal from "../../components/utils/modal/DeleteModal";
import noImage from "/img/noImage.png";
const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState();

  const handleClick = (value) => {
    setProduct(value);
    setOpen(true);
  };

  const handleDelete = () => {
    alert("deleted image");
  };

  return (
    <>
      <div className="gallery">
        <div className="title">
          <h2>Qalareya</h2>
          <Link to="/add-gallery">
            <span>Yeni şəkil</span>
          </Link>
        </div>
        <div className="images">
          <div className="box">
            <div className="item">
              <div className="delete-icon">
                <span onClick={() => handleClick("image")}>
                  <FaTrash />
                </span>
              </div>
              <img src={noImage} alt="" />
            </div>
          </div>
          <div className="box">
            <div className="item">
              <div className="delete-icon">
                <span onClick={() => handleClick("image")}>
                  <FaTrash />
                </span>
              </div>
              <img src={noImage} alt="" />
            </div>
          </div>
          <div className="box">
            <div className="item">
              <div className="delete-icon">
                <span onClick={() => handleClick("image")}>
                  <FaTrash />
                </span>
              </div>
              <img src={noImage} alt="" />
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        product={product}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Gallery;
