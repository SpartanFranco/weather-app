import { Title } from '@/components/title';
import { Button } from '@/components/ui/button';

import { Ban, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router';

export const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<div className='animate-in fade-in-15 mt-8 flex flex-col items-center gap-4'>
			<Ban className='size-8 md:size-12' />
			<Title>Something went wrong</Title>
			<p className='max-w-72 text-center text-neutral-200 md:max-w-120'>
				We couldn't to connect to the server(API error).Please try again in a
				few moments.
			</p>
			<Button
				onClick={() => navigate('/')}
				className='flex items-center gap-2'
			>
				<RefreshCw /> Retry
			</Button>
		</div>
	);
};
