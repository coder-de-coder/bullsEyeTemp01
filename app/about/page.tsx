'use client';

import React, { Suspense, lazy } from 'react';
import { useInView } from 'react-intersection-observer';
import FadeIn from "@/components/FadeIn";

const LazyFeatures = lazy(() => import('../../components/Features'));

const techStack = [
  {
    category: 'Base Stack',
    technologies: [
      { name: 'Next.js', logo: '/nextjs-logo.png' },
      { name: 'TypeScript', logo: '/typescript-logo.png' },
      { name: 'Tailwind CSS', logo: '/tailwind-logo.png' },
    ],
  },
  {
    category: 'Database',
    technologies: [
      { name: 'PostgreSQL', logo: '/postgresql-logo.png' },
      { name: 'NeonTech', logo: '/neon-logo.png' },
      { name: 'Prisma', logo: '/prisma-logo.png' },
    ],
  },
  {
    category: 'APIs',
    technologies: [{ name: 'TwelveData', logo: '/twelvedata-logo.png' }],
  },
];

const AboutPage = () => {
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: technologyRef, inView: technologyInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="bg-black text-gray-300 min-h-screen">
  <section id="about" ref={aboutRef} className="container mx-auto py-20">
    <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-white text-center mb-10">
      Key Features
    </h2>
    {aboutInView && (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyFeatures />
      </Suspense>
    )}
  </section>

  <section id="technology" ref={technologyRef} className="container mx-auto py-20 tech-section">
    <FadeIn>
      <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-white text-center mb-10">
        Technology Stack
      </h2>
      {technologyInView && (
        <div className="tech-categories flex justify-between">
          {techStack.map((stack, index) => (
            <div key={index} className="tech-category">
              <h3 className="text-2xl font-bold text-white mb-6">{stack.category}</h3>
              <div className="tech-items flex space-x-8">
                {stack.technologies.map((tech, idx) => (
                  <div key={idx} className="tech-item text-center">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="tech-logo h-12 w-12 object-contain mx-auto mb-2"
                    />
                    <p className="text-gray-300">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </FadeIn>
  </section>
</div>

  );
};

export default AboutPage;
