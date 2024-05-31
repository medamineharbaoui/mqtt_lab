import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, FormControl, InputLabel, Select, MenuItem,Button } from '@mui/material';
import { LineChart, lineElementClasses } from '@mui/x-charts';
import { format, sub, startOfDay } from 'date-fns';

const LineChartComponent = () => {
  const [historicalData, setHistoricalData] = useState(null);
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [date, setDate] = useState([]);
  const [selectedRange, setSelectedRange] = useState('24h'); // Default selected range

  const [refresh, setRefresh] = useState(false);

const handleRefresh = () => {
  setRefresh(prevRefresh => !prevRefresh); // Toggle refresh state to trigger re-render
};

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/historical-data');
        const { data } = response;

        const filteredData = filterDataByRange(data, selectedRange);

        const temperatures = filteredData.map(entry => entry.temperature);
        const humidities = filteredData.map(entry => entry.humidity);
        const dates = filteredData.map(entry => formatDate(entry.createdAt, selectedRange));

        setTemperature(temperatures);
        setHumidity(humidities);
        setDate(dates);
        setHistoricalData(filteredData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };
    fetchHistoricalData();
  }, [selectedRange, refresh]);

  // Function to filter data by selected date range
  const filterDataByRange = (data, range) => {
    const currentDate = new Date();
    let startDate;

    switch (range) {
      case '24h':
        startDate = sub(currentDate, { days: 1 });
        break;
      case 'week':
        startDate = sub(currentDate, { weeks: 1 });
        break;
      // Add more cases for other date ranges as needed
      default:
        startDate = startOfDay(currentDate);
    }

    return data.filter(entry => new Date(entry.createdAt) >= startDate);
  };

  // Function to format dates based on the selected range
  const formatDate = (date, range) => {
    if (range === '24h') {
      return format(new Date(date), 'HH:mm');
    }
    return format(new Date(date), 'MMM do HH:mm');
  };

  return (
    <div>
      <h2>Historical Sensor Data</h2>
      <FormControl variant="outlined" width="auto" margin="normal">
        <InputLabel>Select Date Range</InputLabel>
        <Select
          value={selectedRange}
          onChange={e => setSelectedRange(e.target.value)}
          label="Select Date Range"
        >
          <MenuItem value="24h">Last 24 Hours</MenuItem>
          <MenuItem value="week">Last Week</MenuItem>
        </Select>
        <Button variant="contained" onClick={handleRefresh} style={{marginTop:'20%'}}>Refresh Data</Button>
      </FormControl>
      {historicalData ? (
        <Grid container spacing={2}> 
          <Grid item xs={6}> 
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginTop="-7%">
              <LineChart
                width={600}
                height={350}
                series={[{ data: temperature, label: 'Temperature', area: true, color:'green' }]}
                xAxis={[{ scaleType: 'point', data: date }]}
                sx={{
                  [`& .${lineElementClasses.root}`]: {
                    display: 'none',
                  },
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={6}> 
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginTop="-7%">
              <LineChart
                width={600}
                height={350}
                series={[{ data: humidity, label: 'Humidity', area: true }]}
                xAxis={[{ scaleType: 'point', data: date }]}
                sx={{
                  [`& .${lineElementClasses.root}`]: {
                    display: 'none',
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LineChartComponent;
