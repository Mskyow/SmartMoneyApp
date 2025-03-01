export const mainContainerStyles = {
    flex: 1, // Занимает всё оставшееся пространство
    height: "90vh", // Высота, можно адаптировать
    borderRadius: "30px", // Закруглённые углы
    border: "1px solid #FFF", // Белая рамка
    // opacity : '0.6',
    background: `radial-gradient(
      333.47% 130.9% at 10.74% 15.23%, 
      rgba(0, 0, 0, 0.77) 0%, 
      rgba(255, 255, 255, 0.18) 57.98%, 
      rgb(255, 255, 255) 93.9%
    )`, // Градиентный фон
    boxShadow: `
      0px 4px 4px 0px rgba(255, 255, 255, 0.15) inset, 
      0px 0px 68px 0px rgba(255, 255, 255, 0.05) inset
    `, // Тени (внутренние)
    backdropFilter: "blur(24px)", // Размытие
    marginLeft: 2, // Расстояние между контейнерами
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: 4,
  }