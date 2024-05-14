import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { Typography, useTheme, SxProps } from '@mui/material';
import { Microphone } from 'phosphor-react';

export interface TotalCorrectRecordingsProps {
  sx?: SxProps;
}

export function TotalCorrectRecordings({ sx }: TotalCorrectRecordingsProps): React.JSX.Element {
  const theme = useTheme();
  const [recordings, setRecordings] = useState('0');  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://your-api-url.com/total-correct-recordings');
        setRecordings(response.data.recordings);  // Assuming the API returns an object with a recordings key
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const cardStyles = {
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
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }} spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>
              Total Correct Recordings
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}>
              {recordings}
            </Typography>
          </Stack>
          <Avatar sx={{
            backgroundColor: theme.palette.success.light,
            height: { xs: '40px', sm: '56px' },
            width: { xs: '40px', sm: '56px' }
          }}>
            <Microphone size={32} color={theme.palette.success.contrastText} />
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}
