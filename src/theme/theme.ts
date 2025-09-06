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
    MuiInput: {
      styleOverrides: {
        input: {
          color: "#27667B",
        },
        root: {
          "&:before": {
            borderBottomColor: "#27667B", // default underline
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottomColor: "#143D60", // hover underline
          },
          "&:after": {
            borderBottomColor: "#143D60", // focused underline
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#143D60",
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
