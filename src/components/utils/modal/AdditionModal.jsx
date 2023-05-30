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
  maxWidth: "600px",
  minWidth: "300px",
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  outline: "none",
  m: 2,
  p: 4,
};

export default function AdditionModal({
  openAddition,
  setOpenAddition,
  product,
}) {
  return (
    <div>
      <Modal
        open={openAddition}
        onClose={() => setOpenAddition(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="close" onClick={() => setOpenAddition(false)}>
            <MdClose className="close-icon" />
          </div>

          {product && (
            <>
              <Typography
                id="modal-modal-title"
                variant="h6"
                sx={{ mt: 3 }}
                component="h2"
              >
                {product.title} üçün əlavə mətn.
              </Typography>
              <Typography id="modal-modal-description" as="p" sx={{ mt: 2 }}>
                {product.addition || "Əlavə mətn yoxdur..."}
              </Typography>
            </>
          )}
          <Box sx={{ textAlign: "end", mt: 2 }}>
            <Button
              variant="contained"
              size="small"
              color="warning"
              onClick={() => setOpenAddition(false)}
            >
              Ləğv et
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
