import { useNavigate } from "react-router";

import { IconButton, Tooltip } from "@mui/material";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Tooltip arrow placement="top" title="Go back">
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        color="primary"
        sx={{ p: 2 }}
      >
        <ArrowBackTwoToneIcon />
      </IconButton>
    </Tooltip>
  );
}
