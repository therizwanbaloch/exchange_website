import React from "react";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-[#1E3A8A] flex items-center justify-center text-white px-6 text-center font-bricolage">
      <div className="max-w-lg space-y-6">
        <h1 className="text-4xl font-bold tracking-wide">
          Feature Coming Soon
        </h1>

        <p className="text-white/80 leading-relaxed">
          Thank you for your interest. This feature is currently under
          development and will be available to you very soon. We appreciate
          your patience and understanding.
        </p>

        <p className="text-white/70 text-sm">
          If you need urgent assistance, feel free to contact us  our email and
          WhatsApp details are available in the footer.
        </p>

        <Link
          to="/user-dashboard"
          className="inline-block px-8 py-2 rounded-md bg-[#3B82F6] hover:bg-[#0D6EFD] transition font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
