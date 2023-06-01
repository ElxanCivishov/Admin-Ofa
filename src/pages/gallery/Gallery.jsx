import { GetGallery, DeleteGallery } from "../../config/newReguest";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../../components/utils/Loader";
import DeleteModal from "../../components/utils/modal/DeleteModal";
import AddGalleryModal from "../../components/gallery/AddGalleryModal";
import { FaTrash } from "react-icons/fa";

import noImage from "/img/noImage.png";
import "./gallery.scss";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [product, setProduct] = useState("");

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

  const handleDelete = async (id) => {
    await DeleteGallery(id)
      .then(() => {
        toast.success("Şəkil silindi!");
        setProduct("");
        setOpen(false);
        refetch();
      })
      .catch(() => {
        toast.error("Şəkil silinmədi!");
      });
  };

  return (
    <>
      <div className="gallery shadow p-4 mt-4 mb-4">
        <div className="title">
          <h2 className="text-muted">Qalareya</h2>
          <button className="btn add-btn" onClick={() => setOpenAddModal(true)}>
            Yeni şəkil
          </button>
        </div>
        <div className="images">
          {data &&
            data.map((image) => (
              <div className="box" key={image.id}>
                <div className="item">
                  <div className="delete-icon">
                    <span onClick={() => handleClick(image)}>
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
        handleDelete={handleDelete}
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
