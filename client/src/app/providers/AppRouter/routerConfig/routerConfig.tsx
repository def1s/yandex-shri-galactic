import type { RouteProps } from 'react-router';
import { AnalyticsPage, GeneratorPage, HistoryPage } from '@/pages';

export type AppRoutesProps = RouteProps;

/** Конфигурация путей всего приложения */
export enum Routes {
	ANALYTICS = 'analytics',
	GENERATOR = 'generator',
	HISTORY = 'history',
}

export type Path = '/analytics' | '/generator' | '/history';

// TODO: добавить * (not found)
export const RoutesPaths: Record<Routes, Path> = {
	[Routes.ANALYTICS]: '/analytics',
	[Routes.GENERATOR]: '/generator',
	[Routes.HISTORY]: '/history',

	// // 404
	// [Routes.NOT_FOUND]: '*',
};

export const routerConfig: Record<Routes, AppRoutesProps> = {
	[Routes.ANALYTICS]: {
		path: RoutesPaths.analytics,
		element: <AnalyticsPage />,
	},
	[Routes.GENERATOR]: {
		path: RoutesPaths.generator,
		element: <GeneratorPage />,
	},
	[Routes.HISTORY]: {
		path: RoutesPaths.history,
		element: <HistoryPage />,
	},

	// [Routes.NOT_FOUND]: {
	// 	path: RoutesPaths.notFound,
	// 	element: <NotFoundPage />,
	// },
};
