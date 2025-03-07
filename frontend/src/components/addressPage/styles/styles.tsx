export const mainBoxPage = {
    height : '100%',
    display: "flex",
    flexDirection: "column",
    background :   "rgb(0, 0, 0) ",
}
export const headOfPage = {
    display: "flex",
    flexDirection: "row",
    alignItems: "top",
    width : "100%",
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

  export const mainBoxinsidePage = {
    display: "flex",
    flexDirection:"column",  
    gap:1, 
    padding: 2,
    borderRadius: "30px",
    height : "100%",
    border: "1px solid #FFF",
    background: `radial-gradient(333.47% 130.9% at 10.74% 15.23%, rgba(0, 0, 0, 0.77) 0%, rgba(0, 0, 0, 0.77) 57.98%, rgba(229, 229, 229, 0.24) 93.9%)`,
    boxShadow: `0px 4px 4px 0px rgba(255, 255, 255, 0.15) inset, 0px 0px 68px 0px rgba(255, 255, 255, 0.05) inset`,
    backdropFilter: "blur(24px)"
}

export const accountName = { color: "#FFF",
    fontFamily: "jsMath-cmti10", // Используемый шрифт
    fontSize: "30px",  // Условный размер текста
    fontStyle: "Italic",
    fontWeight: 500,
    lineHeight: "normal",
    transition: "font-size 0.3s ease", // Анимация изменения размера текста
}

export const accountAddress = {
    color: "rgb(195, 195, 195)",
    fontFamily: "jsMath-cmti10", // Используемый шрифт
    fontSize: "20px",  // Условный размер текста
    fontStyle: "Italic",
    fontWeight: 300,
    lineHeight: "normal",
    transition: "font-size 0.3s ease", // Анимация изменения размера текста
}

export const accountInfoPanle = {
    display: "flex",
    flexDirection :"row",
    height:"8vh",
    padding: 3,
    gap : 10 ,
    borderRadius: "30px",
    border: "1px solid #FFF",
    background: `radial-gradient(333.47% 130.9% at 10.74% 15.23%, rgba(0, 0, 0, 0.77) 0%, rgba(0, 0, 0, 0.77) 57.98%, rgba(177, 0, 242, 0.55) 93.9%)`,
    boxShadow: `0px 4px 4px 0px rgba(255, 255, 255, 0.15) inset, 0px 0px 68px 0px rgba(255, 255, 255, 0.05) inset`,
    backdropFilter: "blur(24px)",
}

export const balanceText = {
    color: "rgb(255, 255, 255)",
    fontFamily: "jsMath-cmti10",
    fontSize: "20px",
    fontStyle: "inherit",
    fontWeight: 300,
    lineHeight: "normal",
    transition: "font-size 0.3s ease",
}
export const tokensText = {
    color: "rgb(255, 255, 255)",
    fontFamily: "jsMath-cmti10",
    fontSize: "20px",
    fontStyle: "inherit",
    lineHeight: "normal",
    transition: "font-size 0.3s ease",
    textAlign: "left", // Выравнивание текста по правому краю
    fontWeight: 300,
}