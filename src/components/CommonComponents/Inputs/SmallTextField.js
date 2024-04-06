import React from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    // Adjust the size as needed
                    fontSize: '0.625em', // Sets the font size to a smaller value
                    "& .MuiInputBase-input": {
                        height: '0.8em',
                    },
                    "& .MuiInputLabel-root": {
                        top: '-17%',
                        "&.MuiInputLabel-shrink": {
                            top: "0"
                        }
                    },
                },
            }
        }
    }
});

export default function SmallTextField(props) {
    return (
        <ThemeProvider theme={theme}>
            <TextField {...props} />
        </ThemeProvider>
    );
}