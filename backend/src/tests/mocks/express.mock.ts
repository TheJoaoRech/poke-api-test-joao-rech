export const mockExpressRequest = (overrides = {}) => ({
  query: {},
  params: {},
  body: {},
  ...overrides,
});

export const mockExpressResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

export const mockExpressNext = jest.fn();
