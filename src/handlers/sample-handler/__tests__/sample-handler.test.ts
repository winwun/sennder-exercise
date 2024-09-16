import { handler } from '../sample-handler';

describe('Sample hanlder', () => {
  it('should do something', () => {
    handler();
    expect(handler()).toBe('hello');
  });
});
