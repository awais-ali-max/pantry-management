// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4a148c', // Deep purple
        },
        secondary: {
            main: '#ffab00', // Gold
        },
        background: {
            default: '#fafafa', // Light gray
            paper: '#ffffff', // White for paper
        },
    },
    typography: {
        fontFamily: 'Georgia, serif',
        h1: {
            fontSize: '3rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    textTransform: 'none',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                },
            },
        },
    },
});

export default theme;
