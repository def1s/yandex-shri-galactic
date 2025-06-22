import { Suspense } from 'react';
import { useCallback } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { routerConfig } from '../routerConfig/routerConfig';
import type { AppRoutesProps } from '../routerConfig/routerConfig';

export const AppRouter = () => {
	const renderWithWrapper = useCallback((route: AppRoutesProps) => {
		const element = <Suspense fallback={'Loading...'}>{route.element}</Suspense>;

		return <Route key={route.path} path={route.path} element={element} />;
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Navigate to="/analytics" replace />} />

			{Object.values(routerConfig).map(renderWithWrapper)}
		</Routes>
	);
};
