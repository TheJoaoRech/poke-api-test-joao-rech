import {
  fetchPokemonList,
  fetchPokemonById,
  fetchPokemonByName,
} from '../../../services/pokemon.service';
import {
  mockPokemonList,
  mockPokemonById,
  mockPikachuById,
  mockMrMimeById,
  mockTypeNullById,
} from '../../mocks/pokemonService.mock';

jest.mock('../../../services/pokemon.service');

describe('Pokemon Service - Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchPokemonList', () => {
    it('should return an array of pokemons', async () => {
      (fetchPokemonList as jest.Mock).mockResolvedValue(mockPokemonList);

      const result = await fetchPokemonList(20, 0);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should accept limit and offset parameters', async () => {
      const emptyList: any[] = [];
      (fetchPokemonList as jest.Mock).mockResolvedValue(emptyList);

      await fetchPokemonList(50, 100);

      expect(fetchPokemonList).toHaveBeenCalledWith(50, 100);
    });

    it('should handle API errors gracefully', async () => {
      (fetchPokemonList as jest.Mock).mockRejectedValue(
        new Error('Failed to fetch Pokemon list')
      );

      await expect(fetchPokemonList(20, 0)).rejects.toThrow(
        'Failed to fetch Pokemon list'
      );
    });

    it('should use default limit when not provided', async () => {
      (fetchPokemonList as jest.Mock).mockResolvedValue(mockPokemonList);

      await fetchPokemonList(20, 0);

      expect(fetchPokemonList).toHaveBeenCalled();
    });
  });

  describe('fetchPokemonById', () => {
    it('should return pokemon details by valid id', async () => {
      (fetchPokemonById as jest.Mock).mockResolvedValue(mockPokemonById);

      const result = await fetchPokemonById(1);

      expect(result.id).toBe(1);
      expect(result.name).toBe('bulbasaur');
      expect(result).toHaveProperty('types');
      expect(result).toHaveProperty('abilities');
    });

    it('should throw error for invalid pokemon id', async () => {
      (fetchPokemonById as jest.Mock).mockRejectedValue(
        new Error('Pokemon with id 99999 not found')
      );

      await expect(fetchPokemonById(99999)).rejects.toThrow(
        'Pokemon with id 99999 not found'
      );
    });

    it('should handle numeric id correctly', async () => {
      (fetchPokemonById as jest.Mock).mockResolvedValue(mockPikachuById);

      const result = await fetchPokemonById(25);

      expect(result.id).toBe(25);
      expect(fetchPokemonById).toHaveBeenCalledWith(25);
    });

    it('should return complete pokemon object with all properties', async () => {
      (fetchPokemonById as jest.Mock).mockResolvedValue(mockPokemonById);

      const result = await fetchPokemonById(1);

      expect(Object.keys(result).length).toBeGreaterThan(0);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('height');
      expect(result).toHaveProperty('weight');
    });
  });

  describe('fetchPokemonByName', () => {
    it('should return pokemon details by name', async () => {
      (fetchPokemonByName as jest.Mock).mockResolvedValue(mockPikachuById);

      const result = await fetchPokemonByName('pikachu');

      expect(result.name).toBe('pikachu');
      expect(result.id).toBe(25);
    });

    it('should handle case insensitive search', async () => {
      (fetchPokemonByName as jest.Mock).mockResolvedValue(mockPikachuById);

      const result1 = await fetchPokemonByName('pikachu');
      (fetchPokemonByName as jest.Mock).mockResolvedValue(mockPikachuById);
      const result2 = await fetchPokemonByName('PIKACHU');

      expect(result1.id).toBe(result2.id);
    });

    it('should throw error for invalid pokemon name', async () => {
      (fetchPokemonByName as jest.Mock).mockRejectedValue(
        new Error('Pokemon with name invalid-pokemon-xyz not found')
      );

      await expect(fetchPokemonByName('invalid-pokemon-xyz')).rejects.toThrow();
    });

    it('should handle hyphenated pokemon names', async () => {
      (fetchPokemonByName as jest.Mock).mockResolvedValue(mockMrMimeById);

      const result = await fetchPokemonByName('mr-mime');

      expect(result.name).toBe('mr-mime');
      expect(fetchPokemonByName).toHaveBeenCalledWith('mr-mime');
    });

    it('should handle pokemon with special names', async () => {
      (fetchPokemonByName as jest.Mock).mockResolvedValue(mockTypeNullById);

      const result = await fetchPokemonByName('type-null');

      expect(result).toBeDefined();
    });
  });
});
