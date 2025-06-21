import type { AnalyticFields } from '@/entities';

/**
 * (!!!) Так делать на самом деле нежелательно :) (выносить в shared что-то с других слоев)
 * */

export const ANALYTICS_LABELS: Partial<Record<AnalyticFields, string>> = {
	total_spend_galactic: 'общие расходы в галактических кредитах',
	less_spent_civ: 'цивилизация с минимальными расходами',

	rows_affected: 'количество обработанных записей',
	less_spent_at: 'день года с максимальными расходами',

	big_spent_at: 'день года с минимальными расходами',
	big_spent_value: 'максимальная сумма расходов за день',

	big_spent_civ: 'цивилизация с максимальными расходами',
	average_spend_galactic: 'средние расходы в галактических кредитах',
};

export const ORDERED_ANALYTIC_FIELDS: AnalyticFields[] = [
	'total_spend_galactic',
	'less_spent_civ',
	'rows_affected',
	'big_spent_at',
	'less_spent_at',
	'big_spent_value',
	'big_spent_civ',
	'average_spend_galactic',
];
