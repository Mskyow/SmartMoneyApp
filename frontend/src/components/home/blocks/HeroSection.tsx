import React from 'react';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    // Возвращаем text-center и добавляем position: relative для позиционирования картинки
    <section className="hero-section text-center">
      <div className="container">

        {/* Контейнер для фонового изображения */}
        <div className="hero-image-background">
           <img
            src="/solscout.png" // <<<--- Путь к вашему изображению
            alt="SolanaScout Product Showcase Background"
            className="hero-image"
          />
        </div>

        {/* Основной текстовый контент */}
        {/* Оборачиваем в div для управления z-index, если понадобится */}
        <div className="hero-text-overlay">
          <h1 className="hero-title">Your Navigator for Profitable Solana Wallets.</h1>
          <p className="hero-subtitle">
            Track the blockchain 'stars' in real-time, find hidden alpha opportunities, and trade more confidently with deep on-chain analytics.
          </p>
          {/* <div className="hero-cta">
            <a href="/register" className="button button-primary button-large">
              Start Searching
            </a>
          </div> */}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;