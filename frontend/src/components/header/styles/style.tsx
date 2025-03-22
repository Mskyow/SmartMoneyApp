

export const headOfPage = {
    display: "flex",
    flexDirection: "row",
    alignItems: "top",
    padding : 1,
    gap : 20
}

export const logoText = {
    color: "#FFF",
    fontFamily: "jsMath-cmti10", // Используемый шрифт
    fontSize: "44px",  // Условный размер текста
    fontStyle: "Italic",
    fontWeight: 500,
    lineHeight: "normal",
    marginLeft : '30px',
    transition: "font-size 0.3s ease", // Анимация изменения размера текста
}
export const sidebarStyles2 = {
    display : "flex",
    width: "520px", // Фиксированная ширина
    height: "6vh",          // Пример: высота контейнера на весь экран
    align : "center",
    justifyContent: "center", // Выравнивание по горизонтали
    alignItems: "center",     // Выравнивание по вертикали
    borderRadius: "30px", // Закруглённые углы
    border: "1px solid #999", // Белая рамка
    gap : 6,
    background: `linear-gradient(180deg, 
    rgba(255, 255, 255, 0.10) 0%,
    rgba(137, 32, 235, 0.40) 24.5%,
    rgba(137, 32, 235, 0.40) 77.5%,
    rgba(255, 255, 255, 0.10) 100%);
    )`, // Градиентный фон
    boxShadow: `
      0px 4px 4px 0px rgba(255, 255, 255, 0.15) inset, 0px 0px 68px 0px rgba(255, 255, 255, 0.05) inset;
    `, // Тени (внутренние)
    backdropFilter: "blur(24px)", // Размытие
  };

  