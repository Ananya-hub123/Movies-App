import { Card, CardContent, Typography, Box, CardMedia, useTheme } from '@mui/material';

const VideoCard = ({ image, title, date, comments }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        mb: 2,
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          width: 80,
          height: 80,
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ flex: 1, py: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {date}
        </Typography>
      </CardContent>
      <Box sx={{ pr: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
          {comments}
        </Typography>
      </Box>
    </Card>
  );
};

export default VideoCard;