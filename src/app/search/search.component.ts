import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PokemonService } from '../service/pokemon.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { searchPokemon } from '../pokemon.action';
import { PokemonType } from '../types/Pokemon';
import { ChangeService } from '../service/change.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  faSearch = faSearch;
  currentTab?: string;
  pokemonList?: PokemonType[];
  isShow: boolean = false;
  inputText = '';

  constructor(
    private router: Router,
    private pokemonService: PokemonService,
    private store: Store<{ pokeStore: PokemonType }>
  ) {}

  ngOnInit() {
    this.getURL();
  }

  getPokemon(str: string) {
    //ひらがなをカタカナに置換
    if (this.inputText.length) {
      this.isShow = false;
      let regex = /[ぁ-ゞ]/g;
      let newStr = str.replace(regex, (match) => {
        const charCode = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(charCode);
      });
      this.pokemonService.getPokemon().subscribe((poke) => {
        this.pokemonList = poke;
      });

      let searchResult: any = this.pokemonList?.filter((i) =>
        i.name.japanese.includes(newStr)
      );
      if (searchResult.length) {
        this.isShow = false;
        this.store.dispatch(searchPokemon({ pokemon: searchResult }));
      } else {
        this.isShow = true;
      }
      this.router.navigateByUrl('/');
    }
  }
  reloadPage() {
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }

  getURL() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentTab = this.router.url;
      }
    });
  }
}
