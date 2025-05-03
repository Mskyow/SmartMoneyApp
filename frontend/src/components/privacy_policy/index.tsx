import React from 'react';
import './PrivacyPolicy.css'; // Make sure you have the CSS file

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="privacy-policy-page-styled">
      <div className="privacy-policy-container-styled">
        <h1 className="privacy-policy-title">Privacy policy</h1>
        <p className="effective-date-styled">Effective date: [Date]</p> {/* Replace with your effective date */}

        <section className="policy-section">
          <h2>1. Introduction</h2>
          <p>Welcome to Solana Scout.</p>
          <p>Solana Scout ("us", "we", or "our") operates [Your Website Address] (hereinafter referred to as "Service").</p>
          <p>Our Privacy Policy governs your visit to [Your Website Address], and explains how we collect, safeguard, and disclose information that results from your use of our Service.</p>
          <p>We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.</p>
          <p>Our Terms and Conditions ("Terms") govern all use of our Service and together with the Privacy Policy constitute your agreement with us ("agreement").</p>
        </section>

        <section className="policy-section">
          <h2>2. Information we collect</h2>
          <p>Solana Scout collects user information such as:</p>
          <ul>
            <li><strong>email</strong> - mandatory information (contract)</li>
            <li><strong>Cryptocurrency wallet public address</strong> - optional information (based on your consent for advanced analytics)</li>
            <li><strong>username</strong> - mandatory information (legitimate interest for personalization of the service)</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. How we use the information</h2>
          <ol>
            <li>
              <strong>Email</strong>
              <ol type="1">
                <li>To notify about changes in the tracked wallets</li>
                <li>To inform the user about important events and other information</li>
                <li>To reset the password</li>
              </ol>
            </li>
            <li>
              <strong>Public address of the cryptocurrency wallet</strong>
              <ol type="1">
                <li>To analyze transactions and provide personalized services</li>
              </ol>
            </li>
            <li>
              <strong>User name</strong>
              <ol type="1">
                <li>Helps to personalize interactions (e.g., in support calls, emails)</li>
                <li>Can be used to authenticate or restore access to an account.</li>
              </ol>
            </li>
          </ol>
        </section>

        <section className="policy-section">
          <h2>4. Storage of user information</h2>
          <ol>
            <li>We do not sell or rent your personal information to third parties. However, we may share your information with:
              <ul>
                <li>Legal authorities: if required by law</li>
                <li>Business transactions: in the event of mergers or acquisitions</li>
              </ul>
            </li>
            <li>Solana Scout stores User Information in a secure database to which only Solana Scout has access. User Information may not be redirected or forwarded outside the EU/US or to third parties that are not related to Solana Scout based on Standard Contractual Clauses.</li>
            <li>User data is stored for 2 years from the last activity (to prevent fraud). If 2 full years have passed since the last activity, all user information related to the user will be deleted from the database.</li>
            <li>We use the following security measures:
              <ul>
                <li>https protocol;</li>
                <li>jwt authentication;</li>
                <li>storing the password only in encrypted form.</li>
              </ul>
            </li>
            <li>In the event of a leak of user data, the user will be notified within 48 hours of the leak by e-mail.</li>
          </ol>
        </section>

        <section className="policy-section">
          <h2>5. User Rights</h2>
          <ol>
            <li>The right to request the deletion of your Personal Information or part of it, as well as to withdraw consent to the processing of your Personal Information.</li>
            <li>The right to object to the processing of your Personal Information, if provided for by applicable law.</li>
            <li>The right to restrict processing.</li>
            <li>The right to erasure ("Right to be forgotten").</li>
            <li>Right to Data Portability. Data is made available in machine-readable format (JSON) upon request to <a href="mailto:privacy@solscout.space">privacy@solscout.space</a> after confirmation of identity.</li>
            <li>Right to object to profiling.</li>
            <li>To exercise your rights, please contact: [Your Contact Information]. A response will be sent within 30 days of submitting your request.</li>
          </ol>
        </section>

        <p className="effective-date-styled">This Policy is effective as of [Date].</p> {/* Reiterate effective date at the end */}
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;