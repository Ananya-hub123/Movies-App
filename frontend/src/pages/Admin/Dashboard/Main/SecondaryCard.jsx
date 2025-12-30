import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';

const SecondaryCard = ({ pill, content, info, gradient }) => {
  const theme = useTheme();

  const getGradientColors = (gradient) => {
    if (gradient.includes('teal-500')) return { from: '#14b8a6', to: '#84cc16' };
    if (gradient.includes('#CCC514')) return { from: '#CCC514', to: '#CDCB8E' };
    if (gradient.includes('green-500')) return { from: '#22c55e', to: '#84cc16' };
    return { from: '#6366f1', to: '#8b5cf6' };
  };

  const colors = getGradientColors(gradient);

  return (
    <Card
      sx={{
        width: 240,
        height: 192,
        background: `linear-gradient(to bottom, ${colors.from}, ${colors.to})`,
        color: 'white',
        position: 'relative',
        borderRadius: 3,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -16,
          left: '50%',
          transform: 'translateX(-50%)',
          background: `linear-gradient(to bottom, ${colors.from}, ${colors.to})`,
          color: 'white',
          px: 3,
          py: 1,
          borderRadius: '50px',
          fontSize: '0.875rem',
          fontWeight: 'bold',
          boxShadow: 2,
        }}
      >
        {pill}
      </Box>

      <CardContent sx={{ textAlign: 'center', pt: 1 }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
          {content}
        </Typography>
      </CardContent>

      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          left: 16,
          right: 16,
          textAlign: 'center',
        }}
      >
        <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
          {info}
        </Typography>
      </Box>
    </Card>
  );
};

export default SecondaryCard;
