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
    res.json(movies);
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
    
    res.json(specificMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  console.log("=== UPDATE MOVIE DEBUG ===");
  console.log("Request method:", req.method);
  console.log("Request params:", req.params);
  console.log("Request body:", req.body);
  console.log("Authenticated user:", req.user);
  
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMovie) {
      console.log("Movie not found with ID:", id);
      res.status(404).json({ message: "Movie not found" });
    }

    console.log("Movie updated successfully:", updatedMovie.name);
    res.json(updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: error.message });
  }
};

const movieReview = async (req, res) => {
  console.log("=== MOVIE REVIEW DEBUG ===");
  console.log("Request body:", req.body);
  console.log("Params:", req.params);
  console.log("Authenticated user:", req.user);
  
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      console.log("Found movie:", movie.name);
      
      // Get username from authenticated user or use a default
      const userName = req.user?.name || req.user?.username || req.user?.email || "Movie Lover";
      console.log("Using user name:", userName);
      
      const review = {
        name: userName,
        rating: Number(rating),
        comment,
        user: req.user?._id || new mongoose.Types.ObjectId(), // Use authenticated user ID or generate new one
      };
      
      console.log("Creating review with name:", review.name);

      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;
      movie.rating =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      await movie.save();
      console.log("Review saved successfully");
      res.status(201).json({ message: "Review Added" });
    } else {
      console.log("Movie not found with ID:", req.params.id);
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    console.error("Error in movieReview:", error);
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
    res.json(newMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTopMovies = async (req, res) => {
  try {
    const topRatedMovies = await Movie.find()
      .sort({ numReviews: -1 })
      .limit(10);
      
    res.json(topRatedMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRandomMovies = async (req, res) => {
  try {
    const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    res.json(randomMovies);
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
