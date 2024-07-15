'use client';
import { useState } from "react";
import RotatingImage from "@/components/RotatingImage";
import SubscribeForm from "@/components/SubscribeForm";
import FadeIn from "@/components/FadeIn";

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleGetStartedClick = () => {
    setShowForm(true);
  };

  return (
    <div className="bg-black text-white min-h-screen flex relative">
      {/* Left half: Text and button */}
      <div className="w-1/2 flex flex-col justify-center items-start p-8 space-y-6 z-20 relative">
        <FadeIn>
          <section id="home" className="flex flex-col">
            <div className="mb-4">
              {/* Placeholder for other content */}
            </div>
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-white mb-10">
              Your Real-Time BTST Trade Advisor
            </h1>
            <p className="text-lg leading-relaxed">
              Maximize Your Profits with Advanced Market Analysis and Timely Alerts. Leverage our state-of-the-art algorithms and expert insights to stay ahead in the stock market. Get instant notifications and make informed BTST trades that optimize your investment returns.
            </p>
            <div className="mt-6">
              <button
                className="bg-yellow-500 text-white rounded-full px-6 py-3 hover:bg-yellow-600 transition duration-300 shadow-lg border border-yellow-500"
                onClick={handleGetStartedClick}
              >
                Get Started
              </button>
            </div>
          </section>
        </FadeIn>
        {showForm && (
          <FadeIn>
            <div className="mt-8 transition-opacity duration-500 ease-in-out">
              <SubscribeForm />
            </div>
          </FadeIn>
        )}
      </div>

      {/* Right half: Image */}
      <div className="w-1/2 flex items-center justify-center">
        <RotatingImage />
      </div>
    </div>
  );
};

export default HomePage;
