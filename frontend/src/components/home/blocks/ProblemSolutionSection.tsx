import React from 'react';

const ProblemSolutionSection: React.FC = () => {
  return (
    <section className="problem-solution-section">
      <div className="container">
        <h2>Missing Out on Solana Profits?</h2>
        <p className="section-description">
          The fast-paced Solana market demands instant data. Stop guessing – start making decisions based on precise analytics. SolanaScout highlights profitable wallets and strategies you might be missing.
        </p>
        <div className="steps-container">
          <div className="step-card first-step">
            {/* Your first icon or content here */}
            <span>?</span>
            <p className="step-label">First Step</p>
          </div>
          <div className="arrow-container arrow-right">
            <svg viewBox="0 0 50 20" className="arrow">
              <path d="M0 10 C 20 0, 30 20, 50 10" fill="none" stroke="#555" strokeWidth="2" />
              <path d="M45 5 L50 10 L45 15" stroke="#555" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="step-card second-step">
            {/* Your second icon or content here */}
            <span>💡</span>
            <p className="step-label">Second Step</p>
          </div>
          <div className="arrow-container arrow-right">
            <svg viewBox="0 0 50 20" className="arrow">
              <path d="M0 10 C 20 0, 30 20, 50 10" fill="none" stroke="#555" strokeWidth="2" />
              <path d="M45 5 L50 10 L45 15" stroke="#555" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="step-card third-step">
            {/* Your third icon or content here */}
            <span>🚀</span>
            <p className="step-label">Third Step</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;