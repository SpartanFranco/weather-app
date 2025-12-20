import { BASE_URL } from '@/consts';
import { AppLayout } from '@/layout/app-layout';
import { CompareLocationsPage, HomePage } from '@/pages';
import { ErrorPage } from '@/pages/error-page';

import { createBrowserRouter, Navigate } from 'react-router';

export const router = createBrowserRouter(
	[
		{
			Component: AppLayout,
			children: [
				{ index: true, Component: HomePage },
				{ path: '/compare-locations', Component: CompareLocationsPage },
				{ path: '/error', Component: ErrorPage },
				{ path: '/*', element: <Navigate to='/' /> },
			],
		},
		{
			path: '*',
			element: <h1>Not found</h1>,
		},
	],
	{ basename: BASE_URL },
);
