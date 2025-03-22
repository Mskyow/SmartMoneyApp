import { Margin } from "@mui/icons-material";

export const mainContainerStyles = {
    minheight: "50vh", // Высота, можно адаптировать
    borderRadius: "30px", // Закруглённые углы
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
    backdropFilter: "blur(24px)", // Размытие
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    margin : '0 16px 16px 16px',
    flex: 1, // Занимает всё доступное пространство
  }