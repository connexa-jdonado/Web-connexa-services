import ProductosClient from './ProductosClient';

export const metadata = {
  title: 'Productos | Connexa Services',
  description:
    'FSMTool y Workflow Builder — soluciones propias de Connexa construidas sobre Oracle Field Service Cloud para operaciones masivas y automatización de procesos.',
  keywords: ['Oracle Field Service', 'OFSC', 'Field Service Management', 'FSMTool', 'Workflow Builder', 'implementación OFSC'],
};

export default function ProductosPage() {
  return <ProductosClient />;
}
