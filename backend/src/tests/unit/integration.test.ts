import {
  fetchPokemonList,
  fetchPokemonById,
  fetchPokemonByName,
} from '../../services/pokemon.service';
import {
  mockPokemonList,
  mockPokemonById,
  mockPikachuById,
} from '../mocks/pokemonService.mock';

jest.mock('../../services/pokemon.service');

describe('Integration Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch pokemon by id and name and return same data', async () => {
    (fetchPokemonById as jest.Mock).mockResolvedValue(mockPikachuById);
    (fetchPokemonByName as jest.Mock).mockResolvedValue(mockPikachuById);

    const pokemonById = await fetchPokemonById(25);
    const pokemonByName = await fetchPokemonByName('pikachu');

    expect(pokemonById.id).toBe(pokemonByName.id);
    expect(pokemonById.name).toBe(pokemonByName.name);
  });

  it('should handle pagination correctly', async () => {
    const page1 = [
      { name: 'bulbasaur', url: 'url1' },
      { name: 'ivysaur', url: 'url2' },
    ];
    const page2 = [
      { name: 'venusaur', url: 'url3' },
      { name: 'charmander', url: 'url4' },
    ];

    (fetchPokemonList as jest.Mock)
      .mockResolvedValueOnce(page1)
      .mockResolvedValueOnce(page2);

    const result1 = await fetchPokemonList(2, 0);
    const result2 = await fetchPokemonList(2, 2);

    expect(result1).not.toEqual(result2);
    expect(result1.length).toBe(2);
    expect(result2.length).toBe(2);
  });

  it('should handle multiple sequential requests', async () => {
    (fetchPokemonById as jest.Mock)
      .mockResolvedValueOnce(mockPokemonById)
      .mockResolvedValueOnce(mockPikachuById);

    const result1 = await fetchPokemonById(1);
    const result2 = await fetchPokemonById(25);

    expect(result1.id).toBe(1);
    expect(result2.id).toBe(25);
  });

  it('should handle error recovery in service calls', async () => {
    (fetchPokemonById as jest.Mock)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce(mockPikachuById);

    await expect(fetchPokemonById(1)).rejects.toThrow('Network error');

    const result = await fetchPokemonById(25);
    expect(result.id).toBe(25);
  });

  it('should fetch list and then get details of first pokemon', async () => {
    (fetchPokemonList as jest.Mock).mockResolvedValue(mockPokemonList);
    (fetchPokemonById as jest.Mock).mockResolvedValue(mockPokemonById);

    const list = await fetchPokemonList(20, 0);
    expect(list.length).toBeGreaterThan(0);

    const firstPokemonDetails = await fetchPokemonById(1);
    expect(firstPokemonDetails.name).toBe('bulbasaur');
  });

  it('should handle search by name after fetching list', async () => {
    (fetchPokemonList as jest.Mock).mockResolvedValue(mockPokemonList);
    (fetchPokemonByName as jest.Mock).mockResolvedValue(mockPikachuById);

    const list = await fetchPokemonList(20, 0);
    expect(list).toBeDefined();

    const pikachuDetails = await fetchPokemonByName('pikachu');
    expect(pikachuDetails.name).toBe('pikachu');
  });
});
