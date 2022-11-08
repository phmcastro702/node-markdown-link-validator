const getFileAsyncAwait = require('../src/index');

const expectedResult = [
    [
        {
            FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
        }
    ],
    [
        {
            ForTesting: 'https://google.com'
        }
    ]
];

describe('getFileAsyncAwait::', () => {
    it('should be a function', () => {
        expect(typeof getFileAsyncAwait).toBe('function');
    })

    it('should return an array of objects', async () => {
        const result = await getFileAsyncAwait('./test/with_links');
        expect(result).toEqual(expectedResult);
    })

    it('should return an empty array', async () => {
        const result = await getFileAsyncAwait('./test/no_links');
        expect(result).toEqual(['No links found.']);
    })
})