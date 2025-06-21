import { createRoot } from 'react-dom/client';
import { App } from '@/app';
import { BrowserRouter } from 'react-router';

const domNode = document.getElementById('root');

if (!domNode) {
	throw new Error('Could not find root node!');
}

const root = createRoot(domNode);

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
);
