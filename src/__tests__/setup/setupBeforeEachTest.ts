process.env.STAGE = 'test';

global.beforeEach(() => {
  jest.resetModules();
});
