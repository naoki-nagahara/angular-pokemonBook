import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoreApp } from './pokemon.reducer';
import { PokemonService } from './service/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  image$?: Observable<StoreApp>;
  isColor$?: Observable<StoreApp>;
  isBool$?: Observable<StoreApp>;
  Show: Boolean = true;
  theme = '';
  imageUrl?: string;
  localPokemon?: any;

  constructor(
    private store: Store<{ store: StoreApp }>,
    private pokemonService: PokemonService
  ) {
    this.image$ = this.store.select('store');
    this.image$!.subscribe((url: StoreApp) => (this.imageUrl = url.url));
    this.isColor$ = this.store.select('store');
    this.isColor$.subscribe((val) => (this.theme = val.theme));

    if (localStorage.length) {
      this.imageUrl = localStorage.getItem('bgImage')!;
      this.theme = localStorage.getItem('Theme')!;
      return;
    } else {
      localStorage.setItem('bgImage', this.imageUrl!);
      localStorage.setItem('Number', String(1));
      localStorage.setItem('Theme', this.theme);
    }
  }
  ngOnInit() {
    this.pokemonService
      .getPokemon()
      .subscribe((poke) => (this.localPokemon = poke));
  }
}
