import React from "react";

const TermsOfService = () => {
  return (
    <section className="bg-[#F5F9FF] min-h-screen py-20 px-6 sm:px-10 md:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8 sm:p-12">
        
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-6 text-center">
          Terms of Service
        </h1>

        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Welcome to our exchange platform. By accessing or using our services,
          you agree to be bound by the following Terms of Service. Please read
          them carefully.
        </p>

        {/* Section */}
        <div className="space-y-6 text-gray-700 text-sm sm:text-base">
          
          <div>
            <h2 className="font-semibold text-lg text-[#0D6EFD] mb-2">
              1. Service Description
            </h2>
            <p>
              We provide a digital exchange service that allows users to convert
              cryptocurrencies into local currencies and vice versa. We do not
              provide financial, legal, or investment advice.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#0D6EFD] mb-2">
              2. User Responsibilities
            </h2>
            <p>
              You agree to provide accurate information, comply with applicable
              laws, and ensure that all transactions conducted through your
              account are lawful.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#0D6EFD] mb-2">
              3. Prohibited Activities
            </h2>
            <p>
              Any fraudulent activity, money laundering, abuse of the platform,
              or violation of local or international laws is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#0D6EFD] mb-2">
              4. Limitation of Liability
            </h2>
            <p>
              We are not responsible for losses due to market fluctuations,
              incorrect wallet addresses, delays caused by third parties, or
              force majeure events.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#0D6EFD] mb-2">
              5. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these terms without prior notice.
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

export default TermsOfService;
