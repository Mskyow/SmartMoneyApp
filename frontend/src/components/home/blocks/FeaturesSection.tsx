import React from 'react';

// Можно вынести FeatureBlock в отдельный компонент для чистоты
const FeatureBlock: React.FC<{ icon: string; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="feature-block">
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);

const FeaturesSection: React.FC = () => {
  const features = [
    { icon: "[Иконка: Радар]", title: "Мгновенная Адаптация", text: "SolanaScout мгновенно адаптируется к блокчейну Solana, предоставляя отслеживание кошельков в реальном времени и действенные инсайты – чтобы вы никогда не упустили выгодный ход." },
    { icon: "[Иконка: Цель]", title: "Прецизионная Точность Данных", text: "Получите непревзойденную точность благодаря глубокому ончейн-анализу. Наши алгоритмы отслеживают каждую транзакцию, гарантируя, что вы инвестируете на основе надежных данных, а не догадок." },
    { icon: "[Иконка: Легкость]", title: "Простота и Интуитивность", text: "От новичков до профи, наш дружелюбный интерфейс позволяет легко отслеживать кошельки, анализировать тренды и копировать сделки всего за несколько кликов." },
    { icon: "[Иконка: Звезда]", title: "Альфа Нового Уровня", text: "Будьте впереди с передовыми инструментами, раскрывающими скрытые возможности. Замечайте тренды раньше, следите за китами и совершайте более умные сделки – до того, как это сделает толпа." }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="text-center section-title">Ваш Инструмент для Поиска Альфы на Solana</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureBlock key={index} icon={feature.icon} title={feature.title} text={feature.text} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;