import { Injectable } from '@angular/core';
import { POKEMON } from '../api/pokedex';
import { Observable, of } from 'rxjs';
import { POKEMONAPI } from '../api/pokemonAPI';
import { PokemonType } from '../types/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  getPokemon(): Observable<any> {
    return of(POKEMONAPI);
  }
}
