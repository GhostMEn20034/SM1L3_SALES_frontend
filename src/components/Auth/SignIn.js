import { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AuthContext from '../../context/AuthContext';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                SMILE group.
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

    let { error, setError, loginUser } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [searchParams, ] = useSearchParams();

    const isFormValid = () => {
        return email.trim() && password.trim();
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = () => {
        let loginAdditionalData = {
            copyCartItemsFrom: localStorage.getItem('cartUuid'),
            nextDestination: searchParams.get('nextDestination'),
        };
        loginUser(email, password, loginAdditionalData);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#D5D507' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            onChange={changeEmail}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={changePassword}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3, mb: 2, bgcolor: "#eded07", color: "black", '&:hover': {
                                    backgroundColor: '#e6e600',
                                },
                            }}
                            onClick={handleSubmit}
                            disabled={!isFormValid()}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link variant="body2" component={RouterLink} to="/reset-password/request">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link variant="body2" component={RouterLink} to="/signup">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {error && (
                    <Box sx={{ mt: 2 }}>
                        <Alert 
                            severity="error" 
                            onClose={() => setError(null)}
                            sx={{ 
                                display: "flex", 
                                justifyContent: "center", 
                                alignItems: "center" 
                            }}
                        >
                            {error}
                        </Alert>
                    </Box>
                )}
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}