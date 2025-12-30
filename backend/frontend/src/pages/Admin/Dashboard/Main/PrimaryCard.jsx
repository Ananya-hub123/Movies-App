import { useGetUsersQuery } from "../../../../redux/api/users";
import {
  Card,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';

const PrimaryCard = () => {
  const { data: visitors } = useGetUsersQuery();
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: '100%',
        bgcolor: theme.palette.background.paper,
        color: 'white',
        borderRadius: 2,
        mt: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Congratulations!
        </Typography>
        <Typography variant="body2">
          You have {visitors?.length} new users, watching your content.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PrimaryCard;
