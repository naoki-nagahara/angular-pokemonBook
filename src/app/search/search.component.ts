import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../service/pokemon.service';
import { IconDefinition, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { searchPokemonAction } from '../pokemon.action';
import { PokemonType } from '../types/Pokemon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  faSearch: IconDefinition = faSearch;
  pokemonList?: PokemonType[];
  isShow: boolean = false;
  isTabShow: boolean = false;
  subscription?: Subscription;
  inputText: string = '';

  constructor(
    private router: Router,
    private pokemonService: PokemonService,
    private store: Store<{ pokeStore: PokemonType }>
  ) {}

  ngOnInit() {}
  ngOnDestroy() {
    this.subscription?.unsubscribe();
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
      this.subscription = this.pokemonService.getPokemon().subscribe((poke) => {
        this.pokemonList = poke;
      });

      let searchResult: any = this.pokemonList?.filter((i) =>
        i.name.japanese.includes(newStr)
      );
      if (searchResult.length) {
        this.isShow = false;
        this.store.dispatch(
          searchPokemonAction({ pokemon: searchResult, isType: 'HP' })
        );
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
}
