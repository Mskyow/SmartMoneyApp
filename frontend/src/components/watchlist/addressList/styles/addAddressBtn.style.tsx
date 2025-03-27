export const addAddressBtn = {
              
    width:'15vw',
    fontFamily : "Inria Serif",
    fontStyle: 'normal',
    lineHeight: 'normal',
    height: '60px',
    position : 'relative',
    padding: '0 16px',
    borderRadius: '20px',
    background: 'rgb(112, 15, 172)', // Замените градиент на обычный цвет
    color: '#fff',
    fontWeight: 100,
    fontSize: '0.9rem',
     // ← задержка 0.2s
     transitionProperty: 'width,height, box-shadow,background',
     transitionDuration: '0.2s',
     transitionTimingFunction: 'ease-in-out',
     transitionDelay: '0.1s',
         '&:hover': {
          background: 'rgb(164, 81, 200)',
          boxShadow: "0px 0px 20px rgb(154, 81, 200)",
        }
  }