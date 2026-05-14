import ServiciosClient from './ServiciosClient';

export const metadata = {
  title: 'Servicios | Connexa Services',
  description:
    'Implementación OFSC, Zinier, consultoría FSM, integraciones, desarrollo a medida y soporte post go-live. Partner certificado Oracle y Zinier.',
  keywords: ['Oracle Field Service', 'OFSC', 'Field Service Management', 'Zinier', 'implementación OFSC', 'consultoría FSM'],
};

export default function ServiciosPage() {
  return <ServiciosClient />;
}
