import { Router } from 'express';
import {
  getPokemonList,
  getPokemonById,
  getPokemonByName,
} from '../controllers/pokemonController';

const router = Router();

router.get('/', getPokemonList);

router.get('/id/:id', getPokemonById);

router.get('/name/:name', getPokemonByName);

export default router;
