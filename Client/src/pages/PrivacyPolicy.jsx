import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="bg-[#F5F9FF] min-h-screen py-20 px-6 sm:px-10 md:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8 sm:p-12">
        
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information.
        </p>

        <div className="space-y-6 text-gray-700 text-sm sm:text-base">
          
          <div>
            <h2 className="font-semibold text-lg text-[#0D6EFD] mb-2">
              1. Information We Collect
            </h2>
            <p>
              We may collect personal information such as your name, email
              address, transaction details, and wallet addresses to provide our
              services.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#0D6EFD] mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              Your information is used to process transactions, improve our
              platform, comply with legal requirements, and communicate with
              you.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#0D6EFD] mb-2">
              3. Data Protection
            </h2>
            <p>
              We implement strong security measures to protect your data from
              unauthorized access, loss, or misuse.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#0D6EFD] mb-2">
              4. Third-Party Services
            </h2>
            <p>
              We may use trusted third-party services for payment processing,
              analytics, or compliance. These providers are obligated to protect
              your information.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#0D6EFD] mb-2">
              5. Your Rights
            </h2>
            <p>
              You have the right to request access, correction, or deletion of
              your personal data, subject to legal requirements.
            </p>
          </div>

        </div>

        <p className="mt-10 text-xs text-gray-500 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
