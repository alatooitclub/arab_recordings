import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Card, CardContent, Stack, SxProps, Typography, useTheme } from '@mui/material';
import { ArrowDown, ArrowUp, NotePencil } from 'phosphor-react';

export interface TotalWordsProps {
  sx?: SxProps;
}

export function TotalWords({ sx }: TotalWordsProps): React.JSX.Element {
  const theme = useTheme();
  const [wordsData, setWordsData] = useState({ value: '0', diff: 0, trend: 'up' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://your-api-url.com/total-words');
        setWordsData({
          value: response.data.value,
          diff: response.data.diff,
          trend: response.data.trend
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const TrendIcon = wordsData.trend === 'up' ? ArrowUp : ArrowDown;

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
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline" sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                Total Words
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                {wordsData.value}
              </Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: theme.palette.secondary.light, height: '56px', width: '56px' }}>
              <NotePencil size={32} color={theme.palette.secondary.contrastText} />
            </Avatar>
          </Stack>
          {wordsData.diff !== 0 && (
            <Stack direction="row" spacing={2} alignItems="center">
              <TrendIcon size={24} style={{ color: wordsData.trend === 'up' ? theme.palette.success.main : theme.palette.error.main }} />
              <Typography sx={{ color: wordsData.trend === 'up' ? theme.palette.success.main : theme.palette.error.main, fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                {wordsData.diff}%
              </Typography>
              <Typography color="text.secondary" variant="caption">
                Since last month
              </Typography>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
