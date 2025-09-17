import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#27667B", // Deep teal - main brand color
      light: "#A0C878", // Light green for hover states
      dark: "#143D60", // Dark blue for pressed states
    },
    secondary: {
      main: "#A0C878", // Light green - secondary actions
      light: "#D0E8C5", // Very light green
      dark: "#27667B", // Deep teal
    },
    background: {
      default: "#FFF8DE", // Warm cream background
      paper: "#FFFFFF", // White for cards/papers
    },
    success: {
      main: "#A0C878", // Light green for success states
    },
    info: {
      main: "#27667B", // Teal for info
    },
    // Custom colors you can use throughout your app
    custom: {
      lightBeige: "#DDEB9D",
      lightGreen: "#A0C878",
      deepTeal: "#27667B",
      darkBlue: "#143D60",
      paleGreen: "#D0E8C5",
      creamWhite: "#FFF8DE",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          fontSize: 16,
          paddingTop: 8,
          paddingBottom: 8,
        },
        containedPrimary: {
          backgroundColor: "#27667B",
          "&:hover": {
            backgroundColor: "#143D60",
          },
        },
        containedSecondary: {
          backgroundColor: "#A0C878",
          color: "#143D60",
          "&:hover": {
            backgroundColor: "#DDEB9D",
          },
        },
      },
      defaultProps: {
        variant: "contained",
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          "& .MuiIconButton-root": {
            color: "#27667B", // Deep teal for visibility icons
            "&:hover": {
              backgroundColor: "rgba(39, 102, 123, 0.1)",
              color: "#143D60", // Darker teal on hover
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#27667B",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#143D60",
          "&.Mui-focused": {
            color: "#143D60",
            "& .MuiInputLabel-asterisk": {
              color: "#143D60",
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          "&::before, &::after": {
            borderColor: "#D0E8C5", // Pale green lines
            borderWidth: "2px",
          },
        },
        wrapper: {
          color: "#27667B", // Deep teal text
          fontSize: "1 rem",
          fontWeight: 300,
          paddingLeft: 16,
          paddingRight: 16,
          letterSpacing: "0.5px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#27667B", // Deep teal for dropdown icon
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          border: "1px solid #27667B",
          maxHeight: "190px",
          backgroundColor: "#FFF8DE",
          borderRadius: "8px",
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari, Opera
        },
      },
    },
  },
});

// Extend the theme's TypeScript interface
declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      lightBeige: string;
      lightGreen: string;
      deepTeal: string;
      darkBlue: string;
      paleGreen: string;
      creamWhite: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      lightBeige?: string;
      lightGreen?: string;
      deepTeal?: string;
      darkBlue?: string;
      paleGreen?: string;
      creamWhite?: string;
    };
  }
}

export default theme;
