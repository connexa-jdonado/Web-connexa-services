import HomeClient from './HomeClient';

export const metadata = {
  title: 'Connexa Services | Field Service Management Experts',
  description:
    'Expertos en Field Service Management. Implementamos, optimizamos y soportamos Oracle Field Service Cloud y Zinier para empresas líderes en América Latina y el mundo.',
  keywords: ['Oracle Field Service', 'OFSC', 'Field Service Management', 'Zinier', 'implementación OFSC', 'consultoría FSM'],
};

export default function HomePage() {
  return <HomeClient />;
}
