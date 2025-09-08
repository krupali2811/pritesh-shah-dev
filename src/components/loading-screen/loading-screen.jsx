import Box from '@mui/material/Box';
import Portal from '@mui/material/Portal';
import LinearProgress from '@mui/material/LinearProgress';

// ----------------------------------------------------------------------

export function LoadingScreen({ portal, sx, ...other }) {
  const content = (
    <Box
    sx={{
      position: 'absolute', 
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9, 
      ...sx,
    }}
      {...other}
    >
      <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
    </Box>
  );

  if (portal) {
    return <Portal>{content}</Portal>;
  }

  return content;
}
