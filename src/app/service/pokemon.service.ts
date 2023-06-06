import { Injectable } from '@angular/core';
import { POKEMON } from '../api/pokedex';
import { Observable, Subject, of } from 'rxjs';
import { POKEMONAPI } from '../api/pokemonAPI';
import { PokemonType } from '../types/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  value: any;
  isBool: boolean = false;

  getPokemon(): Observable<any> {
    return of(POKEMONAPI);
  }

  setSavePokemon(val: any) {
    this.isBool = true;
    return (this.value = val);
  }
  getSavePokemon() {
    this.isBool = false;
    return this.value;
  }
}
