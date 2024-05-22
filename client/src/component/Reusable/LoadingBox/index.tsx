import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingBoxProps {
  children?: React.ReactNode;
}

const LoadingBox: React.FC<LoadingBoxProps> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <CircularProgress sx={{ color: 'rgba(255,255,255, .8)' }} />
      {props.children}
    </Box>
  );
}

export default LoadingBox;