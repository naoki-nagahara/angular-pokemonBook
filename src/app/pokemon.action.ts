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

export const createPokemonAction = createAction(
  'createPokemon',
  props<{ pokemon: PokemonType[] }>()
);
export const searchPokemonAction = createAction(
  'searchPokemon',
  props<{ pokemon: PokemonType; isType: string }>()
);
export const sortPokemonAction = createAction(
  'sortPokemon',
  props<{
    pokemon: PokemonType;
    isType: string;
    selectType: string;
    isSearch: boolean;
  }>()
);
