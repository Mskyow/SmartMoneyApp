import { ChartData } from 'chart.js';

interface IToken {
  symbol: string;
  percentage: number | null;
}

interface TokenWithPercentage extends IToken {
  percentage: number;
}

export const prepareChartData = (
  tokens: IToken[],
  othersThreshold = 1
): ChartData<'pie'> => {
  // 1. Фильтруем токены с известным процентом и явно указываем тип
  const validTokens = tokens.filter(
    (token): token is TokenWithPercentage => token.percentage !== null
  );

  const mainTokens = validTokens.filter(token => token.percentage > othersThreshold);
  const smallTokens = validTokens.filter(token => token.percentage <= othersThreshold);

  const labels = mainTokens.map(token => token.symbol);
  const data = mainTokens.map(token => token.percentage);

  if (smallTokens.length > 0) {
    const othersPercentage = smallTokens.reduce((sum, token) => sum + token.percentage, 0);
    labels.push(`Others (${smallTokens.length})`);
    data.push(othersPercentage);
  }

  // Фиолетовые градиенты с эффектом неонового свечения
  const purpleColors = [
    '#2E0854', // Самый темный (для наибольшего процента)
    '#3D0B6B',
    '#4B1282', 
    '#5A1E99',
    '#6A2DB0',
    '#7A3DC0',
    '#8A4FD1'  // Самый светлый (для наименьшего процента)
  ]

    // Распределяем цвета
    const colorMap: Record<string, string> = {};
    
    mainTokens.forEach((token, index) => {
    const colorIndex = Math.min(index, purpleColors.length - 1);
    colorMap[token.symbol] = purpleColors[colorIndex];
    });

    // Для "Других" используем нейтральный цвет
    if (smallTokens.length > 0) {
    colorMap[`Others (${smallTokens.length})`] = '#5D5D5D';
    }


  return {
    labels,
    datasets: [{
      data,
      backgroundColor: labels.map(label => colorMap[label]),
      borderColor: '#0F0118', // Темно-фиолетовая граница
      borderWidth: 2,
      hoverBorderColor: '#E6E6FA', // Светло-лавандовый при наведении
      hoverBorderWidth: 3,
      
    //   hoverShadowBlur: 20,
    //   hoverShadowColor: 'rgba(147, 112, 219, 0.8)'
    }]
  };
};

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%', // Донат-стиль
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: '#E6E6FA',
        font: {
          family: '"Rajdhani", sans-serif', // Стильный tech-шрифт
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
        label: (context: { label: string; raw: number; }) => {
          const label = context.label || '';
          const value = context.raw || 0;
          return `  ${label}: ${value.toFixed(2)}%`;
        }
      }
    },
    title: {
      display: true,
      text: 'РАСПРЕДЕЛЕНИЕ ПОРТФЕЛЯ',
      color: '#D8BFD8',
      font: {
        family: '"Rajdhani", sans-serif',
        size: 18,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 20
      }
    }
  },
  animation: {
    animateScale: true,
    animateRotate: true,
    duration: 2000
  },
  elements: {
    arc: {
      borderRadius: 10, // Скругленные углы сегментов
      borderJoinStyle: 'round'
    }
  }
};