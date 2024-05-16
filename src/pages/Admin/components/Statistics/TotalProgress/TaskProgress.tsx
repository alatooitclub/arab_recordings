import * as React from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import { SxProps, Typography, useTheme } from '@mui/material';
import { ListBullets } from 'phosphor-react';

export interface TasksProgressProps {
  sx?: SxProps;
}

export function TasksProgress({ sx }: TasksProgressProps): React.JSX.Element {
  const theme = useTheme();
  const [progress, setProgress] = React.useState(0);  

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://your-api-url.com/task-progress'); 
        setProgress(response.data.progress);  // Assuming the API returns an object with a progress key
      } catch (error) {
        console.error('Failed to fetch task progress:', error);
      }
    };

    fetchData();
  }, []); 

  const cardStyles: SxProps = {
    ...sx,
    backgroundColor: '#fff', 
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)', 
    borderRadius: '20px', 
    width: { xs: '100%', sm: '450px' }, 
    height: 'auto', 
    padding: theme.spacing(2), 
    mx: 'auto', 
  };

  return (
    <Card sx={cardStyles}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>
                Task Progress
              </Typography>
              <Typography variant="h4" style={{ fontWeight: 600, fontSize: '2rem' }}>{progress}%</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: theme.palette.primary.light, height: '56px', width: '56px' }}>
              <ListBullets size={32} color="#fff" />
            </Avatar>
          </Stack>
          <div>
            <LinearProgress variant="determinate" value={progress} style={{ height: '10px', borderRadius: '5px' }} />
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
