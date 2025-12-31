import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  Container,
  useTheme,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();
  const theme = useTheme();

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("=== FRONTEND REVIEW DEBUG ===");
    console.log("userInfo:", userInfo);
    console.log("movieId:", movieId);
    console.log("rating:", rating);
    console.log("comment:", comment);

    try {
      const reviewData = {
        id: movieId,
        rating,
        comment,
      };
      
      console.log("Sending review data:", reviewData);
      
      await createReview(reviewData).unwrap();

      refetch();

      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          component={Link}
          to="/"
          variant="text"
          color="primary"
          sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 'bold' }}
        >
          ← Go Back
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4, alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Card
            sx={{
              maxWidth: 500,
              width: '100%',
              bgcolor: theme.palette.background.paper,
            }}
          >
            <CardMedia
              component="img"
              image={movie?.image}
              alt={movie?.name}
              sx={{
                width: '100%',
                height: 500,
                objectFit: 'contain',
                backgroundColor: '#111',
              }}
            />
          </Card>
        </Box>

        <Box sx={{ flex: 1, minWidth: 280 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            {movie?.name}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, lineHeight: 1.6, mb: 3 }}
          >
            {movie?.detail}
          </Typography>

          <Paper
            sx={{
              p: 3,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Release Date
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {movie?.year}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Cast
            </Typography>
            <List dense>
              {movie?.cast.map((c, index) => (
                <ListItem key={c._id || index} sx={{ py: 0.5 }}>
                  <ListItemText primary={c} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>

      <Box>
        <MovieTabs
          loadingMovieReview={loadingMovieReview}
          userInfo={userInfo}
          submitHandler={submitHandler}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          movie={movie}
        />
      </Box>
    </Container>
  );
};

export default MovieDetails;
