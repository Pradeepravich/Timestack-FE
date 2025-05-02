import { useTheme } from "@mui/material";

const useBgColor = (backgroundColor?: string) => {
  const theme = useTheme();
  const bgColor =
    theme.palette.mode === "light" ? backgroundColor || "#eeeeee" : "grey.600";

  return { bgColor };
};
export default useBgColor;
