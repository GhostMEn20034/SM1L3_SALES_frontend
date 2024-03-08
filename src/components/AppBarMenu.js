import { useContext, useState } from 'react';
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
import SearchAutocomplete from './Search/SearchAutocomplete';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import UserContext from '../context/UserContext';


const pages = ['Catalogue', 'Orders'];
const settings = ['Account', 'Orders', 'Dashboard'];
const app_bar_links = ['/private', '/your-account/orders'];
const setting_links = ['/your-account', '/your-account/orders', '/dashboard'];

function AppBarMenu() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { userInfo } = useContext(UserContext);
  const { user, logoutUser } = useContext(AuthContext);

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
        <AppBar position="fixed" color='primary' sx={{ marginBottom: 100 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters variant='dense' style={{ height: 70 }}>
              <Link underline="none" component={RouterLink} to="/">
                <SvgIcon component={SmileSalesLogo} inheritViewBox
                  sx={{ width: "120px", height: "70px", ":hover": { "cursor": "pointer" } }}
                />
              </Link>
              <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  sx={{
                    color: "#D5D507",
                  }}
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
                  {pages.map((page, index) => (
                    <Link underline="none" key={page} component={RouterLink} to={setting_links[index]}>
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center" sx={{ color: '#D5D507' }}>{page}</Typography>
                      </MenuItem>
                    </Link>
                  ))}
                  <Link underline="none" component={RouterLink} to='/cart'>
                    <MenuItem key={"Cart"} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" sx={{ color: '#D5D507' }}>Cart</Typography>
                    </MenuItem>
                  </Link>
                </Menu>

              </Box>
              <Box sx={{ mr: 5, ml: 5, }}>
                <SearchAutocomplete />
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page, index) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: '#D5D507', display: 'block', marginRight: 2 }}
                    component={RouterLink}
                    to={app_bar_links[index]}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  startIcon={
                    <StyledBadge badgeContent={userInfo?.cart ? userInfo?.cart?.count : 0} color="secondary" sx={{ marginRight: 1 }}>
                      <ShoppingCartIcon />
                    </StyledBadge>}
                  key={"Cart"}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: '#D5D507', marginRight: 2, width: "100px" }}
                  component={RouterLink}
                  to={'/cart'}
                >
                  {"Cart"}
                </Button>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                {user ? (
                  <>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        {userInfo?.user && (<Avatar alt={`${userInfo.user.first_name} ${userInfo.user.last_name}`} src="/static/images/avatar/2.jpg" sx={{ backgroundColor: "#D5D507" }} />)}
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
                      {settings.map((setting, index) => (
                        <Link underline="none" key={setting} component={RouterLink} to={setting_links[index]}>
                          <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center" color="#D5D507">{setting}</Typography>
                          </MenuItem>
                        </Link>
                      ))}
                      <MenuItem key="logout" onClick={logoutUser}>
                        <Typography textAlign="center" color="#D5D507">Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    key={"Login"}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, backgroundColor: '#D5D507', ":hover": { backgroundColor: "#b8b804" }, display: 'block', marginRight: -2 }}
                    component={RouterLink}
                    to={'/signin'}
                  >
                    {"Login"}
                  </Button>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider >
      <Box className="Offset" sx={{ height: "70px" }}></Box>
    </>
  );
}
export default AppBarMenu;