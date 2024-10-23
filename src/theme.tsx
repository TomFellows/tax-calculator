import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import {
  alpha,
  createTheme,
  outlinedInputClasses,
  selectClasses,
  SvgIconProps,
} from '@mui/material';
import { green, orange, red, yellow } from '@mui/material/colors';
import { forwardRef } from 'react';

// Theming has been supplied by an MUI template

export const brand = {
  50: 'hsl(210, 100%, 95%)',
  100: 'hsl(210, 100%, 92%)',
  200: 'hsl(210, 100%, 80%)',
  300: 'hsl(210, 100%, 65%)',
  400: 'hsl(210, 98%, 48%)',
  500: 'hsl(210, 98%, 42%)',
  600: 'hsl(210, 98%, 55%)',
  700: 'hsl(210, 100%, 35%)',
  800: 'hsl(210, 100%, 16%)',
  900: 'hsl(210, 100%, 21%)',
};

export const gray = {
  50: 'hsl(220, 35%, 97%)',
  100: 'hsl(220, 30%, 94%)',
  200: 'hsl(220, 20%, 88%)',
  300: 'hsl(220, 20%, 80%)',
  400: 'hsl(220, 20%, 65%)',
  500: 'hsl(220, 20%, 42%)',
  600: 'hsl(220, 20%, 35%)',
  700: 'hsl(220, 20%, 25%)',
  800: 'hsl(220, 30%, 6%)',
  900: 'hsl(220, 35%, 3%)',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    success: {
      main: green.A400,
    },
    warning: {
      main: yellow.A400,
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            padding: 16,
            gap: 16,
            transition: 'all 100ms ease',
            backgroundColor: gray[50],
            borderRadius: (theme.vars || theme).shape.borderRadius,
            border: `1px solid ${(theme.vars || theme).palette.divider}`,
            boxShadow: 'none',
            ...theme.applyStyles('dark', {
              backgroundColor: gray[800],
            }),
            variants: [
              {
                props: {
                  variant: 'outlined',
                },
                style: {
                  border: `1px solid ${(theme.vars || theme).palette.divider}`,
                  boxShadow: 'none',
                  background: 'hsl(0, 0%, 100%)',
                  ...theme.applyStyles('dark', {
                    background: alpha(gray[900], 0.4),
                  }),
                },
              },
            ],
          };
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
          '&:last-child': { paddingBottom: 0 },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: forwardRef<SVGSVGElement, SvgIconProps>(function IconComponent(props, ref) {
          return <UnfoldMoreRoundedIcon fontSize="small" {...props} ref={ref} />;
        }),
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: '1px solid',
          borderColor: gray[200],
          backgroundColor: (theme.vars || theme).palette.background.paper,
          boxShadow: `inset 0 1px 0 1px hsla(220, 0%, 100%, 0.6), inset 0 -1px 0 1px hsla(220, 35%, 90%, 0.5)`,
          '&:hover': {
            borderColor: gray[300],
            backgroundColor: (theme.vars || theme).palette.background.paper,
            boxShadow: 'none',
          },
          [`&.${selectClasses.focused}`]: {
            outlineOffset: 0,
            borderColor: gray[400],
          },
          '&:before, &:after': {
            display: 'none',
          },

          ...theme.applyStyles('dark', {
            borderRadius: (theme.vars || theme).shape.borderRadius,
            borderColor: gray[700],
            backgroundColor: (theme.vars || theme).palette.background.paper,
            boxShadow: `inset 0 1px 0 1px ${alpha(gray[700], 0.15)}, inset 0 -1px 0 1px hsla(220, 0%, 0%, 0.7)`,
            '&:hover': {
              borderColor: alpha(gray[700], 0.7),
              backgroundColor: (theme.vars || theme).palette.background.paper,
              boxShadow: 'none',
            },
            [`&.${selectClasses.focused}`]: {
              outlineOffset: 0,
              borderColor: gray[900],
            },
            '&:before, &:after': {
              display: 'none',
            },
          }),
        }),
        select: ({ theme }) => ({
          display: 'flex',
          alignItems: 'center',
          ...theme.applyStyles('dark', {
            display: 'flex',
            alignItems: 'center',
            '&:focus-visible': {
              backgroundColor: gray[900],
            },
          }),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: 'none',
          borderRadius: (theme.vars || theme).shape.borderRadius,
          textTransform: 'none',
          variants: [
            {
              props: {
                size: 'small',
              },
              style: {
                height: '2.25rem',
                padding: '8px 12px',
              },
            },
            {
              props: {
                size: 'medium',
              },
              style: {
                height: '2.5rem', // 40px
              },
            },
            {
              props: {
                color: 'primary',
                variant: 'contained',
              },
              style: {
                color: 'white',
                backgroundColor: gray[900],
                backgroundImage: `linear-gradient(to bottom, ${gray[700]}, ${gray[800]})`,
                boxShadow: `inset 0 1px 0 ${gray[600]}, inset 0 -1px 0 1px hsl(220, 0%, 0%)`,
                border: `1px solid ${gray[700]}`,
                '&:hover': {
                  backgroundImage: 'none',
                  backgroundColor: gray[700],
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: gray[800],
                },
                ...theme.applyStyles('dark', {
                  color: 'black',
                  backgroundColor: gray[50],
                  backgroundImage: `linear-gradient(to bottom, ${gray[100]}, ${gray[50]})`,
                  boxShadow: 'inset 0 -1px 0  hsl(220, 30%, 80%)',
                  border: `1px solid ${gray[50]}`,
                  '&:hover': {
                    backgroundImage: 'none',
                    backgroundColor: gray[300],
                    boxShadow: 'none',
                  },
                  '&:active': {
                    backgroundColor: gray[400],
                  },
                }),
              },
            },
            {
              props: {
                color: 'secondary',
                variant: 'contained',
              },
              style: {
                color: 'white',
                backgroundColor: brand[300],
                backgroundImage: `linear-gradient(to bottom, ${alpha(brand[400], 0.8)}, ${brand[500]})`,
                boxShadow: `inset 0 2px 0 ${alpha(brand[200], 0.2)}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
                border: `1px solid ${brand[500]}`,
                '&:hover': {
                  backgroundColor: brand[700],
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: brand[700],
                  backgroundImage: 'none',
                },
              },
            },
            {
              props: {
                variant: 'outlined',
              },
              style: {
                color: (theme.vars || theme).palette.text.primary,
                border: '1px solid',
                borderColor: gray[200],
                backgroundColor: alpha(gray[50], 0.3),
                '&:hover': {
                  backgroundColor: gray[100],
                  borderColor: gray[300],
                },
                '&:active': {
                  backgroundColor: gray[200],
                },
                ...theme.applyStyles('dark', {
                  backgroundColor: gray[800],
                  borderColor: gray[700],

                  '&:hover': {
                    backgroundColor: gray[900],
                    borderColor: gray[600],
                  },
                  '&:active': {
                    backgroundColor: gray[900],
                  },
                }),
              },
            },
            {
              props: {
                color: 'secondary',
                variant: 'outlined',
              },
              style: {
                color: brand[700],
                border: '1px solid',
                borderColor: brand[200],
                backgroundColor: brand[50],
                '&:hover': {
                  backgroundColor: brand[100],
                  borderColor: brand[400],
                },
                '&:active': {
                  backgroundColor: alpha(brand[200], 0.7),
                },
                ...theme.applyStyles('dark', {
                  color: brand[50],
                  border: '1px solid',
                  borderColor: brand[900],
                  backgroundColor: alpha(brand[900], 0.3),
                  '&:hover': {
                    borderColor: brand[700],
                    backgroundColor: alpha(brand[900], 0.6),
                  },
                  '&:active': {
                    backgroundColor: alpha(brand[900], 0.5),
                  },
                }),
              },
            },
            {
              props: {
                variant: 'text',
              },
              style: {
                color: gray[600],
                '&:hover': {
                  backgroundColor: gray[100],
                },
                '&:active': {
                  backgroundColor: gray[200],
                },
                ...theme.applyStyles('dark', {
                  color: gray[50],
                  '&:hover': {
                    backgroundColor: gray[700],
                  },
                  '&:active': {
                    backgroundColor: alpha(gray[700], 0.7),
                  },
                }),
              },
            },
            {
              props: {
                color: 'secondary',
                variant: 'text',
              },
              style: {
                color: brand[700],
                '&:hover': {
                  backgroundColor: alpha(brand[100], 0.5),
                },
                '&:active': {
                  backgroundColor: alpha(brand[200], 0.7),
                },
                ...theme.applyStyles('dark', {
                  color: brand[100],
                  '&:hover': {
                    backgroundColor: alpha(brand[900], 0.5),
                  },
                  '&:active': {
                    backgroundColor: alpha(brand[900], 0.3),
                  },
                }),
              },
            },
          ],
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: 0,
        },
        root: ({ theme }) => ({
          padding: '8px 12px',
          color: (theme.vars || theme).palette.text.primary,
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: `1px solid ${(theme.vars || theme).palette.divider}`,
          backgroundColor: (theme.vars || theme).palette.background.default,
          transition: 'border 120ms ease-in',
          '&:hover': {
            borderColor: gray[400],
          },
          [`&.${outlinedInputClasses.focused}`]: {
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            borderColor: brand[400],
          },
          ...theme.applyStyles('dark', {
            '&:hover': {
              borderColor: gray[500],
            },
          }),
          variants: [
            {
              props: {
                size: 'small',
              },
              style: {
                height: '2.25rem',
              },
            },
            {
              props: {
                size: 'medium',
              },
              style: {
                height: '2.5rem',
              },
            },
          ],
        }),
        notchedOutline: {
          border: 'none',
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: (theme.vars || theme).palette.grey[500],
          ...theme.applyStyles('dark', {
            color: (theme.vars || theme).palette.grey[400],
          }),
        }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          typography: theme.typography.caption,
          marginBottom: 8,
        }),
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 10,
          backgroundColor: orange[100],
          color: (theme.vars || theme).palette.text.primary,
          border: `1px solid ${alpha(orange[300], 0.5)}`,
          '& .MuiAlert-icon': {
            color: orange[500],
          },
          ...theme.applyStyles('dark', {
            backgroundColor: `${alpha(orange[900], 0.5)}`,
            border: `1px solid ${alpha(orange[800], 0.5)}`,
          }),
        }),
      },
    },
  },
});
