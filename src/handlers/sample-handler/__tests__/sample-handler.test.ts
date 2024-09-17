import { handler } from '../sample-handler';

describe('Sample hanlder', () => {
  it('should do something', () => {
    expect(handler()).toBe('hello');
  });
});
