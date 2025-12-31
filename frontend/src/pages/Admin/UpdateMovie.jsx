import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";
import { BASE_URL, MOVIE_URL } from "../../redux/constants";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from '@mui/material';

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] =
    useUpdateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const [deleteMovie] = useDeleteMovieMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateMovie = async () => {
    console.log("=== FRONTEND UPDATE MOVIE DEBUG ===");
    console.log("movieData:", movieData);
    console.log("id:", id);
    console.log("isUpdatingMovie:", isUpdatingMovie);
    console.log("isUploadingImage:", isUploadingImage);
    
    // Simple validation
    if (!movieData.name || !movieData.year || !movieData.detail || !movieData.cast) {
      toast.error("Please fill in all required fields");
      return;
    }

    console.log("Validation passed - proceeding with update");

    try {
      // Simplified update - just send the movie data directly
      const updateData = {
        name: movieData.name,
        year: movieData.year,
        detail: movieData.detail,
        cast: movieData.cast,
        image: movieData.image,
      };
      
      console.log("Sending simplified update data:", updateData);
      console.log("API endpoint:", `${BASE_URL}${MOVIE_URL}/update-movie/${id}`);
      console.log("About to call updateMovie...");

      // Call the API directly
      const result = await updateMovie({ id, updatedMovie: updateData });
      
      console.log("Update API call successful:", result);
      toast.success("Movie updated successfully!");
      navigate("/movies");
      
    } catch (error) {
      console.error("Failed to update movie:", error);
      console.error("Error details:", error?.data || error?.message);
      toast.error(`Failed to update movie: ${error?.data?.message || error?.message || 'Unknown error'}`);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      toast.success("Movie deleted successfully");
      await deleteMovie(id);
      navigate("/movies");
    } catch (error) {
      console.error("Failed to delete movie:", error);
      toast.error(`Failed to delete movie: ${error?.message}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', px: 2, py: 4 }}>
      <Card sx={{ maxWidth: 800, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" color="primary" gutterBottom textAlign="center">
            Update Movie
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={movieData.name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year"
                name="year"
                type="number"
                value={movieData.year}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Detail"
                name="detail"
                value={movieData.detail}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cast (comma-separated)"
                name="cast"
                value={movieData.cast.join(", ")}
                onChange={(e) =>
                  setMovieData({ ...movieData, cast: e.target.value.split(", ") })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mb: 2 }}
              >
                {selectedImage ? selectedImage.name : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateMovie}
                  disabled={isUpdatingMovie || isUploadingImage}
                  size="large"
                >
                  {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setDeleteDialogOpen(true)}
                  disabled={isUpdatingMovie || isUploadingImage}
                  size="large"
                >
                  Delete Movie
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete "{movieData.name}"? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteMovie}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default UpdateMovie;
