import '../css/app.css';
import './bootstrap';

import { createRoot } from 'react-dom/client';
import PrototypeApp from './PrototypeApp';

const element = document.getElementById('app');

if (!element) {
    throw new Error('Root element "#app" not found.');
}

createRoot(element).render(<PrototypeApp />);
