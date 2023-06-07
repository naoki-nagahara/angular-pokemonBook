import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { searchPokemon, sortPokemon } from 'src/app/pokemon.action';
import { PokemonType } from 'src/app/types/Pokemon';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ChangeService } from 'src/app/service/change.service';
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
  constructor(
    private store: Store<{ pokeStore: PokemonType; is: boolean }>,
    private router: Router,
    private location: Location,
    private changeService: ChangeService
  ) {}
  ngOnInit() {
    this.getURL();
    console.log('並び替え');
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
    let pokeList: any;
    let newPoke: any;
    this.subscription = this.store
      .select('pokeStore')
      .subscribe((poke) => (pokeList = poke));
    newPoke = pokeList
      .slice()
      .sort((a: any, b: any) =>
        this.selectRadio === 'upButton'
          ? b.base[this.selectValue] - a.base[this.selectValue]
          : a.base[this.selectValue] - b.base[this.selectValue]
      );
    console.log(newPoke);
    this.store.dispatch(sortPokemon({ pokemon: newPoke, isSort: true }));
    this.changeService.setReload(true);
  }
}
