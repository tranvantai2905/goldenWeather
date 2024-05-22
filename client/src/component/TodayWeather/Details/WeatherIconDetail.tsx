import { Box } from '@mui/material';
import React from 'react';

interface WeatherIconDetailProps {
  src: string;
}

const WeatherIconDetail: React.FC<WeatherIconDetailProps> = ({ src }) => {
  return (
    <Box
      component="img"
      sx={{
        width: { xs: '50px', sm: '60px' },
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: '0 auto',
        padding: '0',
      }}
      alt="weather"
      src={src}
    />
  );
};

export default WeatherIconDetail;
