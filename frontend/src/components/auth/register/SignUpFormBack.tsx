import React from 'react';
import { Box } from '@mui/material';
interface IBackgroundProps {
    children: React.ReactNode; // Явно указываем тип для children
  }
const Background : React.FC<IBackgroundProps> = ({ children }) => {
  return (
    <Box
      sx={{
        
        zIndex: -1, // Убедитесь, что элемент находится поверх других
        position: 'absolute', // Используйте 'absolute' или 'fixed'
        top: '50%', // Центрирование по вертикали
        left: '50%', // Центрирование по горизонтали
        transform: 'translate(-50%, -50%)', // Смещение на половину ширины и высоты
        width: '400px', // Ширина контейнера
        height: 'auto', // Автоматическая высота (или задайте конкретное значение)
        clipPath: 'url(#bgblur_0_173_1361_clip_path)',
        background:
          'radial-gradient(328.77% 129.59% at 10.74% 15.23%, rgba(0, 0, 0, 0.77) 0%, rgba(0, 0, 0, 0.77) 77.05%, rgba(255, 255, 255, 0.77) 100%)',
        boxShadow:
          '0px 4px 4px 0px rgba(255, 255, 255, 0.15) inset, 0px 0px 68px 0px rgba(255, 255, 255, 0.05) inset',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="597"
        height="757"
        viewBox="0 0 597 757"
        fill="none"
      >
        <foreignObject x="-48" y="-48" width="693" height="853">
          {/* Используем dangerouslySetInnerHTML для вставки HTML */}
          <div
            dangerouslySetInnerHTML={{
              __html: `<div xmlns="http://www.w3.org/1999/xhtml" style="backdrop-filter: blur(24px); clip-path: url(#bgblur_0_173_1361_clip_path); height: 100%; width: 100%;"></div>`,
            }}
          />
        </foreignObject>
        <g opacity="0.6" filter="url(#filter0_ii_173_1361)" data-figma-bg-blur-radius="48">
          <path
            d="M0 30C0 13.4315 13.4315 0 30 0H567C583.569 0 597 13.4315 597 30V727C597 743.569 583.569 757 567 757H30C13.4315 757 0 743.569 0 727V30Z"
            fill="url(#paint0_radial_173_1361)"
            fillOpacity="0.77"
          />
          <path
            d="M0.5 30C0.5 13.7076 13.7076 0.5 30 0.5H567C583.292 0.5 596.5 13.7076 596.5 30V727C596.5 743.292 583.292 756.5 567 756.5H30C13.7076 756.5 0.5 743.292 0.5 727V30Z"
            stroke="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_ii_173_1361"
            x="-48"
            y="-48"
            width="693"
            height="853"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="34" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0"
            />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_173_1361" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0"
            />
            <feBlend mode="normal" in2="effect1_innerShadow_173_1361" result="effect2_innerShadow_173_1361" />
          </filter>
          <clipPath id="bgblur_0_173_1361_clip_path" transform="translate(48 48)">
            <path d="M0 30C0 13.4315 13.4315 0 30 0H567C583.569 0 597 13.4315 597 30V727C597 743.569 583.569 757 567 757H30C13.4315 757 0 743.569 0 727V30Z" />
          </clipPath>
          <radialGradient
            id="paint0_radial_173_1361"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(64.1273 115.279) rotate(51.35) scale(882.015 2103.1)"
          >
            <stop />
            <stop offset="0.77054" />
            <stop offset="1" stopColor="white" />
          </radialGradient>
        </defs>
      </svg>
      {children}
    </Box>
  );
};

export default Background;