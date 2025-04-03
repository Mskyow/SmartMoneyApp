import { Box, Typography, Paper, Divider, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { PieChart, BarChart, LineChart } from "./AnalysCharts/charts"; // Импортируем наши кастомные компоненты
import React from "react";
import { FullReport, ProtocolStats } from "../../store/slice/AddressPage/types";

interface TraderAnalysisProps {
  data: FullReport;
}

interface MetricCardProps {
  title: string;
  value: string;
  color: string;
}

interface ProtocolsCardProps {
  data: ProtocolStats;
}

interface PatternsCardProps {
  data: {
    detectedPatterns: {
      memeTrading: string;
      suspiciousContracts: string;
    };
  };
}

const TraderAnalysis: React.FC<TraderAnalysisProps> = ({ data }) => {
  return (
    <Box sx={{ 
      color: 'rgba(255,255,255,0.9)',
      maxWidth: 1200,
      mx: 'auto',
      py: 3
    }}>
      {/* Заголовок с неоновым эффектом */}
      <Typography variant="h5" sx={{
        mb: 4,
        fontWeight: 700,
        letterSpacing: '0.5px',
        textShadow: '0 0 8px rgba(95, 15, 255, 0.5)',
        '&::before': {
          content: '""',
          display: 'inline-block',
          width: '10px',
          height: '10px',
          background: '#5F0FFF',
          borderRadius: '50%',
          mr: 1.5,
          boxShadow: '0 0 10px #5F0FFF'
        }
      }}>
        Анализ торговой активности
      </Typography>

      {/* Ключевые показатели */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 3,
        mb: 4
      }}>
        {data.keyFindings.map((finding, index) => (
          <Paper key={index} sx={{
            p: 3.5,
            color :' rgb(255, 255, 255)',
            borderRadius: '12px',
            background: 'rgba(57, 6, 84, 0.3)',
            border: '1px solid rgba(91, 14, 240, 0.2)',
            boxShadow: '0 4px 20px rgba(95, 15, 255, 0.1)',
            '&:hover': {
              boxShadow: '0 4px 25px rgba(95, 15, 255, 0.2)'
            }
          }}>
            <Typography sx={{ 
              fontSize: '0.95rem',
              lineHeight: 1.5,
              '&::before': {
                content: '"•"',
                color: '#5F0FFF',
                display: 'inline-block',
                width: '1em',
                ml: '-1em'
              }
            }}>
              {finding}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Основные графики */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { md: '1fr 1fr' },
        gap: 3,
        mb: 4
      }}>
        {/* Распределение токенов */}
        <Paper sx={{
          p: 2,
          borderRadius: '14px',
          border: '1px solid rgba(142, 142, 142, 0.2)',
          boxShadow: '0 8px 32px rgba(95, 15, 255, 0.1)',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)'
        }}>
          <Typography variant="h6" sx={{  color :' rgb(255, 255, 255)', mb: 2, fontWeight: 600 }}>
            Распределение торгов по токенам
          </Typography>
          <Box sx={{ height: '100%' }}>
            <PieChart 
              data={data.chartsData.tokenDistribution.token.map((token, i) => ({
                id: token.slice(0, 6) + '...' + token.slice(-4),
                value: parseFloat(data.chartsData.tokenDistribution.percentage[i]),
                color: `hsl(${i * 70}, 70%, 50%)`
              }))} 
            />
          </Box>
        </Paper>

        {/* Частота торгов по часам */}
        <Paper sx={{
          p: 2,
          borderRadius: '14px',
          border: '1px solid rgba(142, 142, 142, 0.2)',
          boxShadow: '0 8px 32px rgba(95, 15, 255, 0.1)',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)'
        }}>
          <Typography variant="h6" sx={{ color :' rgb(255, 255, 255)', mb: 2, fontWeight: 600 }}>
            Частота торгов по часам
          </Typography>
          <Box sx={{ height: 300 }}>
            <LineChart 
              data={data.chartsData.tradeFrequency.hour_of_day.map((hour, i) => ({
                hour: `${hour}:00`,
                count: data.chartsData.tradeFrequency.count[i]
              }))}
            />
          </Box>
        </Paper>

        
      </Box>

      
              
      {/* Финансовые метрики */}
      <Paper sx={{
        p: 3,
        mb: 4,
        borderRadius: '14px',
        border: '1px solid rgba(91, 14, 240, 0.3)',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(95, 15, 255, 0.1)'
      }}>
        <Typography variant="h6" sx={{  color :' rgb(255, 255, 255)', mb: 3, fontWeight: 600 }}>
          Финансовые показатели
        </Typography>
        
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 3,
          mb: 3
        }}>
          <MetricCard 
            title="Общий объем" 
            value={`${data.financialMetrics.totalVolumeSOL.toFixed(2)} SOL`} 
            color="#9c27b0"
          />
          <MetricCard 
            title="Средний размер сделки" 
            value={`${data.financialMetrics.averageTradeSize.toFixed(2)} SOL`} 
            color="#673ab7"
          />
          <MetricCard 
            title="Соотношение покупок/продаж" 
            value={`${data.financialMetrics.buySellRatio.buys}/${data.financialMetrics.buySellRatio.sells}`} 
            color="#3f51b5"
          />
        </Box>

        <Divider sx={{ borderColor: 'rgba(142, 142, 142, 0.2)', my: 3 }} />

        <Typography variant="subtitle1" sx={{  color :' rgb(255, 255, 255)',mb: 2, fontWeight: 500 }}>
          Крупнейшие сделки
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{
                background: 'linear-gradient(90deg, rgba(91, 14, 240, 0.1) 0%, rgba(57, 6, 84, 0.05) 100%)'
              }}>
                <TableCell sx={{ color :' rgb(255, 255, 255)', fontWeight: 700 }}>Дата</TableCell>
                <TableCell sx={{ color :' rgb(255, 255, 255)', fontWeight: 700 }}>Токен</TableCell>
                <TableCell sx={{ color :' rgb(255, 255, 255)', fontWeight: 700 }}>Направление</TableCell>
                <TableCell sx={{ color :' rgb(255, 255, 255)', fontWeight: 700 }}>Сумма</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.financialMetrics.topTrades.map((trade, i) => (
                <TableRow key={i} sx={{ 
                  '&:hover': { background: 'rgba(91, 14, 240, 0.05)' }
                }}>
                  <TableCell sx={{color :' rgb(255, 255, 255)'}}>{new Date(trade.date).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ 
                    color: trade.direction === 'buy' ? '#4caf50' : '#f44336',
                    fontWeight: 600
                  }}>
                    {trade.direction === 'buy' ? 'Покупка' : 'Продажа'}
                  </TableCell>
                  <TableCell sx={{color :' rgb(255, 255, 255)'}}>
                    {trade.token.slice(0, 6)}...{trade.token.slice(-4)}</TableCell>
                  <TableCell sx={{color :' rgb(255, 255, 255)'}}>{trade.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Дополнительные разделы */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { md: '1fr 1fr' },
        gap: 3,
        mb: 4
      }}>
        {/* Топ протоколы */}
        <ProtocolsCard data={data.generalStats.topProtocols} />
        
        {/* Паттерны и риски */}
        <PatternsCard data={data.patternsAndRisks} />
      </Box>
    </Box>
  );
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, color }) => (
  <Paper sx={{
    p: 2,
    borderRadius: '10px',
    background: `linear-gradient(135deg, ${color}33 0%, rgba(57, 6, 84, 0.2) 100%)`,
    border: `1px solid ${color}33`
  }}>
    <Typography variant="subtitle2" sx={{ 
      color: 'rgba(255,255,255,0.7)',
      mb: 1,
      fontSize: '0.8rem'
    }}>
      {title}
    </Typography>
    <Typography variant="h5" sx={{ 
      fontWeight: 700,
      background: `linear-gradient(90deg, ${color} 0%, #fff 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }}>
      {value}
    </Typography>
  </Paper>
);

const ProtocolsCard: React.FC<ProtocolsCardProps> = ({ data }) => {
  const protocols = (Object.entries(data) as [string, number][])
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);

  
  return (
    <Paper sx={{
      p: 3,
      color :' rgb(255, 255, 255)',
      borderRadius: '14px',
      border: '1px solid rgba(91, 14, 240, 0.3)',
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(95, 15, 255, 0.1)'
    }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Топ протоколов
      </Typography>
      
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        {protocols.map(([protocol, count], i) => (
          <Box key={i} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography sx={{ flex: 1 }}>
              {protocol.length > 20 ? protocol.slice(0, 10) + '...' : protocol}
            </Typography>
            <Box sx={{ 
              flex: 1,
              height: '8px',
              background: 'rgba(142, 142, 142, 0.2)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <Box sx={{
                width: `${(count / protocols[0][1]) * 100}%`,
                height: '100%',
                background: `linear-gradient(90deg, rgba(91, 14, 240, 0.7) 0%, rgba(57, 6, 84, 0.5) 100%)`,
                borderRadius: '4px'
              }} />
            </Box>
            <Typography sx={{ 
              flex: 0.3,
              textAlign: 'right',
              fontWeight: 600
            }}>
              {count}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

const PatternsCard: React.FC<PatternsCardProps> = ({ data }) => (
  <Paper sx={{
    p: 3,
    borderRadius: '14px',
    border: '1px solid rgba(255, 76, 76, 0.3)',
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(255, 76, 76, 0.1)'
  }}>
    <Typography variant="h6" sx={{ 
      mb: 3,
      fontWeight: 600,
      color: 'rgba(255, 76, 76, 0.9)'
    }}>
      Обнаруженные паттерны и риски
    </Typography>
    
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      {Object.entries(data.detectedPatterns).map(([pattern, description], i) => (
        <Box key={i}>
          <Typography sx={{ 
            fontWeight: 600,
            color: '#ff4c4c',
            mb: 0.5
          }}>
            {pattern}
          </Typography>
          <Typography sx={{ 
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.9rem'
          }}>
            {description}
          </Typography>
        </Box>
      ))}
    </Box>
  </Paper>
);

export default TraderAnalysis;