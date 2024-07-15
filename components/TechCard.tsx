import React from 'react';

type TechCardProps = {
  title: string;
  items: { name: string; logo: string }[];
};

const TechCard: React.FC<TechCardProps> = ({ title, items }) => (
  <div className="tech-card bg-gray-800 p-6 rounded-lg shadow-lg text-center">
    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
    <div className="flex justify-center space-x-4">
      {items.map((item, index) => (
        <div key={index} className="tech-item">
          <img
            src={item.logo}
            alt={item.name}
            className="tech-logo h-12"
          />
          <p className="text-gray-300">{item.name}</p>
        </div>
      ))}
    </div>
  </div>
);

export default TechCard;
