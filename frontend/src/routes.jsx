import App from './App.jsx';
import Home from './pages/Home.jsx';
import Servicios from './pages/Servicios.jsx';
import Productos from './pages/Productos.jsx';
import Nosotros from './pages/Nosotros.jsx';
import FSMTool from './pages/FSMTool.jsx';
import WorkflowBuilder from './pages/WorkflowBuilder.jsx';
import NotFound from './pages/NotFound.jsx';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, Component: Home },
      { path: 'servicios', Component: Servicios },
      { path: 'productos', Component: Productos },
      { path: 'productos/fsmtool', Component: FSMTool },
      { path: 'productos/workflow-builder', Component: WorkflowBuilder },
      { path: 'nosotros', Component: Nosotros },
      { path: '*', Component: NotFound },
    ],
  },
];
