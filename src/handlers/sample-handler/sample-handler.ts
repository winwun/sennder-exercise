async function func() {
  return Promise.resolve({});
}

export const handler = function (): string {
  return 'hello';
};
