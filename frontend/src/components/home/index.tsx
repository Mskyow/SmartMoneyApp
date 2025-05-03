import React from 'react';
//import Footer from './LandingPage/Footer';
import './LandingPage.css'; // Подключаем стили
import SpaceBackground from '../watchlist/SpaceBackground';
import Footer from '../footer/footer';
import FeaturesSection from './blocks/FeatureSection/FeaturesSection';
import FinalCTASection from './blocks/FinalCTASection';
import HeroSection from './blocks/HeroSection';
import HowItWorksSection from './blocks/HowItWorksSection';
import PricingSection from './blocks/PricingSection';
import ProblemSolutionSection from './blocks/ProblemSolutionSection';
import VerticalHeaderLanding from '../header/headerLanding';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page-content"> {/* Обертка для контента поверх фона */}
    <SpaceBackground/>
      <VerticalHeaderLanding />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <FeaturesSection />
        {/* <HowItWorksSection /> */}
        <PricingSection />
        <FinalCTASection />
      </main>
     <Footer /> 
    </div>
  );
};

export default LandingPage;