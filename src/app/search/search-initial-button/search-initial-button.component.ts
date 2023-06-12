import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { searchPokemonAction } from 'src/app/pokemon.action';
import { PokemonType } from 'src/app/types/Pokemon';

@Component({
  selector: 'app-search-initial-button',
  templateUrl: './search-initial-button.component.html',
  styleUrls: ['./search-initial-button.component.css'],
})
export class SearchInitialButtonComponent {
  pokemonList?: PokemonType;
  isShow: boolean = false;

  constructor(
    private router: Router,
    private store: Store<{ store: PokemonType }>
  ) {}
  initialButton() {
    this.isShow = true;
    let initialJson: string = localStorage.getItem('INITIALPOKEMONS')!;
    localStorage.setItem('POKEMONS', initialJson);
    let initialPokemon = JSON.parse(initialJson);
    setTimeout(() => {
      this.isShow = false;
      this.store.dispatch(
        searchPokemonAction({ pokemon: initialPokemon, isType: '' })
      );
      this.router.navigate(['/']);
    }, 3000);
  }
}
