import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    minWidth: 170,
  }));
  
  export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#D5D507'
  }));
  
  export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      color: "#D5D507",
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '10ch',
        '&:focus': {
          width: '40ch',
        },
      },
    },
    marginLeft: 0,
    minWidth: 100,
    maxWidth: 375,
  }));
