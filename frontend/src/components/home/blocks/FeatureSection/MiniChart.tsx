import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip, // Оставляем Tooltip для интерактивности
  ResponsiveContainer,
  ReferenceDot,
  Label
} from 'recharts';

// Примерные данные (можно использовать ваши)
const chartData = [
  { name: 'Jan', value: 120 },
  { name: 'Feb', value: 300 }, // Точка покупки (минимум в этом примере)
  { name: 'Mar', value: 250 },
  { name: 'Apr', value: 600 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 950 }, // Точка продажи (максимум)
  { name: 'Jul', value: 800 },
];

// --- Конфигурация стиля (можно вынести в константы или тему) ---
const COLORS = {
  // Используем более "сочные" и современные цвета
  areaStroke: 'rgba(182, 117, 183, 0.82)', // Яркий синий (iOS стиль) или выберите цвет бренда
  areaGradientFrom: 'rgba(179, 0, 255, 0.7)', 
  areaGradientTo: 'rgba(234, 0, 255, 0.77)',   
  buyPoint: 'rgb(156, 255, 128)',   // Яркий зеленый (iOS стиль)
  sellPoint: 'rgb(255, 101, 101)',  // Яркий красный (iOS стиль) - все еще понятен для "продажи"
  tooltipBg: 'rgba(28, 28, 30, 0.85)', // Полупрозрачный темный фон для тултипа
  tooltipBorder: 'rgba(80, 80, 80, 0.5)',
  tooltipText: '#FFFFFF',
  dotStroke: 'rgb(0,0,0)', // Цвет фона карточки (предполагаем темную тему) для эффекта "вырезания"
  labelBuy: 'rgba(172, 255, 149, 0.86)',
  labelSell: 'rgba(255, 101, 101, 0.95)',
};

const STYLE_CONFIG = {
  areaStrokeWidth: 2.2,
  dotRadius: 7,        // Увеличим точки для акцента
  dotStrokeWidth: 2,   // Увеличим обводку для эффекта "вырезания"
  labelFontSize: 11,
  labelFontWeight: 'bold',
  tooltipBorderRadius: 8,
  chartHeight: 200, // Возможно, чуть больше высоты для воздуха
  domainVerticalPadding: 120 // Увеличим отступ сверху/снизу
};
// --------------------------------------------------------------------

export const MiniChart = () => {
  const buyPoint = chartData.length > 0
    ? chartData[1]
    : null;

  const sellPoint = chartData.length > 0
    ? chartData.reduce((max, p) => p.value > max.value ? p : max, chartData[0])
    : null;

  // Уникальный ID для градиента, если на странице несколько таких графиков
  const gradientId = `colorValue_${Math.random().toString(36).substring(7)}`;

  return (
    // Добавляем класс для возможных дополнительных стилей CSS
    <div className="mini-chart-wrapper" style={{ width: '100%', height: `${STYLE_CONFIG.chartHeight}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          // Добавляем отступы, чтобы точки и лейблы не прилипали к краям
          margin={{ top: 15, right: 10, left: 10, bottom: 15 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor={COLORS.areaGradientFrom} stopOpacity={0.8} />
              <stop offset="90%" stopColor={COLORS.areaGradientTo} stopOpacity={0.1} />
            </linearGradient>
          </defs>

          {/* Оси полностью скрыты */}
          <XAxis dataKey="name" hide />
          <YAxis hide domain={['dataMin - ' + STYLE_CONFIG.domainVerticalPadding, 'dataMax + ' + STYLE_CONFIG.domainVerticalPadding]} />

          {/* Тултип для интерактивности при наведении */}
          <Tooltip
            cursor={{ stroke: 'rgba(255, 255, 255, 0.3)', strokeWidth: 1, strokeDasharray: '4 4' }}
            contentStyle={{
              backgroundColor: COLORS.tooltipBg,
              borderColor: COLORS.tooltipBorder,
              borderRadius: `${STYLE_CONFIG.tooltipBorderRadius}px`,
              padding: '8px 12px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Добавим тень
              backdropFilter: 'blur(5px)', // Эффект размытия для современных интерфейсов
            }}
            itemStyle={{ color: COLORS.tooltipText, fontSize: '12px' }}
            // Можно кастомизировать контент тултипа при необходимости
            formatter={(value) => [`$${value.toLocaleString()}`, null]} // Пример форматирования
          />

          {/* Сама область графика */}
          <Area
            type="monotone" // Плавная линия
            dataKey="value"
            stroke={COLORS.areaStroke}
            strokeWidth={STYLE_CONFIG.areaStrokeWidth}
            fillOpacity={1} // Градиент сам управляет прозрачностью
            fill={`url(#${gradientId})`}
            isAnimationActive={true} // Оставляем анимацию для плавности
            animationDuration={500}
          />

          {/* Точка Покупки (Buy) */}
          {buyPoint && (
            <ReferenceDot
              x={buyPoint.name}
              y={buyPoint.value}
              r={STYLE_CONFIG.dotRadius}
              fill={COLORS.buyPoint}
              stroke={COLORS.dotStroke} // Цвет фона для "вырезания"
              strokeWidth={STYLE_CONFIG.dotStrokeWidth}
              isFront={true}
            >
              <Label
                value="BUY" // Крупными буквами для акцента
                // position="insideBottom" // Может перекрываться линией при низких значениях
                position="bottom" // Попробуем под точкой
                offset={15} // Увеличим отступ
                fill={COLORS.labelBuy}
                fontSize={STYLE_CONFIG.labelFontSize}
                fontWeight={STYLE_CONFIG.labelFontWeight}
                style={{ pointerEvents: 'none' }} // Чтобы не мешала тултипу
              />
            </ReferenceDot>
          )}

          {/* Точка Продажи (Sell) */}
          {sellPoint && (
            <ReferenceDot
              x={sellPoint.name}
              y={sellPoint.value}
              r={STYLE_CONFIG.dotRadius}
              fill={COLORS.sellPoint}
              stroke={COLORS.dotStroke} // Цвет фона для "вырезания"
              strokeWidth={STYLE_CONFIG.dotStrokeWidth}
              isFront={true}
            >
              <Label
                value="SELL" // Крупными буквами
                position="top" // Над точкой
                offset={10} // Отступ
                fill={COLORS.labelSell}
                fontSize={STYLE_CONFIG.labelFontSize}
                fontWeight={STYLE_CONFIG.labelFontWeight}
                style={{ pointerEvents: 'none' }}
              />
            </ReferenceDot>
          )}

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};