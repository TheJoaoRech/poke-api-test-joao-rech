import { Request, Response } from 'express';
import {
  fetchPokemonList,
  fetchPokemonById,
  fetchPokemonByName,
} from '../services/pokemon.service';

export const getPokemonList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pokemonList = await fetchPokemonList();
    res.json(pokemonList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokemon list' });
  }
};

export const getPokemonById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const pokemon = await fetchPokemonById(id);
    res.json(pokemon);
  } catch (error) {
    res.status(404).json({ error: 'Pokemon not found' });
  }
};

export const getPokemonByName = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const name = req.params.name;
    const pokemon = await fetchPokemonByName(name);
    res.json(pokemon);
  } catch (error) {
    res.status(404).json({ error: 'Pokemon not found' });
  }
};
