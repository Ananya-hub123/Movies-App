import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";
import { toast } from "react-toastify";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";
import {
  Box,
  Button,
  Typography,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
} from '@mui/material';

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed. Try again.");
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', px: 2, py: 4 }}>
      <Box sx={{ maxWidth: 800, width: '100%' }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
          Manage Genres
        </Typography>
        
        <Paper sx={{ p: 3, mb: 4, bgcolor: theme.palette.background.paper }}>
          <Box component="form" onSubmit={handleCreateGenre} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              label="New Genre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ flex: 1 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Add Genre
            </Button>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
          {genres?.map((genre) => (
            <Chip
              key={genre._id}
              label={genre.name}
              onClick={() => {
                setModalVisible(true);
                setSelectedGenre(genre);
                setUpdatingName(genre.name);
              }}
              clickable
              sx={{
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.primary.main}`,
                color: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                },
              }}
            />
          ))}
        </Box>

        <Dialog
          open={modalVisible}
          onClose={() => setModalVisible(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Genre</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Genre Name"
              fullWidth
              variant="outlined"
              value={updatingName}
              onChange={(e) => setUpdatingName(e.target.value)}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalVisible(false)}>Cancel</Button>
            <Button onClick={handleUpdateGenre} variant="contained" color="primary">
              Update
            </Button>
            <Button onClick={handleDeleteGenre} variant="contained" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default GenreList;
