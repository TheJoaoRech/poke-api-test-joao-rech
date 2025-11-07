import { Router } from 'express';

import {
  getPokemonList,
  getPokemonById,
  getPokemonByName,
} from '../controllers/pokemonController';
import { validatePokemonParams } from '../middlewares/validatePokemonParams';

const router = Router();

router.get('/', validatePokemonParams, getPokemonList);
router.get('/id/:id', validatePokemonParams, getPokemonById);
router.get('/name/:name', validatePokemonParams, getPokemonByName);

export default router;
