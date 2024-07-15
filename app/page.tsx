

import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./home/page'));
const Backtracking = lazy(() => import('./why-btst/page'));
const About = lazy(() => import('./about/page'));

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Backtracking />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <About />
      </Suspense>
    </div>
  );
};

export default HomePage;
