import { BorderBottom } from "@mui/icons-material";

export const headOfPage = {
  display: "flex",
  flexDirection: "row", // Элементы в строку
  alignItems: "center", // Выравнивание по центру по вертикали
  justifyContent: "space-between", // Распределение пространства между элементами
  padding: 0, // Отсутствие отступов
  width: "100%", // Контейнер занимает всю ширину
  gap: 20, // Расстояние между элементами
  marginBottom : '10px'
};

export const logoText = {
  color: "#FFF",
  fontFamily: "jsMath-cmti10", // Используемый шрифт
  fontSize: "44px",  // Условный размер текста
  fontStyle: "Italic",
  fontWeight: 500,
  lineHeight: "normal",
  transition: "font-size 0.3s ease", // Анимация изменения размера текста
  marginLeft:"20px"
};

export const sidebarStyles2 = {
  display: "flex",
  width: "720px", // Фиксированная ширина
  height: "6vh", // Пример: высота контейнера на весь экран
  justifyContent: "left", // Выравнивание по горизонтали
  alignItems: "center", // Выравнивание по вертикали
  borderRadius: "0px 0px 20px 20px", // Закруглённые углы
  gap: 4,
  border: "1px solid rgba(92, 92, 92, 0.54)", // Белая рамка
    // opacity : '0.6',
    background: `radial-gradient(
      180.47% 190.9% at 20.74% 15.23%, 
      rgba(0, 0, 0, 0.77) 35%, 
      rgba(255, 255, 255, 0.18) 57.98%, 
      rgb(255, 255, 255) 93.9%
    )`, // Градиентный фон
    boxShadow: `
      0px 4px 4px 0px rgba(255, 255, 255, 0.09) inset, 
      0px 0px 78px 0px rgba(255, 255, 255, 0.05) inset
    `, // Тени (внутренние)  
  marginTop : '0px', 
  marginRight:"20px",
};