import mongoose from "mongoose";
import Movie from "../models/Movie.js";

const createMovie = async (req, res) => {
  console.log("=== CREATE MOVIE DEBUG ===");
  console.log("Request body:", req.body);
  console.log("Genre:", req.body.genre);
  console.log("Name:", req.body.name);
  console.log("Year:", req.body.year);
  console.log("Detail:", req.body.detail);
  console.log("Cast:", req.body.cast);
  console.log("Image:", req.body.image);
  
  try {
    const newMovie = new Movie(req.body);
    console.log("New movie object:", newMovie);
    
    const savedMovie = await newMovie.save();
    console.log("Movie saved successfully:", savedMovie._id);
    res.json(savedMovie);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    console.log("=== IMAGE URL DEBUG ===");
    
    // Fix image URLs for existing movies
    const moviesWithFixedImages = movies.map(movie => {
      if (movie.image && !movie.image.startsWith('http')) {
        // Convert backslashes to forward slashes and remove leading slash
        const cleanImage = movie.image.replace(/\\/g, '/').replace(/^\//, '');
        movie.image = `https://movies-app-production-ff8a.up.railway.app/${cleanImage}`;
        console.log("Fixed image URL:", movie.image);
      } else {
        console.log("Image already has full URL:", movie.image);
      }
      return movie;
    });
    
    console.log("Total movies:", moviesWithFixedImages.length);
    console.log("==================");
    
    res.json(moviesWithFixedImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSpecificMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const specificMovie = await Movie.findById(id);
    if (!specificMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    
    // Fix image URL for specific movie
    if (specificMovie.image && !specificMovie.image.startsWith('http')) {
      const cleanImage = specificMovie.image.replace(/\\/g, '/').replace(/^\//, '');
      specificMovie.image = `https://movies-app-production-ff8a.up.railway.app/${cleanImage}`;
    }
    
    res.json(specificMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const movieReview = async (req, res) => {
  try {
    const { rating, comment, userName } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      // Skip duplicate check for now since we removed auth
      const review = {
        name: userName || "Anonymous User",
        rating: Number(rating),
        comment,
        user: new mongoose.Types.ObjectId(), // Generate a valid ObjectId
      };

      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;
      movie.rating =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      await movie.save();
      res.status(201).json({ message: "Review Added" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMovie = await Movie.findByIdAndDelete(id);

    if (!deleteMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { movieId, reviewId } = req.body;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    movie.reviews.splice(reviewIndex, 1);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
          movie.reviews.length
        : 0;

    await movie.save();
    res.json({ message: "Comment Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getNewMovies = async (req, res) => {
  try {
    const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
    
    // Fix image URLs
    const moviesWithFixedImages = newMovies.map(movie => {
      if (movie.image && !movie.image.startsWith('http')) {
        const cleanImage = movie.image.replace(/\\/g, '/').replace(/^\//, '');
        movie.image = `https://movies-app-production-ff8a.up.railway.app/${cleanImage}`;
      }
      return movie;
    });
    
    res.json(moviesWithFixedImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTopMovies = async (req, res) => {
  try {
    const topRatedMovies = await Movie.find()
      .sort({ numReviews: -1 })
      .limit(10);
      
    // Fix image URLs
    const moviesWithFixedImages = topRatedMovies.map(movie => {
      if (movie.image && !movie.image.startsWith('http')) {
        const cleanImage = movie.image.replace(/\\/g, '/').replace(/^\//, '');
        movie.image = `https://movies-app-production-ff8a.up.railway.app/${cleanImage}`;
      }
      return movie;
    });
    
    res.json(moviesWithFixedImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRandomMovies = async (req, res) => {
  try {
    const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    
    // Fix image URLs
    const moviesWithFixedImages = randomMovies.map(movie => {
      if (movie.image && !movie.image.startsWith('http')) {
        const cleanImage = movie.image.replace(/\\/g, '/').replace(/^\//, '');
        movie.image = `https://movies-app-production-ff8a.up.railway.app/${cleanImage}`;
      }
      return movie;
    });
    
    res.json(moviesWithFixedImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
};
