'use client'
import FadeIn from '@/components/FadeIn';
import Image from 'next/image';

const WhyBTST = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-8">
      <FadeIn>
        <section id="why-btst" className="container mx-auto py-20 flex flex-wrap">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="rounded-lg shadow-lg shadow-yellow-500 transition-shadow duration-300">
              <Image
                src="/btst-trade-chart.png"
                alt="BTST Trade Chart"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start space-y-6 px-8">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-white mb-10">
              Why BTST?
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              BTST (Buy Today, Sell Tomorrow) leverages overnight price movements for short-term gains. Avoid intraday risks and capitalize on end-of-day momentum with this strategic approach.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              Our advanced algorithms use technical indicators like moving averages and RSI to identify optimal BTST opportunities, providing precise entry and exit points.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              Receive real-time alerts and expert insights to enhance your trading strategy. Join our community and optimize your trades for superior returns.
            </p>
          </div>
        </section>
      </FadeIn>
    </div>
  );
};

export default WhyBTST;
