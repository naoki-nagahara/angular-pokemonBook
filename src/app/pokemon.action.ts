import { createAction, props } from '@ngrx/store';
import { PokemonType } from './types/Pokemon';

export const changeAction = createAction(
  'change',
  props<{
    ImageNumber: number;
    val: string;
    colorTheme: 'dark' | 'white' | 'middle';
  }>()
);

export const createPokemon = createAction(
  'createPokemon',
  props<{ pokemon: PokemonType }>()
);
export const searchPokemon = createAction(
  'searchPokemon',
  props<{ pokemon: PokemonType }>()
);
export const sortPokemon = createAction(
  'sortPokemon',
  props<{ pokemon: PokemonType }>()
);
