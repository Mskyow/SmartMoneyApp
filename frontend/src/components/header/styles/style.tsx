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
  justifyContent: "left", // Выравнивание по горизонтали
  alignItems: "center", // Выравнивание по вертикали
  borderRadius: "0px 0px 20px 20px", // Закруглённые углы
  gap: 4,
  marginTop : '0px', 
  marginRight:"20px",
};