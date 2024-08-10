// pages/_app.js
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '../src/context/AuthContext'; // Ensure this path is correct
import '../src/styles/globals.css'; // Ensure this path is correct

const theme = createTheme({
    palette: {
        primary: {
            main: '#D4AF37', // Dark golden color for primary elements
        },
        secondary: {
            main: '#000000', // Shiny black
        },
        background: {
            default: '#000000', // Black background for the whole page
            paper: '#ffffff', // White background for paper elements
        },
        text: {
            primary: '#D4AF37', // Dark golden color for text
            secondary: '#333333', // Darker shade for secondary text
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#D4AF37', // Dark golden color for h1
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700,
            color: '#D4AF37', // Dark golden color for h2
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#D4AF37', // Dark golden color for h3
        },
        body1: {
            fontSize: '1rem',
            color: '#FFFFFF', // White color for body text
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    textTransform: 'none',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
                        transform: 'translateY(-2px)',
                    },
                },
                containedPrimary: {
                    backgroundImage: 'linear-gradient(135deg, #D4AF37, #B89A6D)', // Dark golden gradient for contained buttons
                    color: '#000000', // Shiny black for text in contained buttons
                    '&:hover': {
                        backgroundImage: 'linear-gradient(135deg, #B89A6D, #D4AF37)', // Slightly different gradient on hover
                    },
                },
                textPrimary: {
                    color: '#D4AF37', // Dark golden color for text buttons
                    '&:hover': {
                        color: '#B89A6D', // Slightly lighter golden on hover
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                    transition: 'box-shadow 0.3s ease-in-out',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent', // Transparent AppBar background
                    boxShadow: 'none', // Remove shadow if needed
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                    transition: 'box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        },
    },
});

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default MyApp;
