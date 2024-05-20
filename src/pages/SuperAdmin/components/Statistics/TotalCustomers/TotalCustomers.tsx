import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { SxProps, Theme, Typography, useTheme } from '@mui/material';
import { ArrowDown, ArrowUp, Users } from 'phosphor-react';
import { useLang } from "../../../../../hooks/useLang";
import { setLang } from "../../../../../contexts/lang";

export interface TotalCustomersProps {
  sx?: SxProps<Theme>;
}

export function TotalCustomers({ sx }: TotalCustomersProps): React.JSX.Element {
  const [customerData, setCustomerData] = useState({
    value: '0', 
    diff: 0, 
    trend: 'up' 
  });

  const { lang, translations } = useLang();

  const handleSwitchLang = (lang) => {
      setLang(lang);
      localStorage.setItem("lang", JSON.stringify(lang));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://your-api-url.com/total-customers'); 
        setCustomerData({
          value: response.data.value.toString(),
          diff: response.data.diff,
          trend: response.data.trend
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []); 

  const theme = useTheme();  
  const TrendIcon = customerData.trend === 'up' ? ArrowUp : ArrowDown;
  const trendColor = customerData.trend === 'up' ? '#4caf50' : '#f44336'; 

  const cardStyles: SxProps<Theme> = {
    ...sx,
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    borderRadius: '20px',
    width: { xs: '100%', sm: '450px' }, 
    height: '150px',
    mx: 'auto',  
    p: theme.spacing(2)  
  };

  return (
    <Card sx={cardStyles}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {translations[lang].super_admin.statistics.users}
              </Typography>
              <Typography variant="h4" style={{ fontWeight: 600, fontSize: '2rem' }}>
                {customerData.value}
              </Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: '#ffd600', height: '56px', width: '56px' }}>
              <Users size={32} color="#fff" />
            </Avatar>
          </Stack>
          {customerData.diff !== 0 && (
            <Stack direction="row" spacing={2} alignItems="center">
              <TrendIcon size={24} color={trendColor} />
              <Typography sx={{ color: trendColor, fontWeight: 500, fontSize: '1rem' }}>
                {customerData.diff}%
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
