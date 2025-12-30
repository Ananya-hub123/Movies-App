import { useGetUsersQuery } from "../../../../redux/api/users";
import PrimaryCard from "./PrimaryCard";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  useTheme,
} from '@mui/material';

const RealTimeCard = () => {
  const { data: visitors } = useGetUsersQuery();
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: 320,
        mt: 2,
        bgcolor: theme.palette.background.paper,
        color: 'white',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          Realtime
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Update Live
        </Typography>
        <Divider sx={{ mb: 3, borderColor: '#666' }} />
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
          {visitors?.length}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Subscribe
        </Typography>
        <Divider sx={{ mb: 2, borderColor: '#666' }} />

        <PrimaryCard />
      </CardContent>
    </Card>
  );
};

export default RealTimeCard;
