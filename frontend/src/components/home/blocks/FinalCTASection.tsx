import React from 'react';

const FinalCTASection: React.FC = () => {
  return (
    <section className="final-cta-section text-center">
      <div className="container">
        <h2>Discover the Solana space with us</h2>
        <p>
        Stop missing out. Sign up now and get access to the data that the pros use</p>
        <a href="/register" className="button button-primary button-large">
          Get started for free
        </a>
      </div>
    </section>
  );
};

export default FinalCTASection;