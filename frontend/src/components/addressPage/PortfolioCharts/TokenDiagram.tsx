import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import styled from '@emotion/styled';
import { PieChartData, PortfolioChartProps } from './types';
import { chartOptions } from './TokenDiagram.utils';
import { prepareChartData } from './TokenDiagram.utils';

ChartJS.register(ArcElement, Tooltip, Legend);

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

export const PortfolioChart: React.FC<PortfolioChartProps> = ({ 
  tokens, 
  othersThreshold = 1 
}) => {
  const chartData = prepareChartData(tokens, othersThreshold);

  return (
    <ChartContainer>
      <ChartWrapper>
        <Pie 
          data={chartData} 
          options={chartOptions as ChartOptions<'pie'>} 
        />
      </ChartWrapper>
    </ChartContainer>
  );
};