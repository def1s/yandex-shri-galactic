import { downloadFromUrl } from './downloadFromUrl';

describe('downloadFromUrl', () => {
	beforeAll(() => {
		if (!URL.revokeObjectURL) {
			URL.revokeObjectURL = vi.fn();
		} else {
			vi.spyOn(URL, 'revokeObjectURL');
		}
	});

	it('creates and clicks an anchor element with correct attributes', () => {
		const mockUrl = 'blob:http://localhost/report.csv';

		const clickMock = vi.fn();
		const removeMock = vi.fn();
		const appendChildMock = vi.fn();

		const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue({
			href: '',
			download: '',
			click: clickMock,
			remove: removeMock,
		} as unknown as HTMLAnchorElement);

		vi.spyOn(document.body, 'appendChild').mockImplementation(appendChildMock);

		const revokeSpy = vi.spyOn(URL, 'revokeObjectURL');

		downloadFromUrl(mockUrl);

		expect(createElementSpy).toHaveBeenCalledWith('a');
		expect(appendChildMock).toHaveBeenCalled();
		expect(clickMock).toHaveBeenCalled();
		expect(removeMock).toHaveBeenCalled();
		expect(revokeSpy).toHaveBeenCalledWith(mockUrl);
	});
});
