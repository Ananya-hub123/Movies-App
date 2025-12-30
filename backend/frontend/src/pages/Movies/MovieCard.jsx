import { Link } from "react-router-dom";
import { Card, CardMedia, Typography, Box, Rating } from '@mui/material';

const MovieCard = ({ movie }) => {
  const randomRating = Math.random() * 2 + 3; // Random rating between 3 and 5
  const randomDuration = Math.floor(Math.random() * 30) + 150; // Random duration between 150 and 180 minutes
  const hours = Math.floor(randomDuration / 60);
  const minutes = randomDuration % 60;
  
  return (
    <Link to={`/movies/${movie._id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          position: 'relative',
          width: 320,
          height: 320,
          margin: 2,
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          image={movie.image}
          alt={movie.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: 2,
            backgroundColor: '#111',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
            color: 'white',
            padding: 2,
            opacity: 0,
            transition: 'opacity 0.3s ease-in-out',
            '.MuiCard-root:hover &': {
              opacity: 1,
            },
          }}
        >
          <Typography variant="h6" component="p" sx={{ mb: 1 }}>
            {movie.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating
              value={randomRating}
              precision={0.5}
              readOnly
              size="small"
              sx={{
                color: '#FFD700',
              }}
            />
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              {randomRating.toFixed(1)}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontSize: '0.875rem', mt: 1 }}>
            Duration: {hours}h {minutes}min
          </Typography>
        </Box>
      </Card>
    </Link>
  );
};

export default MovieCard;
