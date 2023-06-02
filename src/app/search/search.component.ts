import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PokemonService } from '../service/pokemon.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { createPokemon } from '../pokemon.action';
import { PokemonType } from '../types/Pokemon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  faSearch = faSearch;
  currentTab?: string;
  result?: PokemonType[];
  pokemonList?: PokemonType[];

  constructor(
    private router: Router,
    private location: Location,
    private pokemonService: PokemonService,
    private store: Store<{ pokeStore: PokemonType }>
  ) {}

  ngOnInit() {
    this.getURL();
  }
  getPokemon(str: string) {
    this.pokemonService.getPokemon().subscribe((poke) => {
      this.pokemonList = poke;
    });
    let result: any = this.pokemonList?.find((a) => a.name.japanese === str);
    console.log(result);
    this.store.dispatch(createPokemon({ pokemon: result }));
    this.router.navigateByUrl('/');
  }
  // reloadPage() {
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     window.location.reload();
  //     this.router.navigate(['/']);
  //   });
  // }

  getURL() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentTab = this.router.url;
        console.log(this.currentTab);
      }
    });
  }
}
