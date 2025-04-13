import React from 'react';

// Можно вынести PricingTier в отдельный компонент
const PricingTier: React.FC<{
    title: string;
    price: string;
    description: string;
    features: string[];
    ctaText: string;
    ctaLink: string;
    isRecommended?: boolean;
}> = ({ title, price, description, features, ctaText, ctaLink, isRecommended }) => (
    <div className={`pricing-tier ${isRecommended ? 'recommended' : ''}`}>
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="description">{description}</p>
        <ul className="features-list">
            {features.map((feature, index) => <li key={index}>{feature}</li>)}
        </ul>
        <a href={ctaLink} className={`button ${isRecommended ? 'button-primary' : 'button-secondary'} button-full`}>
            {ctaText}
        </a>
    </div>
);


const PricingSection: React.FC = () => {
  const tiers = [
      {
          title: "Free", price: "$0 / навсегда", description: "Отличный старт для знакомства.",
          features: ["Отслеживание до 3 кошельков", "Базовые уведомления", "Стандартное обновление данных", "Основные фильтры"],
          ctaText: "Начать бесплатно", ctaLink: "/register"
      },
      {
          title: "Scout Pro", price: "$30 / месяц", description: "Для активных трейдеров.", isRecommended: true,
          features: ["Отслеживание до 50 кошельков", "Уведомления Real-time", "Продвинутые фильтры", "Ускоренное обновление", "Базовое отслеживание 'китов'", "Приоритетная поддержка"],
          ctaText: "Выбрать Scout Pro", ctaLink: "/register?plan=pro"
      },
      {
          title: "Alpha Hunter", price: "$50 / месяц", description: "Максимальное преимущество.",
          features: ["Отслеживание до 200 кошельков", "Приоритетные уведомления", "ВСЕ фильтры + пользовательские", "Макс. скорость обновления", "Глубокий анализ 'китов'", "Экспорт данных (CSV)", "Доступ к бета-функциям", "Премиум поддержка"],
          ctaText: "Стать Alpha Hunter", ctaLink: "/register?plan=alpha"
      },
  ];

  return (
    <section className="pricing-section">
      <div className="container">
        <h2 className="text-center section-title">Выберите Свой План SolanaScout</h2>
        {/* Добавить переключатель Месяц/Год */}
        <div className="pricing-grid">
          {tiers.map((tier) => (
            <PricingTier key={tier.title} {...tier} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;