import {
  changeAction,
  createPokemonAction,
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

export const initialImage: StoreApp = {
  id: 1,
  url: 'assets/bgImages/img1.jpg',
  theme: 'white',
};
export interface pokemonState {
  pokemons: any;
  isType?: string;
}

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
};
export interface localType {
  local: JSON;
  bool?: Boolean;
}

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
  on(sortPokemonAction, (state, { isType, pokemon }) => {
    return {
      pokemons: pokemon,
      isType: isType,
    };

    // return {
    //   pokemos: {...state = pokemon},
    //   isType: isType,
    // }
  }),
  on(searchPokemonAction, (state, { pokemon }) => {
    return {
      pokemons: pokemon,
    };
  })
);

// export const ViewPokemon = createReducer(
//   //初期値から、変更した新たなpokemonリストデータを返す
//   InitialPokemons,

//   // 文字列検索した結果を返す。
//   on(searchPokemonAction, (state, { pokemon }) => {
//     return pokemon;
//   })
// );

// on(createPokemonAction, (state, { pokemon }) => {
//   return ([state] = [pokemon]);
// }),
// on(sortPokemonAction, (state, { pokemon, isType }) => {
//   isType;
//   return (state = pokemon);
// })
