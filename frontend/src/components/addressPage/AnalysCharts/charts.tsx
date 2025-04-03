import React from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem
} from 'chart.js';
import styled from '@emotion/styled';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Стилизованные компоненты
const ChartContainer = styled.div`
  background: radial-gradient(ellipse at center, #1A0327 0%, #0F0118 100%);
  border-radius: 24px;
  border: 1px solid #4B0082;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 0 30px rgba(138, 43, 226, 0.3);
`;

const ChartWrapper = styled.div`
  height: 400px;
  position: relative;
`;

// Типы данных
interface PieChartProps {
  data: Array<{
    id: string;
    value: number;
    color?: string;
  }>;
}

interface BarLineChartProps {
  data: Array<{
    hour: string;
    count: number;
  }>;
}

// Компонент PieChart
export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const purpleColors = [
    '#2E0854', '#3D0B6B', '#4B1282', '#5A1E99', 
    '#6A2DB0', '#7A3DC0', '#8A4FD1'
  ];

  const chartData = {
    labels: data.map(item => item.id),
    datasets: [{
      data: data.map(item => item.value),
      backgroundColor: data.map((item, index) => 
        item.color || purpleColors[Math.min(index, purpleColors.length - 1)]
      ),
      borderColor: '#0F0118',
      borderWidth: 2,
      hoverBorderColor: '#E6E6FA',
      hoverBorderWidth: 3,
    }]
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#E6E6FA',
          font: {
            family: '"Rajdhani", sans-serif',
            size: 14,
            weight: 'bold'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#1A0327',
        titleColor: '#D8BFD8',
        bodyColor: '#E6E6FA',
        borderColor: '#8A2BE2',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const label = context.label || '';
            const value = context.raw;
            return `  ${label}: ${Number(value).toFixed(2)}%`;
          }
        }
      },
      title: {
        display: false,
        color: '#D8BFD8',
        font: {
          family: '"Rajdhani", sans-serif',
          size: 18,
          weight: 'bold'
        },
        padding: { top: 10, bottom: 20 }
      }
    },
    cutout: '65%',
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 2000
    },
    elements: {
      arc: {
        borderRadius: 10,
        borderJoinStyle: 'round'
      }
    }
  };

  return (
    <ChartContainer>
      <ChartWrapper>
        <Pie data={chartData} options={options} />
      </ChartWrapper>
    </ChartContainer>
  );
};

// Компонент BarChart
export const BarChart: React.FC<BarLineChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.hour),
    datasets: [{
      label: 'Количество сделок',
      data: data.map(item => item.count),
      backgroundColor: 'rgba(91, 14, 240, 0.7)',
      borderColor: 'rgba(147, 112, 219, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(147, 112, 219, 0.8)',
      hoverBorderColor: '#E6E6FA',
      hoverBorderWidth: 2,
      borderRadius: 6,
    }]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E6E6FA',
          font: {
            family: '"Rajdhani", sans-serif',
            size: 14,
            weight: 'bold'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#1A0327',
        titleColor: '#D8BFD8',
        bodyColor: '#E6E6FA',
        borderColor: '#8A2BE2',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 10,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            return `  ${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
          }
        }
      },
      title: {
        display: false,
        color: '#D8BFD8',
        font: {
          family: '"Rajdhani", sans-serif',
          size: 18,
          weight: 'bold'
        },
        padding: { top: 10, bottom: 20 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#E6E6FA' },
        grid: { color: 'rgba(142, 142, 142, 0.1)' },
        border: { color: 'rgba(142, 142, 142, 0.3)' }
      },
      x: {
        ticks: { color: '#E6E6FA' },
        grid: { color: 'rgba(142, 142, 142, 0.1)' },
        border: { color: 'rgba(142, 142, 142, 0.3)' }
      }
    }
  };

  return (
    <ChartContainer>
      <ChartWrapper>
        <Bar data={chartData} options={options} />
      </ChartWrapper>
    </ChartContainer>
  );
};

// Компонент LineChart
export const LineChart: React.FC<BarLineChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.hour),
    datasets: [{
      label: 'Активность сделок',
      data: data.map(item => item.count),
      borderColor: 'rgba(147, 112, 219, 1)',
      backgroundColor: 'rgba(147, 112, 219, 0.1)',
      borderWidth: 3,
      pointBackgroundColor: '#5B0EF0',
      pointBorderColor: '#E6E6FA',
      pointHoverRadius: 8,
      pointHoverBackgroundColor: '#E6E6FA',
      pointHoverBorderColor: '#5B0EF0',
      pointRadius: 5,
      pointHitRadius: 10,
      tension: 0.3,
      fill: true
    }]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E6E6FA',
          font: {
            family: '"Rajdhani", sans-serif',
            size: 14,
            weight: 'bold'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#1A0327',
        titleColor: '#D8BFD8',
        bodyColor: '#E6E6FA',
        borderColor: '#8A2BE2',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            return `  ${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
          }
        }
      },
      title: {
        display: true,
        text: 'ГРАФИК АКТИВНОСТИ',
        color: '#D8BFD8',
        font: {
          family: '"Rajdhani", sans-serif',
          size: 18,
          weight: 'bold'
        },
        padding: { top: 10, bottom: 20 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#E6E6FA' },
        grid: { color: 'rgba(142, 142, 142, 0.1)' },
        border: { color: 'rgba(142, 142, 142, 0.3)' }
      },
      x: {
        ticks: { color: '#E6E6FA' },
        grid: { color: 'rgba(142, 142, 142, 0.1)' },
        border: { color: 'rgba(142, 142, 142, 0.3)' }
      }
    }
  };

  return (
    <ChartContainer>
      <ChartWrapper>
        <Line data={chartData} options={options} />
      </ChartWrapper>
    </ChartContainer>
  );
};