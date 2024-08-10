// pages/index.js
import { Container, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
// Remove the Header import
// import Header from '../src/components/Header'; 

const HomePage = () => {
    const router = useRouter();

    return (
        <Container
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#000000',
                color: '#D4AF37', // Dark golden color
                padding: '2rem',
                textAlign: 'center',
                backgroundImage: 'url("/Screenshot_1.png")', // Use the image from the public folder
                backgroundSize: 'cover', // Cover the entire container
                backgroundPosition: 'center', // Center the background image
                backgroundRepeat: 'no-repeat', // Prevent repeating
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                }}
            >
                <Typography
                    variant="h1"
                    gutterBottom
                    sx={{ fontWeight: 'bold', fontSize: '4rem' }}
                >
                    Welcome to Pantry Tracker
                </Typography>
                <Typography variant="h4" paragraph sx={{ fontSize: '1.5rem' }}>
                    Manage your pantry items with elegance and ease.
                </Typography>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Button
                        variant="contained"
                        onClick={() => router.push('/login')}
                        sx={{
                            backgroundImage: 'linear-gradient(135deg, #333333, #444444)', // Gradient background
                            color: '#D4AF37', // Dark golden text color
                            borderRadius: '12px', // Rounded corners
                            padding: '1rem 2rem',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // Shadow for depth
                            '&:hover': {
                                backgroundImage: 'linear-gradient(135deg, #444444, #555555)', // Lighter gradient on hover
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.6)', // Enhanced shadow on hover
                                transform: 'translateY(-2px)', // Lift effect on hover
                            },
                            transition:
                                'background-image 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => router.push('/signup')}
                        sx={{
                            backgroundImage: 'linear-gradient(135deg, #333333, #444444)', // Gradient background
                            color: '#D4AF37', // Dark golden text color
                            borderRadius: '12px', // Rounded corners
                            padding: '1rem 2rem',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // Shadow for depth
                            '&:hover': {
                                backgroundImage: 'linear-gradient(135deg, #444444, #555555)', // Lighter gradient on hover
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.6)', // Enhanced shadow on hover
                                transform: 'translateY(-2px)', // Lift effect on hover
                            },
                            transition:
                                'background-image 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                        }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default HomePage;
