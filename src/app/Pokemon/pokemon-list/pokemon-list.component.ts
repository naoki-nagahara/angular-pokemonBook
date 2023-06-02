import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PokemonType } from 'src/app/types/Pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  pokemons?: PokemonType;
  newPokemon$?: Observable<PokemonType>;
  viewPokemon?: any;

  constructor(private store: Store<{ pokeStore: PokemonType }>) {}
  ngOnInit() {
    this.getPokemons();
  }
  getPokemons() {
    this.newPokemon$ = this.store.select('pokeStore');
    this.newPokemon$.subscribe(
      (poke: PokemonType) => (this.viewPokemon = poke)
    );
    console.log(this.viewPokemon);
  }
}
