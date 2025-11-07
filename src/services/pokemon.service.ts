import axios from 'axios';
import https from 'https';
import { Pokemon, PokemonListItem } from '../types/pokemon';

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export const fetchPokemonList = async (): Promise<PokemonListItem[]> => {
  try {
    const response = await axiosInstance.get(`${POKEAPI_URL}?limit=20`);
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch Pokemon list');
  }
};

export const fetchPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    const response = await axiosInstance.get(`${POKEAPI_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Pokemon with id ${id} not found`);
  }
};

export const fetchPokemonByName = async (name: string): Promise<Pokemon> => {
  try {
    const response = await axiosInstance.get(`${POKEAPI_URL}/${name}`);
    return response.data;
  } catch (error) {
    throw new Error(`Pokemon with name ${name} not found`);
  }
};
