import { Backdrop, CircularProgress } from "@mui/material";
import { FC } from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: FC<LoadingOverlayProps> = ({ isLoading }) => {
  return (
    <Backdrop
      open={isLoading}
      sx={{
        position: "absolute",
        zIndex: 1000,
        color: "common.white",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;
