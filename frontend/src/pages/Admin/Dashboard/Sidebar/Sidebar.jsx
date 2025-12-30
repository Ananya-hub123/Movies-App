import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Box, Drawer, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const drawerWidth = 256;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,
    borderRight: `2px solid ${theme.palette.divider}`,
  },
}));

const Sidebar = () => {
  const theme = useTheme();

  const menuItems = [
    { text: 'Dashboard', path: '/admin/movies/dashboard', active: true },
    { text: 'Create Movie', path: '/admin/movies/create' },
    { text: 'Create Genre', path: '/admin/movies/genre' },
    { text: 'Update Movie', path: '/admin/movies-list' },
    { text: 'Comments', path: '/admin/movies/comments' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledDrawer
        variant="permanent"
        anchor="left"
        sx={{
          '& .MuiDrawer-paper': {
            top: 64,
            height: 'calc(100vh - 64px)',
            position: 'fixed',
            bgcolor: theme.palette.background.default,
            borderRight: `2px solid ${theme.palette.divider}`,
          },
        }}
      >
        <List sx={{ py: 4 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                mb: 2,
                mx: 1,
                borderRadius: '50px',
                background: item.active
                  ? 'linear-gradient(to bottom, #14b8a6, #84cc16)'
                  : 'transparent',
                color: item.active ? 'white' : 'inherit',
                textDecoration: 'none',
                transition: 'background 0.3s ease',
                '&:hover': {
                  background: item.active
                    ? 'linear-gradient(to bottom, #14b8a6, #84cc16)'
                    : 'linear-gradient(to bottom, #14b8a6, #84cc16)',
                  color: 'white',
                },
              }}
            >
              <ListItemText
                primary={item.text}
                sx={{
                  textAlign: 'center',
                  '& .MuiListItemText-primary': {
                    fontSize: '1.125rem',
                    fontWeight: 600,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </StyledDrawer>
    </Box>
  );
};

export default Sidebar;
