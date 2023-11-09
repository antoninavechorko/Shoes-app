import { createTheme, responsiveFontSizes } from '@mui/material';
import { inter, workSans } from './fonts';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#fe645e' },
    error: { main: '#fe645e' },
    text: {
      primary: '#000',
      secondary: '#5c5c5c',
    },
    background: {
      default: '#fff',
    },
    grey: {
      A100: '#eaecf0',
      A200: '#98a2b3',
      A400: '#797979',
      A700: '#494949',
    },
  },

  typography: {
    fontFamily: workSans.style.fontFamily,
    fontWeightLight: 300,
    fontWeightBold: 600,

    allVariants: {
      fontWeight: 500,
    },

    h1: {
      fontSize: 45,
    },
    h2: {
      fontSize: 25,
    },
    h3: {
      fontSize: 22,
    },
    h4: {
      fontSize: 20,
    },
    h5: {
      fontSize: 18,
    },

    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 12,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.spacing(),
          padding: ['7px', '16px'].join(' '),
        }),

        input: ({ theme }) => ({
          fontSize: 15,
          fontWeight: 400,
          color: theme.palette.text.secondary,
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: 15,
          color: theme.palette.grey[700],
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontFamily: inter.style.fontFamily,
          fontSize: 12,
          fontWeight: 400,
          color: theme.palette.error.main,
        }),
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow:'none'
          },
        },
        contained: ({ theme }) => ({
          color: theme.palette.common.white,
          '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}`
          },
        }),
        outlined: ({ theme }) => ({
          borderRadius: theme.spacing(),
          '&:hover': {
            backgroundColor: `${theme.palette.primary.main}`,
            color: theme.palette.common.white,
          },
        }),
      },
    },



    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderWidth: 1,
          borderColor: theme.palette.grey.A100,
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderWidth: 1,
          borderRadius: 2,
          borderColor: theme.palette.grey.A700,
        }),
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({theme}) => ({
          padding: 0,
          color: theme.palette.text.secondary,
        }),
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: ({theme}) => ({
          padding: 0,
          justifyContent: 'space-between',
          [theme.breakpoints.down('md')]: {
            gap: theme.spacing(2),
          },
          [theme.breakpoints.up('md')]: {
            gap: theme.spacing(4),
          },
        }),
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
