import React from 'react';
import { motion } from 'framer-motion';

const featureData = [
  {
    title: "Live Data Analysis",
    description: "Leverage real-time market data and sophisticated algorithms to identify potential BTST trades promising at least a 5% gain for the next trading day.",
  },
  {
    title: "Timely Notifications",
    description: "Registered users receive email notifications at 3:20 PM, 10 minutes before the market closes, giving them the edge to make informed decisions.",
  },
  {
    title: "User-Friendly Interface",
    description: "Designed for both novice and experienced traders, providing clear and actionable insights without the clutter.",
  },
  {
    title: "Advanced Algorithms",
    description: "Utilize state-of-the-art algorithms and technical indicators to screen and notify users about the best BTST trades.",
  },
  {
    title: "Customizable Alerts",
    description: "Set your own criteria and receive notifications tailored to your trading strategy.",
  },
  {
    title: "Comprehensive Reports",
    description: "Get detailed reports on each recommended trade, including the rationale behind each suggestion.",
  },
];

const Features = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    {featureData.map((feature, index) => (
      <motion.div
        key={index}
        className="bg-gradient-to-b from-black to-gray-900 p-6 rounded-lg shadow-lg border border-yellow-500 hover:shadow-yellow-500 transition-shadow duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-yellow-500">{feature.title}</h3>
        <p className="text-gray-300">{feature.description}</p>
      </motion.div>
    ))}
  </div>
);

export default Features;
