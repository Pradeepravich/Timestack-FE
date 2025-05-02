import {
  Dialog as MuiDialog,
  IconButton,
  Box,
  SxProps,
  Typography,
  Stack,
  Breakpoint,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  maxWidth?: Breakpoint;
  children?: React.ReactNode;
  titleSx?: SxProps;
}

const Dialog = ({
  open,
  onClose,
  title,
  children,
  maxWidth = "md",
}: DialogProps) => {
  return (
    <MuiDialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
      <Stack gap={4.5} p={4.5}>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Typography variant="subtitle1">{title}</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon sx={{ fontSize: "18px", color: "#193a50" }} />
          </IconButton>
        </Stack>

        <Box>{children}</Box>
      </Stack>
    </MuiDialog>
  );
};

export default Dialog;
