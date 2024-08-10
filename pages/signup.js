import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/firebase/firebase';

const SignUpPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        setLoading(true);
        setError('');

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/dashboard'); // Redirect to the dashboard after sign-up
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'url(/Screenshot_1.png) no-repeat center center fixed',
                backgroundSize: 'cover',
                color: '#D4AF37', // Dark golden text color
                p: 3,
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly darker transparent background
                    borderRadius: '12px',
                    p: 4,
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)', // Enhanced shadow
                    width: '100%',
                    maxWidth: '400px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition for hover effect
                    '&:hover': {
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.6)', // Deeper shadow on hover
                        transform: 'scale(1.03)', // Slightly scale up on hover
                    },
                }}
            >
                <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
                    Sign Up
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    sx={{
                        width: '100%',
                        mb: 2,
                        maxWidth: '250px',
                        input: { color: '#D4AF37' }, // Dark golden text color
                        label: { color: '#D4AF37' }, // Dark golden label color
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    sx={{
                        width: '100%',
                        mb: 4,
                        maxWidth: '250px',
                        input: { color: '#D4AF37' }, // Dark golden text color
                        label: { color: '#D4AF37' }, // Dark golden label color
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                    <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                        {error}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        width: '100%',
                        maxWidth: '250px',
                        mb: 2,
                        backgroundImage: 'linear-gradient(135deg, #D4AF37, #B89A6D)', // Dark golden gradient
                        color: '#000000',
                        '&:hover': {
                            backgroundImage: 'linear-gradient(135deg, #B89A6D, #D4AF37)', // Slightly different gradient on hover
                        },
                    }}
                    onClick={handleSignUp}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} sx={{ color: '#000000' }} /> : 'Sign Up'}
                </Button>
                <Button
                    variant="text"
                    className="loginButton" // Use the custom class
                    onClick={() => router.push('/login')}
                >
                    Already have an account? <span style={{ color: '#FFD700' }}>Log In</span>
                </Button>
            </Box>
        </Box>
    );
};

export default SignUpPage;
