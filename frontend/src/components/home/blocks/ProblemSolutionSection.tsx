import React from 'react';

const ProblemSolutionSection: React.FC = () => {
  return (
    <section className="problem-solution-section text-center">
      <div className="container">
        <h2>Упускаете Профит на Solana?</h2>
        <p>
          Быстрый рынок Solana требует мгновенных данных. Хватит гадать – начните принимать решения на основе точной аналитики. SolanaScout подсвечивает прибыльные кошельки и стратегии, которые вы могли бы пропустить.
        </p>
        <div className="icon-flow">
          {/* Замените на реальные иконки */}
          <span>[Иконка: ?]</span> → <span>[Иконка: Лампочка]</span> → <span>[Иконка: Ракета]</span>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;