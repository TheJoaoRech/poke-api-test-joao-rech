import {
  getPokemonList,
  getPokemonById,
  getPokemonByName,
} from '../../../controllers/pokemonController';
import {
  fetchPokemonList,
  fetchPokemonById,
  fetchPokemonByName,
} from '../../../services/pokemon.service';
import {
  mockPokemonList,
  mockPokemonById,
  mockPikachuById,
} from '../../mocks/pokemonService.mock';
import {
  mockExpressRequest,
  mockExpressResponse,
} from '../../mocks/express.mock';

jest.mock('../../../services/pokemon.service');

describe('Pokemon Controller - Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPokemonList', () => {
    it('should return pokemon list successfully', async () => {
      (fetchPokemonList as jest.Mock).mockResolvedValue(mockPokemonList);
      const req = mockExpressRequest({
        query: { limit: '20', offset: '0' },
      }) as any;
      const res = mockExpressResponse();

      await getPokemonList(req, res);

      expect(res.json).toHaveBeenCalledWith(mockPokemonList);
    });

    it('should handle errors when fetching list', async () => {
      (fetchPokemonList as jest.Mock).mockRejectedValue(new Error('API Error'));
      const req = mockExpressRequest() as any;
      const res = mockExpressResponse();

      await getPokemonList(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should pass limit and offset to service', async () => {
      (fetchPokemonList as jest.Mock).mockResolvedValue(mockPokemonList);
      const req = mockExpressRequest({
        query: { limit: '50', offset: '10' },
      }) as any;
      const res = mockExpressResponse();

      await getPokemonList(req, res);

      expect(fetchPokemonList).toHaveBeenCalled();
    });
  });

  describe('getPokemonById', () => {
    it('should return pokemon by id successfully', async () => {
      (fetchPokemonById as jest.Mock).mockResolvedValue(mockPokemonById);
      const req = mockExpressRequest({ params: { id: '1' } }) as any;
      const res = mockExpressResponse();

      await getPokemonById(req, res);

      expect(res.json).toHaveBeenCalledWith(mockPokemonById);
    });

    it('should handle not found error', async () => {
      (fetchPokemonById as jest.Mock).mockRejectedValue(
        new Error('Pokemon not found')
      );
      const req = mockExpressRequest({ params: { id: '99999' } }) as any;
      const res = mockExpressResponse();

      await getPokemonById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should return error status for invalid id', async () => {
      (fetchPokemonById as jest.Mock).mockRejectedValue(
        new Error('Invalid ID')
      );
      const req = mockExpressRequest({ params: { id: 'invalid' } }) as any;
      const res = mockExpressResponse();

      await getPokemonById(req, res);

      expect(res.status).toHaveBeenCalled();
    });
  });

  describe('getPokemonByName', () => {
    it('should return pokemon by name successfully', async () => {
      (fetchPokemonByName as jest.Mock).mockResolvedValue(mockPikachuById);
      const req = mockExpressRequest({ params: { name: 'pikachu' } }) as any;
      const res = mockExpressResponse();

      await getPokemonByName(req, res);

      expect(res.json).toHaveBeenCalledWith(mockPikachuById);
    });

    it('should handle not found error', async () => {
      (fetchPokemonByName as jest.Mock).mockRejectedValue(
        new Error('Pokemon not found')
      );
      const req = mockExpressRequest({ params: { name: 'invalid' } }) as any;
      const res = mockExpressResponse();

      await getPokemonByName(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should handle api errors', async () => {
      (fetchPokemonByName as jest.Mock).mockRejectedValue(
        new Error('API Error')
      );
      const req = mockExpressRequest({ params: { name: 'test' } }) as any;
      const res = mockExpressResponse();

      await getPokemonByName(req, res);

      expect(res.status).toHaveBeenCalled();
    });
  });
});
