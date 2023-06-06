import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PokemonService } from '../service/pokemon.service';
import { IconDefinition, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { searchPokemon, sortPokemon } from '../pokemon.action';
import { PokemonType } from '../types/Pokemon';
import { Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  faSearch: IconDefinition = faSearch;
  currentTab?: string;
  pokemonList?: PokemonType[];
  isShow: boolean = false;
  subscription?: Subscription;
  inputText: string = '';
  selectValue: string = 'HP';
  selectRadio: string = 'upButton';

  constructor(
    private router: Router,
    private pokemonService: PokemonService,
    private store: Store<{ pokeStore: PokemonType }>
  ) {}

  ngOnInit() {
    this.getURL();
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  onSelect(selectedValue: string) {
    switch (selectedValue) {
      case 'HP':
        this.selectValue = 'HP';
        break;
      case '攻撃':
        this.selectValue = 'Attack';
        break;
      case '防御':
        this.selectValue = 'Defense';
        break;
      case 'スピード':
        this.selectValue = 'Speed';
        break;
    }
  }
  onClick() {
    let pokeList: any;
    let newPoke: any;
    this.store.select('pokeStore').subscribe((poke) => (pokeList = poke));
    newPoke = pokeList
      .slice()
      .sort((a: any, b: any) =>
        this.selectRadio === 'upButton'
          ? b.base[this.selectValue] - a.base[this.selectValue]
          : a.base[this.selectValue] - b.base[this.selectValue]
      );
    this.store.dispatch(sortPokemon({ pokemon: newPoke }));
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
