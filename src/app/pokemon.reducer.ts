import {
  changeAction,
  searchPokemonAction,
  sortPokemonAction,
} from './pokemon.action';
import { createReducer, on } from '@ngrx/store';

import { POKEMONAPI } from './api/pokemonAPI';

export interface StoreApp {
  id: number;
  url: string;
  theme: 'dark' | 'white' | 'middle';
}

export interface pokemonState {
  pokemons: any;
  isType?: string;
  selectType?: string;
  isSearch?: boolean;
}
export interface localType {
  local: JSON;
  bool?: Boolean;
}
export const initialImage: StoreApp = {
  id: 1,
  url: 'assets/bgImages/img1.jpg',
  theme: 'white',
};

//ローカルにJSONデータをset.getする処理。
const pokemonJson = JSON.stringify(POKEMONAPI);
localStorage.setItem('INITIALPOKEMONS', pokemonJson);
if (!localStorage.getItem('POKEMONS')) {
  localStorage.setItem('POKEMONS', pokemonJson);
}

export const localPokemons: localType = {
  local: JSON.parse(localStorage.getItem('POKEMONS')!),
};
export const InitialPokemons = JSON.parse(localStorage.getItem('POKEMONS')!);

export const InitialState: pokemonState = {
  pokemons: InitialPokemons,
  isType: '',
  selectType: '',
};

export const changeImage = createReducer(
  initialImage,
  on(changeAction, (state, { val, colorTheme, ImageNumber }) => ({
    ...state,
    id: ImageNumber,
    url: val,
    theme: colorTheme,
  }))
);

export const SortPokemons = createReducer(
  //初期値から、変更した新たなpokemonリストデータを返す
  InitialState,
  on(sortPokemonAction, (state, { isType, pokemon, selectType, isSearch }) => {
    console.log(isType, 'reducerType');
    return {
      pokemons: pokemon,
      isType: isType,
      selectType: selectType,
      isSearch: isSearch,
    };
  }),
  on(searchPokemonAction, (state, { pokemon }) => {
    return {
      pokemons: pokemon,
    };
  })
);
