import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChangeService } from 'src/app/service/change.service';
import { PokemonType } from 'src/app/types/Pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  pokemons?: PokemonType;
  newPokemon$?: Observable<PokemonType>;
  viewPokemon?: any;
  showPokemon?: boolean;

  constructor(
    private store: Store<{ pokeStore: PokemonType }>,
    private changeService: ChangeService
  ) {}
  ngOnInit() {
    this.getPokemons();
    console.log(this.viewPokemon);
    this.showPokemon = this.changeService.isShow;
  }
  getPokemons() {
    this.newPokemon$ = this.store.select('pokeStore');
    this.newPokemon$.subscribe(
      (poke: PokemonType) => (this.viewPokemon = poke)
    );
  }
}
