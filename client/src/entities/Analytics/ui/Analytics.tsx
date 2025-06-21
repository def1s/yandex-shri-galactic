import { useEffect } from 'react';
import { useAnalyticsStore } from '../model/useAnalyticsStore';
import { Card } from '@/shared';

import { ANALYTICS_LABELS, ORDERED_ANALYTIC_FIELDS } from '@/shared';

import styles from './Analytics.module.css';

export const Analytics = () => {
	const { analytics, resetAnalytics } = useAnalyticsStore();

	useEffect(() => {
		return () => {
			resetAnalytics();
		};
	}, [resetAnalytics]);

	if (!analytics) {
		return null;
	}

	return (
		<div className={styles.analytics}>
			{ORDERED_ANALYTIC_FIELDS.map((field) => {
				const value = analytics[field];

				if (value === undefined) {
					return null;
				}

				const label = ANALYTICS_LABELS[field];

				if (!label) {
					return null;
				}

				return <Card key={field} label={label} value={value} />;
			})}
		</div>
	);
};
