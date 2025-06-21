import { Suspense } from 'react';
import { useCallback } from 'react';
import { Route, Routes } from 'react-router';
import { routerConfig } from '../routerConfig/routerConfig';
import type { AppRoutesProps } from '../routerConfig/routerConfig';

export const AppRouter = () => {
	const renderWithWrapper = useCallback((route: AppRoutesProps) => {
		// TODO: добавить Loader
		const element = <Suspense fallback={'Loading...'}>{route.element}</Suspense>;

		return <Route key={route.path} path={route.path} element={element} />;
	}, []);

	return <Routes>{Object.values(routerConfig).map(renderWithWrapper)}</Routes>;
};
