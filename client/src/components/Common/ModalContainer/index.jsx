import {
  Box,
  CardContent,
  Divider,
  Fade,
  Modal,
  Typography,
} from "@mui/material";

export default function ModalContainer({
  handleClose,
  Backdrop,
  open,
  style,
  modalHeader,
  children,
}) {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                padding: "15px 30px",
              }}
              display="flex"
              alignItems="center"
            >
              <Box flexGrow={1}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  {modalHeader}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent
              sx={{
                padding: "30px",
              }}
            >
              {children}
            </CardContent>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
