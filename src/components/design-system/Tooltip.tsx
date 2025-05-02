import { styled, tooltipClasses, TooltipProps } from "@mui/material";
import { Tooltip as MuiTooltip } from "@mui/material";

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    fontSize: "9px",
  },
}));

export default Tooltip;
