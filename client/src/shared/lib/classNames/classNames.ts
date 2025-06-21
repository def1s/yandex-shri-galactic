/**
 * @description аналог модуля classNames для удобной работы с классами
 * */
export function classNames(...args: (string | boolean | undefined | null)[]): string {
	if (!args.length) {
		return '';
	}

	const filteredArgs = args.filter((className) => (className ? String(className) : false));

	return filteredArgs.join(' ');
}
