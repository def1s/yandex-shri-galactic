import type { IAnalytics } from '@/entities';

type Status = 'success' | 'error';

export type HistoryItem = {
	status: Status;

	data?: IAnalytics;
	date: Date;

	fileName: string;
};
