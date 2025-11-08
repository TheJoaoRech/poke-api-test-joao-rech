import { validatePokemonParams } from '../../../middlewares/validatePokemonParams';
import {
  mockExpressRequest,
  mockExpressResponse,
  mockExpressNext,
} from '../../mocks/express.mock';

describe('Middleware - validatePokemonParams - Unit Tests', () => {
  let next: any;

  beforeEach(() => {
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next when valid pagination params are provided', () => {
    const req = mockExpressRequest({
      query: { limit: '20', offset: '0' },
    }) as any;
    const res = mockExpressResponse();

    validatePokemonParams(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should call next with default values when no params provided', () => {
    const req = mockExpressRequest() as any;
    const res = mockExpressResponse();

    validatePokemonParams(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should handle missing limit parameter', () => {
    const req = mockExpressRequest({ query: { offset: '0' } }) as any;
    const res = mockExpressResponse();

    validatePokemonParams(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should handle missing offset parameter', () => {
    const req = mockExpressRequest({ query: { limit: '20' } }) as any;
    const res = mockExpressResponse();

    validatePokemonParams(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should validate numeric limit parameter', () => {
    const req = mockExpressRequest({
      query: { limit: 'invalid', offset: '0' },
    }) as any;
    const res = mockExpressResponse();

    validatePokemonParams(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  });

  it('should validate numeric offset parameter', () => {
    const req = mockExpressRequest({
      query: { limit: '20', offset: 'invalid' },
    }) as any;
    const res = mockExpressResponse();

    validatePokemonParams(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  });

  it('should handle negative limit values', () => {
    const req = mockExpressRequest({
      query: { limit: '-10', offset: '0' },
    }) as any;
    const res = mockExpressResponse();

    validatePokemonParams(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  });

  it('should handle negative offset values', () => {
    const req = mockExpressRequest({
      query: { limit: '20', offset: '-5' },
    }) as any;
    const res = mockExpressResponse();

    validatePokemonParams(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  });

  it('should handle very large pagination values', () => {
    const req = mockExpressRequest({
      query: { limit: '99999', offset: '99999' },
    }) as any;
    const res = mockExpressResponse();

    validatePokemonParams(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should handle zero values for limit', () => {
    const req = mockExpressRequest({
      query: { limit: '0', offset: '0' },
    }) as any;
    const res = mockExpressResponse();

    validatePokemonParams(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  });

  it('should accept zero for offset', () => {
    const req = mockExpressRequest({
      query: { limit: '20', offset: '0' },
    }) as any;
    const res = mockExpressResponse();

    validatePokemonParams(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should validate id parameter when provided', () => {
    const req = mockExpressRequest({ query: { id: 'invalid' } }) as any;
    const res = mockExpressResponse();

    validatePokemonParams(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should accept valid positive id', () => {
    const req = mockExpressRequest({ query: { id: '1' } }) as any;
    const res = mockExpressResponse();

    validatePokemonParams(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should validate name parameter when provided', () => {
    const req = mockExpressRequest({ query: { name: '' } }) as any;
    const res = mockExpressResponse();

    validatePokemonParams(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should accept valid name parameter', () => {
    const req = mockExpressRequest({ query: { name: 'pikachu' } }) as any;
    const res = mockExpressResponse();

    validatePokemonParams(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
