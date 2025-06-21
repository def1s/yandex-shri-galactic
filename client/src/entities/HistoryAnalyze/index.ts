import { List } from './ui/List/List';
import { HistoryAnalyzeController } from './lib/historyAnalyzeController';

type Components = {
	List: typeof List;
};

const HistoryAnalyze: Components = {
	List,
};

const historyAnalyzeController = new HistoryAnalyzeController();

export { HistoryAnalyze, historyAnalyzeController };
