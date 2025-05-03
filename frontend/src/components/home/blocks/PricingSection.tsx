import React from 'react';

interface PricingTierProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  isRecommended?: boolean;
  icon?: React.ReactNode; // Optional icon prop
  discountText?: string; // Optional discount text
}

const PricingTier: React.FC<PricingTierProps> = ({
  title,
  price,
  description,
  features,
  ctaText,
  ctaLink,
  isRecommended,
  icon,
  discountText,
}) => (
  <div className={`pricing-tier ${isRecommended ? 'recommended' : ''}`}>
    {icon && <div className="tier-icon">{icon}</div>}
    <h3>{title}</h3>
    <p className="price">{price}{discountText && <span className="discount">{discountText}</span>}</p>
    <p className="description">{description}</p>
    <ul className="features-list">
      {features.map((feature, index) => <li key={index}>{feature}</li>)}
    </ul>
    <a href={ctaLink} className={`button ${isRecommended ? 'button-primary' : 'button-secondary'} button-full`}>
      {ctaText}
    </a>
    {isRecommended && <span className="recommended-badge">Recommended</span>}
  </div>
);

const PricingSection: React.FC = () => {
  const tiers: PricingTierProps[] = [
    {
      title: "Free",
      price: "$0",
      description: "A great start to explore basic features.",
      features: ["Web app", "Follow 250 EVM wallets", "10 Solana wallets inc.", "10 Bitcoin wallets inc.", "10 Sui wallets inc.", "Track 5 tokens"],
      ctaText: "GET STARTED",
      ctaLink: "/register",
      icon: <img src="/images/free-icon.png" alt="Free Tier Icon" />, // Replace with your actual icon path
    },
    {
      title: "Pro",
      price: "$59",
      description: "Unlock advanced tools for serious traders.",
      isRecommended: true,
      features: ["Enhanced web app", "Follow 1,000 EVM wallets", "Hyperliquid", "200 Solana wallets inc.", "50 Bitcoin wallets inc.", "50 Sui wallets inc."],
      ctaText: "GET STARTED",
      ctaLink: "/register?plan=pro",
      icon: <img src="/images/pro-icon.png" alt="Pro Tier Icon" />, // Replace with your actual icon path
      discountText: "/mo*",
    },
    {
      title: "Whale",
      price: "$199",
      description: "The ultimate package for comprehensive analysis.",
      features: ["Enhanced web app", "Follow 10,000 EVM wallets", "Hyperliquid", "1,000 Solana wallets inc.", "200 Bitcoin wallets inc."],
      ctaText: "GET STARTED",
      ctaLink: "/register?plan=whale",
      icon: <img src="/images/whale-icon.png" alt="Whale Tier Icon" />, // Replace with your actual icon path
      discountText: "/mo*",
    },
  ];

  return (
    <section className="pricing-section">
      <div className="container">
        <h2 className="text-center section-title">Our Pricing Plans</h2>
        <div className="pricing-grid">
          {tiers.map((tier) => (
            <PricingTier key={tier.title} {...tier} />
          ))}
        </div>
        <p className="text-center">*Annual plan with 10% discount</p>
      </div>
    </section>
  );
};

export default PricingSection;