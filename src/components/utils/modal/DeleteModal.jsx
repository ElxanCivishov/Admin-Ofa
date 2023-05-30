import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdClose } from "react-icons/md";

import "./modal.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  outline: "none",
  //   boxShadow: 24,
  p: 4,
};

export default function DeleteModal({ open, setOpen, product, handleDelete }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="close" onClick={() => setOpen(false)}>
            <MdClose className="close-icon" />
          </div>
          <Typography
            id="modal-modal-title"
            variant="h6"
            sx={{ mt: 2 }}
            component="h2"
          >
            Silmək istədiyinizdən əminsiniz?
          </Typography>
          {product && (
            <>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>Id: </b>
                <span>{product.id}</span>
              </Typography>
              {product.title && (
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>Başlıq: </b>
                  <span>{product.title} </span>
                </Typography>
              )}
            </>
          )}
          <Box sx={{ textAlign: "end" }}>
            <Button
              variant="contained"
              size="small"
              color="warning"
              sx={{ m: 1, mt: 2 }}
              onClick={() => setOpen(false)}
            >
              Ləğv et
            </Button>

            <Button
              variant="outlined"
              size="small"
              color="error"
              sx={{ m: 1, mt: 2 }}
              onClick={() => handleDelete(24)}
            >
              Sil
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
