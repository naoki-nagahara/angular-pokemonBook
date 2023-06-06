import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChangeService } from 'src/app/service/change.service';
import { PokemonType } from 'src/app/types/Pokemon';
import { Subscription, pipe, take } from 'rxjs';

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

  constructor(private store: Store<{ pokeStore: PokemonType }>) {}
  ngOnInit() {
    this.getPokemons();
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getPokemons() {
    this.newPokemon$ = this.store.select('pokeStore');
    this.newPokemon$.subscribe((poke) => (this.viewPokemon = poke));
  }
}
