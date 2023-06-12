import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { POKEMONAPI } from '../api/pokemonAPI';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  value: any;
  isBool: boolean = false;

  getPokemon(): Observable<any> {
    return of(POKEMONAPI);
  }

  //listに更新したポケモンの名前を渡す。
  setSavePokemon(val: any) {
    this.isBool = true;
    return (this.value = val);
  }
  getSavePokemon() {
    this.isBool = false;
    return this.value;
  }
}
