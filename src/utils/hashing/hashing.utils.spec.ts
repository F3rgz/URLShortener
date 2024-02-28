import * as crypto from 'crypto';
import { shortenURL } from './hashing.utils';

describe('shortenURL', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should hash the URL using sha256', () => {
    const hashMock = {
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValueOnce('123456'),
    };
    jest
      .spyOn(crypto, 'createHash')
      .mockImplementationOnce(() => hashMock as any);
    const url = 'https://example.com';

    shortenURL(url);

    expect(hashMock.update).toHaveBeenCalledWith(url);
  });

  it('should return the first five characters of the hash in Hex', () => {
    const expectedHash = 'firstHash';
    const hashMock = {
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValueOnce(expectedHash),
    };
    jest
      .spyOn(crypto, 'createHash')
      .mockImplementationOnce(() => hashMock as any);

    const result = shortenURL('test.me');

    expect(result).toBe('first');
  });
});
