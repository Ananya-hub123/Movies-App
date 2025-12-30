import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import ReactTimeCard from "./RealTimeCard";

import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";
import RealTimeCard from "./RealTimeCard";
import { Box, Grid, Typography, useTheme } from '@mui/material';

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();
  const theme = useTheme();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews);
  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  // Get all movies sorted by number of reviews (top content)
  const sortedMovies = [...(allMovies || [])].sort((a, b) => (b.numReviews || 0) - (a.numReviews || 0));

  // Show all movies
  const topContentMovies = sortedMovies;

  return (
    <Box sx={{ ml: 28, mt: 4, px: 2 }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <SecondaryCard
            pill="Users"
            content={visitors?.length}
            info="20.2k more then usual"
            gradient="from-teal-500 to-lime-400"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SecondaryCard
            pill="Comments"
            content={sumOfCommentsLength}
            info="742.8 more then usual"
            gradient="from-[#CCC514] to-[#CDCB8E]"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SecondaryCard
            pill="Movies"
            content={allMovies?.length}
            info="372+ more then usual"
            gradient="from-green-500 to-lime-400"
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>
              Top Content ({topContentMovies.length} movies)
            </Typography>
            <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>
              Comments
            </Typography>
          </Box>

          {topContentMovies.length > 0 ? (
            topContentMovies.map((movie) => (
              <VideoCard
                key={movie._id}
                image={movie.image}
                title={movie.name}
                date={movie.year}
                comments={movie.numReviews || 0}
              />
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No movies available
            </Typography>
          )}
        </Box>

        <Box sx={{ minWidth: 320 }}>
          <RealTimeCard />
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
