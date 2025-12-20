import { Header } from '@/components/header';
import { Outlet } from 'react-router';

export const AppLayout = () => {
	return (
		<div className='mx-auto p-4 md:p-8 lg:container'>
			<Header />
			<div className='animate-in fade-in-15'>
				<Outlet />
			</div>
		</div>
	);
};
