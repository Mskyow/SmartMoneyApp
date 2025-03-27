import { ChartData, ChartOptions, ScriptableContext } from 'chart.js';

export interface IToken {
  symbol: string;
  percentage: number | null;
}

export interface PortfolioChartProps {
  tokens: IToken[];
  othersThreshold?: number;
}

export type PieChartData = ChartData<'pie', number[], string>;
export type PieChartOptions = ChartOptions<'pie'> & {
  cutout?: string;
  elements?: {
    arc?: {
      borderRadius?: number;
      borderJoinStyle?: 'round' | 'bevel' | 'miter';
    };
  };
};