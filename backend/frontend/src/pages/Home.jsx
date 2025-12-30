import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";
import { Container, Box } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{ mt: 2, px: 2 }}>
        <Header />
        <Box sx={{ mt: 4 }}>
          <MoviesContainerPage />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;