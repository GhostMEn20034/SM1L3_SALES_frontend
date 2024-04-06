import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material";

export default function CustomPagination({ count, page, onChange, ...props }) {
    const theme = createTheme({
        components: {
            MuiPaginationItem: {
                styleOverrides: {
                    root: {
                        color: 'black', // Numbers color
                        '&.Mui-selected': {
                            color: '#ebeb05', // Selected number color
                            backgroundColor: 'black', // Background color for the selected item
                            '&:hover': {
                                color: "#dbdb04",
                                backgroundColor: '#292929'
                            }
                        },
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Pagination
                count={count}
                page={page}
                onChange={onChange}
                {...props}
            />
        </ThemeProvider>
    );
}