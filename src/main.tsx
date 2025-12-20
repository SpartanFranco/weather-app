import { createRoot } from 'react-dom/client';
import AppProvider from './providers/app-provider.tsx';
import { RouterProvider } from 'react-router';
import { router } from './routers/index.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>,
);
