import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { formatDate } from '../../utilities/formatDate';

interface DayWeatherHistoryDetailsProps {
  day: string;
  src: string;
  description: string;
}

const DayWeatherHistoryDetails: React.FC<DayWeatherHistoryDetailsProps> = ({ day, src, description }) => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: { xs: '12px', sm: '20px', md: '32px' },
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Poppins',
          fontWeight: { xs: '400', sm: '600' },
          fontSize: { xs: '12px', sm: '13px', md: '14px' },
          color: 'white',
          lineHeight: 1,
          height: '31px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {formatDate(day)}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '31px',
        }}
      >
        <Box
          component="img"
          sx={{
            width: { xs: '24px', sm: '28px', md: '31px' },
            height: 'auto',
            marginRight: '4px',
          }}
          alt="weather"
          src={src}
        />
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontSize: { xs: '8px', md: '9px', lg:"12px" },
            color: 'rgba(255,255,255, .8)',
            lineHeight: 1,
            fontFamily: 'Roboto Condensed',
          }}
        >
          {description}
        </Typography>
      </Box>
    </Grid>
  );
};

export default DayWeatherHistoryDetails;
