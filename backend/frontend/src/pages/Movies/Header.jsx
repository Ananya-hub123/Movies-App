import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";
import { Box, Typography, Button, useTheme } from '@mui/material';

const Header = () => {
  const { data } = useGetNewMoviesQuery();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'flex-start' },
        mt: 2,
        ml: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: 160 },
          ml: { xs: 0, md: 2 },
          mb: { xs: 2, md: 0 },
        }}
      >
        <Button
          component={Link}
          to="/"
          fullWidth
          sx={{
            mb: 1,
            justifyContent: 'flex-start',
            textTransform: 'none',
            fontSize: '1.125rem',
            py: 1.5,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateX(8px)',
              backgroundColor: theme.palette.primary.main,
              color: 'white',
            },
          }}
        >
          Home
        </Button>
        <Button
          component={Link}
          to="/movies"
          fullWidth
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            fontSize: '1.125rem',
            py: 1.5,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateX(8px)',
              backgroundColor: theme.palette.primary.main,
              color: 'white',
            },
          }}
        >
          Browse Movies
        </Button>
      </Box>
      <Box
        sx={{
          width: { xs: '100%', md: '80%' },
          mr: { xs: 0, md: 2 },
        }}
      >
        <SliderUtil data={data} />
      </Box>
    </Box>
  );
};

export default Header;
