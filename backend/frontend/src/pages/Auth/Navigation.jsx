import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
  useTheme,
  Typography,
  Avatar,
} from '@mui/material';

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      handleMenuClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        bottom: 'auto',
        bgcolor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 4, minHeight: 64 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              textDecoration: 'none',
              mr: 4,
            }}
          >
            🎬 MovieHub
          </Typography>

          <Button
            component={Link}
            to="/"
            color="inherit"
            startIcon={<AiOutlineHome size={20} />}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2,
              px: 2,
              py: 1,
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                transform: 'translateY(-1px)',
              },
            }}
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/movies"
            color="inherit"
            startIcon={<MdOutlineLocalMovies size={20} />}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2,
              px: 2,
              py: 1,
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                transform: 'translateY(-1px)',
              },
            }}
          >
            Browse Movies
          </Button>
        </Box>

        <Box>
          {userInfo ? (
            <>
              <Button
                onClick={handleMenuOpen}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
              },
            }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: theme.palette.primary.main,
                    fontSize: '0.875rem',
                  }}
                >
                  {userInfo.username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body1" sx={{ color: 'inherit' }}>
                  {userInfo.username}
                </Typography>
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  },
                }}
              >
                {userInfo.isAdmin && (
                  <MenuItem
                    component={Link}
                    to="/admin/movies/dashboard"
                    onClick={handleMenuClose}
                    sx={{ borderRadius: 1 }}
                  >
                    📊 Dashboard
                  </MenuItem>
                )}

                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleMenuClose}
                  sx={{ borderRadius: 1 }}
                >
                  👤 Profile
                </MenuItem>

                <MenuItem
                  onClick={logoutHandler}
                  sx={{ borderRadius: 1, color: 'error.main' }}
                >
                  🚪 Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                startIcon={<AiOutlineLogin size={20} />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  },
                }}
              >
                Login
              </Button>

              <Button
                component={Link}
                to="/register"
                variant="contained"
                startIcon={<AiOutlineUserAdd size={20} />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  },
                }}
              >
                Register
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
