import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Card, CardContent, Stack, SxProps, Typography, useTheme, Box } from '@mui/material';
import { NotePencil } from 'phosphor-react';

export interface WordsData {
  low: { value: string; entries: number };
  medium: { value: string; entries: number };
  high: { value: string; entries: number };
}

export interface TotalWordsProps {
  sx?: SxProps;
}

export function TotalWords({ sx }: TotalWordsProps): React.JSX.Element {
  const theme = useTheme();
  const [wordsData, setWordsData] = useState<WordsData>({
    low: { value: 'Easy', entries: 0 },
    medium: { value: 'Medium', entries: 0 },
    high: { value: 'Hard', entries: 0 }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://your-api-url.com/words-data');
        setWordsData(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const renderWordLevel = (level: { value: string; entries: number }) => {
    return (
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          {level.value}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Entries: {level.entries}
        </Typography>
      </Stack>
    );
  };

  const cardStyles = {
    ...sx,
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    borderRadius: '20px',
    width: { xs: '100%', sm: '450px' },
    height: 'auto', 
    padding: theme.spacing(2), 
    mx: 'auto',
    position: 'relative', 
  } as const; 

  return (
    <Card sx={cardStyles}>
      <CardContent>
        <Stack spacing={3}>
          {renderWordLevel(wordsData.low)}
          {renderWordLevel(wordsData.medium)}
          {renderWordLevel(wordsData.high)}
        </Stack>
      </CardContent>
      <Avatar sx={{
        backgroundColor: theme.palette.secondary.light,
        height: '56px',
        width: '56px',
        margin: '30px',
        position: 'absolute',
        right: theme.spacing(2),
        top: theme.spacing(2)
      }}>
        <NotePencil size={32} color={theme.palette.secondary.contrastText} />
      </Avatar>
    </Card>
  );
}
