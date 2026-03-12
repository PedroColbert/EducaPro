import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob('./Pages/**/*.tsx');
        const loader = pages[`./Pages/${name}.tsx`];

        if (!loader) {
            throw new Error(`Page not found: ${name}`);
        }

        const page = (await loader()) as { default: ComponentType };

        return page.default;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#0f766e',
    },
});
