import { createTheme } from "@mui/material/styles";
import { colors } from "./color";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary.main, // Deep blue - main brand color
      light: colors.primary.light, // Teal - lighter variant
      dark: colors.primary.dark, // Darker blue
    },
    secondary: {
      main: colors.secondary.main, // Orange/Gold - secondary actions
      light: colors.secondary.light, // Light yellow-green
      dark: colors.secondary.dark, // Success green
    },
    background: {
      default: colors.background.default, // Light grey
      paper: colors.background.paper, // White
    },
    success: {
      main: colors.success.main, // Success orange
    },
    info: {
      main: colors.info.main, // Info teal
    },
    // Custom colors you can use throughout your app
    custom: {
      lightBeige: colors.secondary.light,
      lightGreen: colors.secondary.dark,
      deepTeal: colors.primary.light,
      darkBlue: colors.primary.dark,
      paleGreen: colors.success.light,
      creamWhite: colors.text.light,
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
          backgroundColor: colors.primary.light,
          "&:hover": {
            backgroundColor: colors.primary.dark,
          },
        },
        containedSecondary: {
          backgroundColor: colors.secondary.dark,
          color: colors.primary.dark,
          "&:hover": {
            backgroundColor: colors.secondary.light,
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
            color: colors.primary.light, // Deep teal for visibility icons
            "&:hover": {
              backgroundColor: "rgba(39, 102, 123, 0.1)",
              color: colors.primary.dark, // Darker teal on hover
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
            borderColor: colors.border.main,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.primary.dark,
          "&.Mui-focused": {
            color: colors.primary.dark,
            "& .MuiInputLabel-asterisk": {
              color: colors.primary.dark,
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          "&::before, &::after": {
            borderColor: colors.success.light, // Pale green lines
            borderWidth: "2px",
          },
        },
        wrapper: {
          color: colors.primary.light, // Deep teal text
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
          color: colors.primary.light, // Deep teal for dropdown icon
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          border: `1px solid ${colors.border.main}`,
          maxHeight: "190px",
          backgroundColor: colors.background.paper,
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
          backgroundColor: colors.background.paper,
          minWidth: "500px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: { root: { fontWeight: 600, color: colors.primary.dark } },
    },
    MuiDialogContentText: {
      styleOverrides: { root: { color: colors.primary.dark } },
    },
    MuiDialogActions: { styleOverrides: { root: { gap: "8px" } } },
    MuiPopper: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput": { borderColor: colors.border.main },
          "& .MuiPaper-root": {
            borderRadius: "12px",
            padding: "8px",
            color: colors.primary.dark,
            border: `1px solid ${colors.border.main}`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.text.light,
          boxShadow: "none",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          border: `1.5px solid ${colors.border.main}`,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: colors.text.light,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            fontWeight: 600,
            color: colors.primary.dark,
            borderBottom: `1.5px solid ${colors.border.main}`,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${colors.border.light}`,
          color: colors.primary.dark,
        },
        head: {
          fontWeight: 600,
          color: colors.primary.dark,
          backgroundColor: colors.success.light,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          backgroundColor: colors.text.light,
          "&:hover": {
            backgroundColor: colors.background.hover,
            cursor: "pointer",
          },
          "&.MuiTableRow-hover:hover": {
            backgroundColor: colors.background.hover,
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: colors.primary.dark,
          "&:hover": {
            color: colors.primary.light,
          },
          "&.Mui-active": {
            color: colors.primary.light,
          },
        },
        icon: {
          color: `${colors.primary.light} !important`,
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: colors.primary.dark, // Dark blue text
          borderTop: `1px solid ${colors.success.light}`, // Pale green border
        },
        selectIcon: {
          color: colors.primary.light, // Deep teal dropdown icon
        },
        actions: {
          color: colors.primary.light, // Deep teal navigation buttons
          "& .MuiIconButton-root": {
            color: colors.primary.light,
            "&:hover": {
              backgroundColor: "rgba(39, 102, 123, 0.1)",
            },
            "&.Mui-disabled": {
              color: colors.success.light,
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
