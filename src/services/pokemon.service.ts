import axios from 'axios';
import https from 'https';
import { Pokemon, PokemonListItem } from '../types/pokemon';

const POKEAPI_BASE_URL = process.env.POKEAPI_BASE_URL;
const POKEAPI_ENDPOINT = process.env.POKEAPI_POKEMON_ENDPOINT;
const POKEAPI_URL = `${POKEAPI_BASE_URL}${POKEAPI_ENDPOINT}`;
const REJECT_UNAUTHORIZED = process.env.REJECT_UNAUTHORIZED === 'true';
const REQUEST_TIMEOUT = parseInt(process.env.REQUEST_TIMEOUT ?? '5000');

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: REJECT_UNAUTHORIZED,
  }),
  timeout: REQUEST_TIMEOUT,
});

export const fetchPokemonList = async (
  limit: number = 20,
  offset: number = 0
): Promise<PokemonListItem[]> => {
  try {
    const response = await axiosInstance.get(
      `${POKEAPI_URL}?limit=${limit}&offset=${offset}`
    );
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
