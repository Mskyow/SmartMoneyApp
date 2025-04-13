import React from 'react';

const FinalCTASection: React.FC = () => {
  return (
    <section className="final-cta-section text-center">
      <div className="container">
        <h2>Готовы Найти Свою Альфу на Solana?</h2>
        <p>Перестаньте упускать возможности. Зарегистрируйтесь сейчас и получите доступ к данным, которые используют профессионалы.</p>
        <a href="/register" className="button button-primary button-large">
          Зарегистрироваться Бесплатно
        </a>
      </div>
    </section>
  );
};

export default FinalCTASection;