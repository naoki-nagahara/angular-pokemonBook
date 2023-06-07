import { Component } from '@angular/core';
import { Store, createAction } from '@ngrx/store';
import { searchPokemon } from 'src/app/pokemon.action';
import { PokemonType } from 'src/app/types/Pokemon';
import { IconDefinition, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-initial-button',
  templateUrl: './search-initial-button.component.html',
  styleUrls: ['./search-initial-button.component.css'],
})
export class SearchInitialButtonComponent {
  faSearch: IconDefinition = faThumbsUp;
  pokemonList?: PokemonType;
  isShow: boolean = false;
  constructor(private store: Store<{ store: PokemonType }>) {}
  initialButton() {
    let initialJson: string = localStorage.getItem('INITIALPOKEMONS')!;
    localStorage.setItem('POKEMONS', initialJson);
    let initialPokemon = JSON.parse(initialJson);
    this.store.dispatch(searchPokemon({ pokemon: initialPokemon }));
    // setTimeout(() => {
    //   this.isShow = false;
    // }, 800);
  }
}
