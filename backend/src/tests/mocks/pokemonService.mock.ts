export const mockPokemonList = [
  {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  },
  {
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/2/',
  },
  {
    name: 'venusaur',
    url: 'https://pokeapi.co/api/v2/pokemon/3/',
  },
];

export const mockPokemonById = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
  abilities: [{ ability: { name: 'overgrow' } }],
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
};

export const mockPikachuById = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  base_experience: 112,
  types: [{ type: { name: 'electric' } }],
  abilities: [{ ability: { name: 'static' } }],
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
};

export const mockMrMimeById = {
  id: 122,
  name: 'mr-mime',
  height: 13,
  weight: 545,
  base_experience: 161,
  types: [{ type: { name: 'psychic' } }, { type: { name: 'fairy' } }],
  abilities: [{ ability: { name: 'soundproof' } }],
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png',
  },
};

export const mockTypeNullById = {
  id: 772,
  name: 'type-null',
  height: 20,
  weight: 1200,
  base_experience: 61,
  types: [{ type: { name: 'normal' } }],
  abilities: [{ ability: { name: 'type-null-ability' } }],
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/772.png',
  },
};
