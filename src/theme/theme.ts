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
          padding: "8px 24px",
          display: "flex",
          gap: 8,
        },
        contained: {
          paddingTop: "8.5px",
          paddingBottom: "8.5px",
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
          "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
            },
          "& input[type=number]": {
            MozAppearance: "textfield", // Firefox
          },
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
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: "12px",
          borderRadius: "12px",
          backgroundColor: "#FFF8DE",
          minWidth: "500px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: { root: { fontWeight: 600, color: "#143D60" } },
    },
    MuiDialogContentText: { styleOverrides: { root: { color: "#143D60" } } },
    MuiDialogActions: { styleOverrides: { root: { gap: "8px" } } },
    MuiPopper: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput": { borderColor: "#27667B" },
          "& .MuiPaper-root": {
            backgroundColor: "#FFF8DE",
            borderRadius: "12px",
            padding: "8px",
            color: "#143D60",
            border: "1px solid #27667B",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFF8DE",
          boxShadow: "none",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          border: "1.5px solid #27667B",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          overflow: "hidden"
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFF8DE",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            fontWeight: 600,
            color: "#143D60",
            borderBottom: "1.5px solid #27667B",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #27667b40",
          color: "#143D60",
        },
        head: {
          fontWeight: 600,
          color: "#143D60",
          backgroundColor: "#D0E8C5",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFF8DE",
          "&:hover": {
            backgroundColor: "#F8F7BA",
            cursor: "pointer",
          },
          "&.MuiTableRow-hover:hover": {
            backgroundColor: "#F8F7BA",
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: "#143D60",
          "&:hover": {
            color: "#27667B",
          },
          "&.Mui-active": {
            color: "#27667B",
          },
        },
        icon: {
          color: "#27667B !important",
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: "#143D60", // Dark blue text
          borderTop: "1px solid #D0E8C5", // Pale green border
        },
        selectIcon: {
          color: "#27667B", // Deep teal dropdown icon
        },
        actions: {
          color: "#27667B", // Deep teal navigation buttons
          "& .MuiIconButton-root": {
            color: "#27667B",
            "&:hover": {
              backgroundColor: "rgba(39, 102, 123, 0.1)",
            },
            "&.Mui-disabled": {
              color: "#D0E8C5",
            },
          },
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
