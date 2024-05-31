import React, { useState, useEffect } from 'react';
import mqttService from '../services/mqttService';
import Gauge from 'react-gauge-component';
import { Grid, Box, Typography } from '@mui/material';

const GaugeComponent = () => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);

  useEffect(() => {
    mqttService.connect((data) => {
      setTemperature(data.temperature);
      setHumidity(data.humidity);
    });
  }, []);

  return (
    <div>

<h2>Current Sensor Data</h2>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="h4" component="h2">Temperature</Typography>
          <Gauge value={temperature} min={-20} max={100}/>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="h4" component="h2">Humidity</Typography>
          <Gauge value={humidity} min={0} max={100}/>
        </Box>
      </Grid>

    </Grid>
    </div>
  );
};

export default GaugeComponent;
