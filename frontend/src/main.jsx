import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes.jsx';
import './styles/globals.css';

export const createRoot = ViteReactSSG({ routes });
