import FSMToolClient from './FSMToolClient';

export const metadata = {
  title: 'FSMTool | Connexa Services',
  description:
    'FSMTool — Suite de operaciones masivas para Oracle Field Service Cloud. Reasignación, gestión de inventario, monitoreo en tiempo real y más, sin complejidad.',
  keywords: ['Oracle Field Service', 'OFSC', 'FSMTool', 'Field Service Management', 'operaciones masivas', 'implementación OFSC'],
};

export default function FSMToolPage() {
  return <FSMToolClient />;
}
