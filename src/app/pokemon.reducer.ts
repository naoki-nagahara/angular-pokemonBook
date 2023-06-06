import {
  changeAction,
  createPokemon,
  searchPokemon,
  sortPokemon,
} from './pokemon.action';
import { createReducer, on } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { PokemonType } from './types/Pokemon';
import { POKEMONAPI } from './api/pokemonAPI';

export interface StoreApp {
  id: number;
  url: string;
  theme: 'dark' | 'white' | 'middle';
}

export const initialImage: StoreApp = {
  id: 1,
  url: 'assets/bgImages/img1.jpg',
  theme: 'white',
};

//ローカルにJSONデータをset.getする処理。
const pokemonJson = JSON.stringify(POKEMONAPI);
if (!localStorage.getItem('POKEMONS')) {
  localStorage.setItem('POKEMONS', pokemonJson);
}
export const localPokemons = JSON.parse(localStorage.getItem('POKEMONS')!);

export const changeImage = createReducer(
  initialImage,
  on(changeAction, (state, { val, colorTheme, ImageNumber }) => ({
    ...state,
    id: ImageNumber,
    url: val,
    theme: colorTheme,
  }))
);

export const ViewPokemon = createReducer(
  //初期値から、変更した新たなpokemonリストデータを返す
  localPokemons,
  on(createPokemon, (state, { pokemon }) => {
    return ([state] = [pokemon]);
  }),
  //文字列検索した結果を返す。
  on(searchPokemon, (state, { pokemon }) => {
    return pokemon;
  }),
  on(sortPokemon, (state, { pokemon }) => {
    return (state = pokemon);
  })
);
