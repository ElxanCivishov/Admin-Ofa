import "./gallery.scss";

import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import DeleteModal from "../../components/utils/modal/DeleteModal";
import noImage from "/img/noImage.png";
import AddGalleryModal from "../../components/utils/modal/addgallery/AddGalleryModal";
import { useQuery } from "@tanstack/react-query";
import { GetGallery, deleteGallery } from "../../config/newReguest";
import Loader from "../../components/utils/Loader";
import { Navigate } from "react-router-dom";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [product, setProduct] = useState();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gallery"],
    queryFn: GetGallery,
    staleTime: 60000,
  });

  if (isLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center "
        style={{ height: "300px" }}
      >
        <Loader />
      </div>
    );
  }

  if (error)
    return (
      <Navigate
        to="/errorpage"
        state={{ error: error.message }}
        replace={true}
      />
    );

  const handleClick = (value) => {
    setProduct(value);
    setOpen(true);
  };

  return (
    <>
      <div className="gallery">
        <div className="title">
          <h2>Qalareya</h2>
          <button className="btn add-btn" onClick={() => setOpenAddModal(true)}>
            Yeni şəkil
          </button>
        </div>
        <div className="images">
          {data &&
            data.map((image) => (
              <div className="box" key={image.id}>
                {console.log(image)}
                <div className="item">
                  <div className="delete-icon">
                    <span onClick={() => handleClick("image")}>
                      <FaTrash />
                    </span>
                  </div>
                  <img src={image.image || noImage} alt="" />
                </div>
              </div>
            ))}
        </div>
      </div>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        product={product}
        refetch={refetch}
        handleDelete={deleteGallery}
      />
      <AddGalleryModal
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
        refetch={refetch}
      />
    </>
  );
};

export default Gallery;
