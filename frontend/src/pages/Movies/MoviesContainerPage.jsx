import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const theme = useTheme();

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState('name');

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId === selectedGenre ? null : genreId);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const sortMovies = (movies) => {
    if (!movies) return [];
    
    const sortedMovies = [...movies];
    
    switch (sortBy) {
      case 'name':
        return sortedMovies.sort((a, b) => a.name.localeCompare(b.name));
      case 'rating':
        return sortedMovies.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'year':
        return sortedMovies.sort((a, b) => (b.year || 0) - (a.year || 0));
      case 'duration':
        return sortedMovies.sort((a, b) => {
          const durationA = parseInt(a.duration) || 0;
          const durationB = parseInt(b.duration) || 0;
          return durationA - durationB;
        });
      default:
        return sortedMovies;
    }
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  const sortedFilteredMovies = sortMovies(filteredMovies);
  const sortedTopMovies = sortMovies(topMovies);
  const sortedRandomMovies = sortMovies(randomMovies);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        gap: 4,
        alignItems: 'flex-start',
        px: 2,
      }}
    >
      <Paper
        component="nav"
        sx={{
          p: 2,
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          minWidth: 200,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Genres
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {genres?.map((g) => (
            <Button
              key={g._id}
              onClick={() => handleGenreClick(g._id)}
              variant={selectedGenre === g._id ? 'contained' : 'outlined'}
              color="primary"
              size="small"
              sx={{
                textTransform: 'none',
                justifyContent: 'flex-start',
              }}
            >
              {g.name}
            </Button>
          ))}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Sort By
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Sort</InputLabel>
            <Select
              value={sortBy}
              label="Sort"
              onChange={handleSortChange}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="year">Release Date</MenuItem>
              <MenuItem value="duration">Duration</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Box sx={{ flex: 1, width: '100%' }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            Choose For You
          </Typography>
          <SliderUtil data={sortedRandomMovies} />
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            Top Movies
          </Typography>
          <SliderUtil data={sortedTopMovies} />
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            Choose Movie
          </Typography>
          {selectedGenre && (
            <Chip
              label={`Genre: ${genres?.find((g) => g._id === selectedGenre)?.name}`}
              onDelete={() => setSelectedGenre(null)}
              color="primary"
              sx={{ mb: 2 }}
            />
          )}
          <SliderUtil data={sortedFilteredMovies} />
        </Box>
      </Box>
    </Box>
  );
};

export default MoviesContainerPage;
