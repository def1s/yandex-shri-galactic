export const downloadFromUrl = (url: string) => {
	const a = document.createElement('a');
	a.href = url;
	a.download = 'report.csv';

	document.body.appendChild(a);
	a.click();
	a.remove();

	URL.revokeObjectURL(url);
};
