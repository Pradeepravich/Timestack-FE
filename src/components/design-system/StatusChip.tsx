import { Avatar, Chip, styled } from "@mui/material";

interface ModeProps {
  label: string;
  src?: string;
  active?: boolean;
  onClick?: VoidFunction;
}

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ theme, active }) => ({
  backgroundColor: active
    ? theme.palette.mode === "light"
      ? "#E1F5FE"
      : "#028AF666"
    : theme.palette.mode === "light"
    ? "#ECEFF1"
    : "#555555",
  border: active ? `1px solid ${theme.palette.primary.main}` : "none",
  padding: "5px 6px",
  "& .MuiAvatar-circular": {
    "& .MuiAvatar-img": {
      width: "13px",
      height: "13px",
    },
  },
  "& .MuiChip-label": {
    fontSize: "10px",
    fontWeight: "500",
  },
  "&:hover": {
    backgroundColor: active
      ? theme.palette.mode === "light"
        ? "#E1F5FE"
        : "#028AF666"
      : theme.palette.mode === "light"
      ? "#ECEFF1"
      : "#555555",
  },
}));

const StatusChip = ({ label, src, active, onClick }: ModeProps) => {
  return (
    <StyledChip
      label={label}
      avatar={src ? <Avatar alt={label} src={src} /> : undefined}
      active={active}
      onClick={onClick}
      size="small"
    />
  );
};

export default StatusChip;
