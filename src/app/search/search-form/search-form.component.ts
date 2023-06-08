import { Component } from '@angular/core';
import { IconDefinition, faSearch } from '@fortawesome/free-solid-svg-icons';
import { PokemonType } from 'src/app/types/Pokemon';
import { Subscription } from 'rxjs';
import { PokemonService } from 'src/app/service/pokemon.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { searchPokemonAction, sortPokemonAction } from 'src/app/pokemon.action';
import { SortPokemons } from 'src/app/pokemon.reducer';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent {
  faSearch: IconDefinition = faSearch;
  pokemonList?: PokemonType[];
  isShow: boolean = false;
  isTabShow: boolean = false;
  subscription?: Subscription;
  inputText: string = '';
  constructor(
    private router: Router,
    private pokemonService: PokemonService,
    private store: Store<{ pokemon: PokemonType }>
  ) {}

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
          sortPokemonAction({ pokemon: searchResult, isType: 'Attack' })
        );
      } else {
        this.isShow = true;
      }
      this.router.navigateByUrl('/');
    }
  }
}
