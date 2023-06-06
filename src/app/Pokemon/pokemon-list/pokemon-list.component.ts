import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChangeService } from 'src/app/service/change.service';
import { PokemonType } from 'src/app/types/Pokemon';
import { Subscription, pipe, take } from 'rxjs';
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

  constructor(
    private store: Store<{ pokeStore: PokemonType }>,
    private pokemonService: PokemonService
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
    this.newPokemon$ = this.store.select('pokeStore');
    this.subscription = this.newPokemon$.subscribe(
      (poke) => (this.viewPokemon = poke)
    );
  }
}
