import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChangeService } from 'src/app/service/change.service';
import { PokemonType } from 'src/app/types/Pokemon';
import { Subscription } from 'rxjs';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  pokemons?: PokemonType[];
  newPokemon$?: Observable<PokemonType>;
  viewPokemon?: any;
  showPokemon?: boolean;
  subscription?: Subscription;
  getPokemon: any = '';
  isBool?: Boolean;
  isTypes: string = '';
  type: string = '';
  selectValue: string = '';
  constructor(
    private sortStore: Store<{ sortStore: any }>,
    private pokemonService: PokemonService,
    private changeService: ChangeService
  ) {}

  ngOnInit() {
    this.getPokemons();
    this.getModal();
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  getModal() {
    this.isBool = this.pokemonService.isBool;
    if (this.isBool === true) {
      this.getPokemon = this.pokemonService.getSavePokemon();
      setTimeout(() => {
        this.showPokemon = true;
      }, 500);
      setTimeout(() => {
        this.showPokemon = false;
      }, 2000);
    }
  }

  getPokemons() {
    //storeからリストに表示
    this.subscription = this.sortStore.select('sortStore').subscribe((poke) => {
      this.viewPokemon = poke.pokemons;
      this.isTypes = poke.isType;
      this.changeService.onSelect(this.isTypes);
      this.selectValue = this.changeService.selectValue;
    });
  }
}
