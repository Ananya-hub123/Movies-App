import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  useTheme,
  Container,
} from '@mui/material';

const AllComments = () => {
  const { data: movie, refetch } = useGetAllMoviesQuery();
  const theme = useTheme();

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment Deleted");
      refetch();
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2, mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        All Comments
      </Typography>
      
      {movie?.map((m) => (
        <Box key={m._id} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            {m.name}
          </Typography>
          
          {m?.reviews.map((review) => (
            <Card
              key={review._id}
              sx={{
                mb: 2,
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {review.name}
                  </Typography>
                  <Chip
                    label={new Date(review.createdAt).toLocaleDateString()}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                <Typography variant="body1" sx={{ mb: 2 }}>
                  {review.comment}
                </Typography>

                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteComment(m._id, review._id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      ))}
    </Container>
  );
};
export default AllComments;
