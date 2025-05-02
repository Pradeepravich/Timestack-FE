import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { FC, PropsWithChildren } from "react";

const ThemeConfig: FC<PropsWithChildren> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0078D4",
      },
      grey: {
        [100]: "#AEAEAE",
      },
    },
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: "12px",
            border: "2px solid #EAEAEA",
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            height: "10px",
            background: "rgba(0, 0, 0, 0.05)",
          },
          bar: {
            backgroundColor: "#0078D4",
            borderRadius: "16px",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
          contained: {
            backgroundColor: "#0078D4",
            color: "#fff",
            fontWeight: 600,
            fontSize: "10px",
            lineHeight: "12.6px",
            padding: "8px",
            borderRadius: "4px",
          },
          outlined: {
            backgroundColor: "transparent",
            color: "#fff",
            borderColor: "#fff",
            "&.MuiButton-sizeSmall": {
              fontSize: "10px",
            },
          },
          text: {
            backgroundColor: "white",
            fontSize: 12,
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          input: {
            "&.MuiOutlinedInput-root": {
              padding: 0,
            },
          },
        },
      },
    },
    typography: {
      fontFamily: "IBM Plex Sans",
      h1: {
        fontSize: 60,
        lineHeight: "78px",
        fontWeight: 600,
      },
      h3: {
        fontSize: 20,
        lineHeight: "26px",
        fontWeight: 600,
      },
      h4: {
        fontSize: 16,
        lineHeight: "24px",
        fontWeight: 500,
        color: "#6B7280",
      },
      subtitle1: {
        fontSize: 14,
        lineHeight: "18px",
        fontWeight: 400,
        color: "#193A50",
      },
      subtitle2: {
        fontSize: 12,
        lineHeight: "18px",
        fontWeight: 400,
        color: "#193A50",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeConfig;
