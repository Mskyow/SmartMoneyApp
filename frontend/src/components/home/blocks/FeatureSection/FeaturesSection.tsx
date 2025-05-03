import React from 'react';
import { MiniChart } from './MiniChart';
import CardStack from './CardStack';
//import AnalysisIcon from '/public/images/analysis-icon.png'; // Или путь до вашего файла

// Props interface for the FeatureBlock component
interface FeatureBlockProps {
  icon:  React.ReactNode;
  title: string;
  text: string;
  gradientAngle?: number; // Optional gradient angle prop
  // Prop to control chart visibility
  showChart?: boolean;
  // Alternatively, you could pass an index and check it:
  // index: number;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({
  icon,
  title,
  text, // Accepting the text prop
  gradientAngle = 145,
  showChart
}) => (
  <div className="feature-block"
    style={{ '--gradient-angle': `${gradientAngle}deg` } as React.CSSProperties}
  >
    {/* Render the chart first if showChart is true */}
    {showChart && <MiniChart />}

    {/* Icon */}
    <div className="feature-icon">{icon}</div>

    {/* Title */}
    <h3>{title}</h3>

    {/* Feature description text */}
    <p className="feature-text">{text}</p> {/* Added or uncommented the text */}

  </div>
);

const cardData = [
  { id : 1 ,icon: 1, token: 'TRUMP', balance: '200$' },
  { id : 2 ,icon: 2, token: 'SOLANA', balance: '200$' },
  { id : 3 ,icon: 3, token: 'BITCOIN', balance: '200$' },
  
];

// FeaturesSection component
const FeaturesSection: React.FC = () => {
  const features = [
    {
      // icon: <ChartIcon />, // Example of using an icon component
      icon: "", // Using an Emoji as a placeholder
      title: "Highlight Traders ", // More specific and useful title
      text: "Track traders buy and sell points directly on the chart.", // Describing the BENEFIT for the user
      gradientAngle: 140
    },
    {
      // icon: <AnalyzeIcon />,
      icon: <img src='/analysis-icon.png' alt="In-Depth Analysis Icon" style={{ width: '15vw', height: '30vh' }} />,
      title: "In-Depth Analysis", // Corrected the typo
      text: "Make decisions based on data, not guesswork. Access powerful analysis tools and indicators to discover the best opportunities in the Solana market.", // Making the text more compelling
      gradientAngle: 40
    },
    {
      // icon: <TrackIcon />,
      icon: <div> <CardStack cards={cardData} /> </div>,
      title: "Portfolio Tracking", // More professional title
      text: "Keep your finger on the pulse of your investments. Easily monitor the performance of wallets and your favorite Solana tokens in one place. Ideal for all experience levels.", // Clarifying WHAT we are tracking and FOR WHOM
      gradientAngle: 140
    },
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="text-center section-title">SolScout Features</h2> {/* Section title translation */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureBlock
              key={index}
              icon={feature.icon} // Passing the icon
              title={feature.title} // Passing the new title
              text={feature.text}   // Passing the new text
              gradientAngle={feature.gradientAngle}
              showChart={index === 0} // Show chart only for the first card
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;