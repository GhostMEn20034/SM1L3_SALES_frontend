import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { SvgIcon } from '@mui/material';
import { ReactComponent as SmileSalesLogo } from '../smile.svg';
import { Search, SearchIconWrapper, StyledInputBase } from './SearchBar';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const pages = ['Catalogue', 'Orders'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function AppBarMenu() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#000000',
      },
    },
  });

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      backgroundColor: "#D5D507"
    },
  }));

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" color='primary' sx={{marginBottom: 100}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters variant='dense' style={{ height: 70 }}>
              <SvgIcon component={SmileSalesLogo} inheritViewBox 
              sx={{ width: "120px", height: "70px", ":hover": {"cursor": "pointer"} }} 
              onClick={() => console.log("Hello")}
              />
              <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={{ mr: 5, ml: 5, }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: '#D5D507', display: 'block', marginRight: 2 }}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  startIcon={
                    <StyledBadge badgeContent={4} color="secondary" sx={{marginRight: 1}}>
                      <ShoppingCartIcon />
                    </StyledBadge>}
                  key={"Cart"}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: '#D5D507', marginRight: 2, width: "100px" }}
                >
                  {"Cart"}
                </Button>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                {1 === 1 ? (
                  <>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ backgroundColor: "#D5D507" }} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center" color="#D5D507">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Button
                    key={"Login"}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, backgroundColor: '#D5D507', ":hover": { backgroundColor: "#b8b804" }, display: 'block', marginRight: 2 }}
                  >
                    {"Login"}
                  </Button>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
      <Box className="Offset" sx={{height: "70px"}}></Box>
    </>
  );
}
export default AppBarMenu;