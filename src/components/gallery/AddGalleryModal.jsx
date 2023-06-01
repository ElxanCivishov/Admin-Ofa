import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdClose, MdOutlineCloudUpload } from "react-icons/md";
import noImage from "/img/noImage.png";
import "./modal.scss";
import { Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { AddGallery } from "../../config/newReguest";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  minWidth: 300,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  outline: "none",
  overflowY: "auto",
  p: 4,
};

export default function AddGalleryModal({
  openAddModal,
  setOpenAddModal,
  refetch,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await AddGallery(formData).then(() => {
        handleClose(), refetch();
      });

      toast.success("Şəkil yükləndi!");

      return response;
    } catch (error) {
      toast.error("Şəkil yüklənmədi!");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
    setPreviewImage(null);
  };

  const handleClose = () => {
    handleImageDelete();
    setOpenAddModal(false);
  };

  return (
    <div>
      <Modal
        open={openAddModal}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="close" onClick={() => handleClose()}>
            <MdClose className="close-icon" />
          </div>
          <Typography
            id="modal-modal-title"
            variant="h6"
            className="text-muted"
            sx={{ mt: 2 }}
            component="h2"
          >
            Qalereyaya yeni şəkil əlavə edin.
          </Typography>

          <Form
            onSubmit={(e) => handleImageUpload(e)}
            method="post"
            encType="multipart/form-data"
          >
            <Form.Group
              className="mb-3 d-flex align-items-center justify-content-between"
              controlId="uploadImage"
            >
              <div>
                <Form.Label className="upload-icon text-muted">
                  <div className="d-flex align-items-center">
                    Əlavə et
                    <MdOutlineCloudUpload className="me-2 ms-2" />
                  </div>
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                  className="d-none"
                />
              </div>
              <div>
                <FaTrash
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleImageDelete()}
                />
              </div>
            </Form.Group>

            <Form.Group
              className="mb-3 text-end d-flex align-items-center justify-content-center"
              controlId="deleteImage"
            >
              <img
                src={previewImage || noImage}
                style={{ maxWidth: "500px", maxHeight: "300px" }}
                alt=""
              />
            </Form.Group>
            <Box sx={{ textAlign: "end" }}>
              <Button
                variant="contained"
                size="small"
                color="warning"
                sx={{ m: 1, mt: 2 }}
                type="button"
                onClick={() => handleClose()}
              >
                Ləğv et
              </Button>

              <Button
                variant="contained"
                size="small"
                color="success"
                sx={{ m: 1, mt: 2 }}
                disabled={!selectedImage}
                type="submit"
              >
                Yüklə
              </Button>
            </Box>
          </Form>
        </Box>
      </Modal>
    </div>
  );
}
