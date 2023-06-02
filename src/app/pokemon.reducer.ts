import { POKEMON } from './api/pokedex';
import { changeAction, createPokemon, searchPokemon } from './pokemon.action';
import { createReducer, on } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { PokemonService } from './service/pokemon.service';
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

export const pokemons: any = POKEMON;

// export class PokemonEffects {
//   loadPokemon$ = createEffect(() =>
//     this.action$.pipe(
//       ofType(createPokemon),
//       mergeMap(() =>
//         this.pokemonService
//           .getPokemon()
//           .pipe(map((pokemon: PokemonType) => createPokemon({ pokemon })))
//       )
//     )
//   );
//   constructor(
//     private pokemonService: PokemonService,
//     private action$: Actions
//   ) {}
// }

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
  pokemons,
  on(createPokemon, (state, { pokemon }) => {
    return ([state] = [pokemon]);
  }),
  //文字列検索した結果を返す。
  on(searchPokemon, (state, { pokemon }) => {
    return pokemon;
  })
);
