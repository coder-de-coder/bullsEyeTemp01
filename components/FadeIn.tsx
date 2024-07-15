import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
}

const FadeIn = ({ children }: FadeInProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 ease-in-out ${inView ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
    </div>
  );
};

export default FadeIn;
