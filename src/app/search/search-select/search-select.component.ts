import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { sortPokemonAction } from 'src/app/pokemon.action';
import { PokemonType } from 'src/app/types/Pokemon';
@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.css'],
})
export class SearchSelectComponent implements OnDestroy, OnInit {
  isShowURL: boolean = true;
  selectValue: string = '';
  selectRadio: string = 'upButton';
  subscription?: Subscription;
  isSearch: boolean = false;
  newPoke!: any;
  pokeList!: any;
  constructor(
    private store: Store<{ sortStore: any }>,
    private router: Router
  ) {}

  ngOnInit() {
    this.getURL();
  }
  ngOnDestroy(): void {
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
    console.log(this.selectValue);
  }
  getURL() {
    this.subscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        e.url === '/' ? (this.isShowURL = false) : (this.isShowURL = true);
      }
    });
  }

  onClick() {
    this.subscription = this.store.select('sortStore').subscribe((poke) => {
      poke.isSearch === true ? (this.isSearch = true) : (this.isSearch = false);
      this.pokeList = poke.pokemons;
      this.newPoke = this.pokeList
        .slice()
        .sort((a: PokemonType, b: PokemonType) => {
          const aValue = a.base[this.selectValue as keyof typeof a.base];
          const bValue = b.base[this.selectValue as keyof typeof b.base];
          return this.selectRadio === 'upButton'
            ? bValue - aValue
            : aValue - bValue;
        });
    });

    this.store.dispatch(
      sortPokemonAction({
        pokemon: this.newPoke,
        isType: this.selectValue,
        selectType: this.selectRadio,
        isSearch: this.isSearch,
      })
    );
    this.router.navigate(['/']);
  }
}

