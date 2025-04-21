import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Select,
  SimpleGrid,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Divider
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getMetricsForPeriod, getMetricTrend } from '../data/userProfile';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HealthMetrics = () => {
  const [timeFilter, setTimeFilter] = useState('month');
  const [heartRateData, setHeartRateData] = useState([]);
  const [stepsData, setStepsData] = useState([]);
  const [caloriesData, setCaloriesData] = useState([]);
  const [sleepData, setSleepData] = useState([]);
  const [bloodPressureData, setBloodPressureData] = useState([]);
  const [weightData, setWeightData] = useState([]);

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    // Load data based on the selected time filter
    setHeartRateData(getMetricsForPeriod('heartRate', timeFilter));
    setStepsData(getMetricsForPeriod('steps', timeFilter));
    setCaloriesData(getMetricsForPeriod('caloriesBurned', timeFilter));
    setSleepData(getMetricsForPeriod('sleepHours', timeFilter));
    setBloodPressureData(getMetricsForPeriod('bloodPressure', timeFilter));
    setWeightData(getMetricsForPeriod('weight', timeFilter));
  }, [timeFilter]);

  const handleFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };

  // Helper function to prepare chart data
  const prepareChartData = (data, label, color) => {
    return {
      labels: data.map(item => item.date),
      datasets: [
        {
          label,
          data: data.map(item => item.value),
          borderColor: color,
          backgroundColor: `${color}33`, // 33 is for 20% opacity
          tension: 0.3,
          fill: true
        }
      ]
    };
  };

  // Helper function to prepare blood pressure chart data
  const prepareBloodPressureData = (data) => {
    return {
      labels: data.map(item => item.date),
      datasets: [
        {
          label: 'Systolic',
          data: data.map(item => item.systolic),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.3,
          fill: false
        },
        {
          label: 'Diastolic',
          data: data.map(item => item.diastolic),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.3,
          fill: false
        }
      ]
    };
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    },
    maintainAspectRatio: false
  };

  return (
    <Box
      p={5}
      bg={cardBg}
      borderRadius="lg"
      boxShadow="md"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Health Metrics</Heading>
        <Select 
          value={timeFilter} 
          onChange={handleFilterChange} 
          width="150px"
          size="sm"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last Year</option>
        </Select>
      </Flex>

      <Divider mb={4} />

      {/* Summary Stats */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={6}>
        <Stat>
          <StatLabel>Heart Rate</StatLabel>
          <StatNumber>
            {heartRateData.length ? heartRateData[heartRateData.length - 1].value : '--'} bpm
          </StatNumber>
          <StatHelpText>
            <StatArrow 
              type={getMetricTrend('heartRate') === 'increase' 
                ? 'increase' 
                : getMetricTrend('heartRate') === 'decrease' 
                  ? 'decrease' 
                  : 'increase'} 
              color={getMetricTrend('heartRate') === 'stable' ? 'gray.500' : undefined}
            />
            {getMetricTrend('heartRate') === 'stable' ? 'Stable' : getMetricTrend('heartRate') === 'increase' ? 'Increasing' : 'Decreasing'}
          </StatHelpText>
        </Stat>
        
        <Stat>
          <StatLabel>Daily Steps</StatLabel>
          <StatNumber>
            {stepsData.length ? stepsData[stepsData.length - 1].value.toLocaleString() : '--'}
          </StatNumber>
          <StatHelpText>
            <StatArrow 
              type={getMetricTrend('steps') === 'increase' 
                ? 'increase' 
                : getMetricTrend('steps') === 'decrease' 
                  ? 'decrease' 
                  : 'increase'} 
              color={getMetricTrend('steps') === 'stable' ? 'gray.500' : undefined}
            />
            {getMetricTrend('steps') === 'stable' ? 'Stable' : getMetricTrend('steps') === 'increase' ? 'Increasing' : 'Decreasing'}
          </StatHelpText>
        </Stat>
        
        <Stat>
          <StatLabel>Sleep</StatLabel>
          <StatNumber>
            {sleepData.length ? sleepData[sleepData.length - 1].value : '--'} hrs
          </StatNumber>
          <StatHelpText>
            <StatArrow 
              type={getMetricTrend('sleepHours') === 'increase' 
                ? 'increase' 
                : getMetricTrend('sleepHours') === 'decrease' 
                  ? 'decrease' 
                  : 'increase'} 
              color={getMetricTrend('sleepHours') === 'stable' ? 'gray.500' : undefined}
            />
            {getMetricTrend('sleepHours') === 'stable' ? 'Stable' : getMetricTrend('sleepHours') === 'increase' ? 'Increasing' : 'Decreasing'}
          </StatHelpText>
        </Stat>
        
        <Stat>
          <StatLabel>Weight</StatLabel>
          <StatNumber>
            {weightData.length ? weightData[weightData.length - 1].value : '--'} kg
          </StatNumber>
          <StatHelpText>
            <StatArrow 
              type={getMetricTrend('weight') === 'increase' 
                ? 'increase' 
                : getMetricTrend('weight') === 'decrease' 
                  ? 'decrease' 
                  : 'increase'} 
              color={getMetricTrend('weight') === 'stable' ? 'gray.500' : undefined}
            />
            {getMetricTrend('weight') === 'stable' ? 'Stable' : getMetricTrend('weight') === 'increase' ? 'Increasing' : 'Decreasing'}
          </StatHelpText>
        </Stat>
      </SimpleGrid>

      {/* Charts */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={4}>
        {/* Heart Rate Chart */}
        <Box 
          height="250px" 
          p={4} 
          borderRadius="md" 
          borderWidth="1px" 
          borderColor={borderColor}
        >
          <Text fontSize="md" fontWeight="medium" mb={3}>Heart Rate (bpm)</Text>
          {heartRateData.length > 0 && (
            <Line 
              data={prepareChartData(heartRateData, 'Heart Rate', 'rgb(255, 99, 132)')} 
              options={chartOptions} 
            />
          )}
        </Box>

        {/* Steps Chart */}
        <Box 
          height="250px" 
          p={4} 
          borderRadius="md" 
          borderWidth="1px" 
          borderColor={borderColor}
        >
          <Text fontSize="md" fontWeight="medium" mb={3}>Steps</Text>
          {stepsData.length > 0 && (
            <Line 
              data={prepareChartData(stepsData, 'Steps', 'rgb(54, 162, 235)')} 
              options={chartOptions} 
            />
          )}
        </Box>

        {/* Calories Chart */}
        <Box 
          height="250px" 
          p={4} 
          borderRadius="md" 
          borderWidth="1px" 
          borderColor={borderColor}
        >
          <Text fontSize="md" fontWeight="medium" mb={3}>Calories Burned</Text>
          {caloriesData.length > 0 && (
            <Line 
              data={prepareChartData(caloriesData, 'Calories', 'rgb(255, 159, 64)')} 
              options={chartOptions} 
            />
          )}
        </Box>

        {/* Sleep Chart */}
        <Box 
          height="250px" 
          p={4} 
          borderRadius="md" 
          borderWidth="1px" 
          borderColor={borderColor}
        >
          <Text fontSize="md" fontWeight="medium" mb={3}>Sleep (hours)</Text>
          {sleepData.length > 0 && (
            <Line 
              data={prepareChartData(sleepData, 'Sleep', 'rgb(153, 102, 255)')} 
              options={chartOptions} 
            />
          )}
        </Box>

        {/* Blood Pressure Chart */}
        <Box 
          height="250px" 
          p={4} 
          borderRadius="md" 
          borderWidth="1px" 
          borderColor={borderColor}
        >
          <Text fontSize="md" fontWeight="medium" mb={3}>Blood Pressure</Text>
          {bloodPressureData.length > 0 && (
            <Line 
              data={prepareBloodPressureData(bloodPressureData)} 
              options={chartOptions} 
            />
          )}
        </Box>

        {/* Weight Chart */}
        <Box 
          height="250px" 
          p={4} 
          borderRadius="md" 
          borderWidth="1px" 
          borderColor={borderColor}
        >
          <Text fontSize="md" fontWeight="medium" mb={3}>Weight (kg)</Text>
          {weightData.length > 0 && (
            <Line 
              data={prepareChartData(weightData, 'Weight', 'rgb(75, 192, 192)')} 
              options={chartOptions} 
            />
          )}
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default HealthMetrics; 