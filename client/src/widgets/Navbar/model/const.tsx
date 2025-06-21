import type { CSSProperties } from 'react';
import type { Path } from '@/app';

import AnalyzeIcon from '@/shared/assets/analyze.svg';
import GenerateIcon from '@/shared/assets/generate.svg';
import HistoryIcon from '@/shared/assets/history.svg';

import { MenuItemType } from './types';

const baseIconStyles: CSSProperties = {
	height: '35px',
};

export const MENU_TABS: Record<Path, MenuItemType> = {
	'/analytics': {
		name: 'CSV Аналитик',
		Icon: <AnalyzeIcon style={baseIconStyles} />,
	},
	'/generator': {
		name: 'CSV Генератор',
		Icon: <GenerateIcon style={baseIconStyles} />,
	},
	'/history': {
		name: 'История',
		Icon: <HistoryIcon style={baseIconStyles} />,
	},
};
