import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { sortPokemonAction } from 'src/app/pokemon.action';
@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.css'],
})
export class SearchSelectComponent implements OnDestroy, OnInit {
  isShowURL: boolean = true;
  selectValue: string = 'HP';
  selectRadio: string = 'upButton';
  subscription?: Subscription;
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
  getURL() {
    this.subscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        e.url === '/' ? (this.isShowURL = false) : (this.isShowURL = true);
      }
    });
  }

  onClick() {
    this.subscription = this.store.select('sortStore').subscribe((poke) => {
      this.pokeList = poke.pokemons;
      this.newPoke = this.pokeList.slice().sort((a: any, b: any) => {
        return this.selectRadio === 'upButton'
          ? b.base[this.selectValue] - a.base[this.selectValue]
          : a.base[this.selectValue] - b.base[this.selectValue];
      });
    });
    this.store.dispatch(
      sortPokemonAction({ pokemon: this.newPoke, isType: this.selectValue })
    );
  }
}
