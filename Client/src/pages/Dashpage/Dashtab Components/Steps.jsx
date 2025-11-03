import React from "react";

const Steps = () => {
  const steps = [
    {
      title: "Deposit Fund",
      description:
        "Deposit any amount you want in your wallet for your use.",
    },
    {
      title: "Send/Request Money",
      description:
        "Send or request funds easily from your friends and contacts.",
    },
    {
      title: "Exchange eCurrencies",
      description:
        "Exchange your eCurrencies by depositing and withdrawing using multiple eWallets.",
    },
    {
      title: "Activate Prepaid Credit Card",
      description:
        "Activate your prepaid debit card and use it anywhere online.",
    },
    {
      title: "Use Prepaid Card",
      description:
        "Use your prepaid card on PayPal or shopping websites where VISA is accepted (excluding gambling or transfers).",
    },
    {
      title: "Share & Like our Profiles",
      description:
        "Like and share our website on Facebook and other social media.",
    },
    {
      title: "Want to Earn? Make Referrals",
      description:
        "Join our Affiliate Program and earn money easily.",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h2 className="text-lg font-semibold text-blue-600 mb-4">
        How to Get Started?
      </h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-3">
            <h3 className="font-semibold text-gray-800">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
