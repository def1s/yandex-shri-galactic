import { useEffect } from 'react';
import { useAnalyticsStore } from '../model/useAnalyticsStore';
import { Card, formatDayOfYear } from '@/shared';

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
		return (
			<div className={styles.empty}>
				<div className={styles.message}>
					<div>Здесь</div>
					<div>появятся хайлайты</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.analytics}>
			{ORDERED_ANALYTIC_FIELDS.map((field) => {
				const value = analytics[field];
				if (value === undefined) return null;

				const label = ANALYTICS_LABELS[field];
				if (!label) return null;

				const isDayOfYearField = field === 'less_spent_at' || field === 'big_spent_at';
				const displayValue = isDayOfYearField ? formatDayOfYear(value as number) : value;

				return <Card key={field} label={label} value={displayValue} />;
			})}
		</div>
	);
};
