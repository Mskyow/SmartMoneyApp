import React from 'react';

const HowItWorksSection: React.FC = () => {
  return (
    <section className="how-it-works-section text-center">
       <div className="container">
        <h2 className="section-title">Начните Поиск за 3 Простых Шага</h2>
        <div className="steps-container">
          <div className="step-block">
            <div className="step-icon">[Иконка: Регистрация]</div>
            <h3>1. Подключитесь</h3>
            <p>Быстрая регистрация или вход.</p>
          </div>
          <div className="step-block">
            <div className="step-icon">[Иконка: Поиск]</div>
            <h3>2. Найдите 'Звезды'</h3>
            <p>Используйте фильтры для поиска перспективных кошельков.</p>
          </div>
          <div className="step-block">
            <div className="step-icon">[Иконка: Анализ]</div>
            <h3>3. Анализируйте и Действуйте</h3>
            <p>Отслеживайте транзакции, выявляйте тренды, копируйте стратегии.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;