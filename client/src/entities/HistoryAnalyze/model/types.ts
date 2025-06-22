import type { IAnalytics } from '@/entities';

type Status = 'success' | 'error';

export type HistoryItem = {
	id: number;
	status: Status;

	data?: IAnalytics;
	date: Date;

	fileName: string;
};
