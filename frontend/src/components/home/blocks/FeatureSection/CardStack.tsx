import React, { useState, useRef } from 'react';
import './CardStack.css';

interface CardData {
  id: number;
    icon : number;
    token : string;
    balance : string;
}

interface CardStackProps {
  cards: CardData[];
  initialVisibleCount?: number;
}

const CardStack: React.FC<CardStackProps> = ({ cards, initialVisibleCount = 3 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null); // Ref для хранения ID интервала
  const visibleCards = cards.slice(currentIndex, currentIndex + initialVisibleCount);

  const startAnimation = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    // Немедленно запускаем первую итерацию
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);

    // Затем устанавливаем интервал с задержкой
    intervalIdRef.current = setTimeout(() => {
      intervalIdRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
      }, 700); // Длительность каждой "перелистывания"
    }, 800); // Задержка в миллисекундах перед началом следующей итерации (например, 1 секунда)
  };

  const stopAnimation = () => {
    if (intervalIdRef.current) {
      clearTimeout(intervalIdRef.current); // Очищаем возможный таймаут
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setCurrentIndex(0); // Возвращаем к начальному состоянию при уходе мыши (опционально)
  };

  return (
    <div
      className="card-stack-container"
      onMouseEnter={startAnimation}
      onMouseLeave={stopAnimation}
      
    >
      {visibleCards.map((card, index) => {
        const isGoingBack = index === visibleCards.length - 1; // Проверяем, является ли карточка последней видимой

        return (
          <div
            key={card.id}
            className={`card`}
            style={{
              zIndex: isGoingBack ? -1 : initialVisibleCount - index, // Уменьшаем zIndex уходящей карточки
              transform: `translateX(${index * 1}px) translateY(${index * 25}px) scale(${1 - index * 0.1})`,
              transition: 'transform 0.8s ease-in-out, z-index 0.7s ease-in-out', // Добавляем transition для zIndex
            }}
          >
            {/* <p>Icon: {card.icon}</p> */}
            <p>{card.token}</p>
            {/* <p>Balance: {card.balance}</p> */}
          </div>
        );
      })}
    </div>
  );
};

export default CardStack;