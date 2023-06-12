import { Component, OnDestroy } from '@angular/core';
import { IconDefinition, faSearch } from '@fortawesome/free-solid-svg-icons';
import { PokemonType } from 'src/app/types/Pokemon';
import { Subscription } from 'rxjs';
import { PokemonService } from 'src/app/service/pokemon.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { sortPokemonAction } from 'src/app/pokemon.action';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnDestroy {
  faSearch: IconDefinition = faSearch;
  pokemonList?: PokemonType[];
  isShow: boolean = false;
  isTabShow: boolean = false;
  isInputShow: boolean = false;
  subscription?: Subscription;
  inputText: string = '';
  isType: string = '';
  selectedType: string = '';
  isSearch: boolean = false;
  constructor(
    private router: Router,
    private pokemonService: PokemonService,
    private store: Store<{ sortStore: any }>
  ) {}
  ngOnInit() {
    this.getStore();
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  getStore() {
    this.subscription = this.store.select('sortStore').subscribe((poke) => {
      this.isType = poke.isType;
      this.selectedType = poke.selectType;
      this.isSearch = poke.isSearch;
    });
  }
  getPokemon(str: string) {
    //ひらがなをカタカナに置換
    if (this.inputText.length > 0) {
      this.isInputShow = false;
      this.isShow = false;
      let regex = /[ぁ-ゞ]/g;
      let newStr = str.replace(regex, (match) => {
        const charCode = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(charCode);
      });
      let localPokemon = localStorage.getItem('POKEMONS');
      this.pokemonList = JSON.parse(localPokemon!);

      let searchResult: any = this.pokemonList?.filter((i) =>
        i.name.japanese.includes(newStr)
      );
      if (searchResult.length) {
        this.isShow = false;
        this.store.dispatch(
          sortPokemonAction({
            pokemon: searchResult,
            isType: this.isType,
            selectType: this.selectedType,
            isSearch: true,
          })
        );
      } else {
        this.isShow = true;
      }
      this.inputText = '';
      this.router.navigateByUrl('/');
    } else {
      this.isInputShow = true;
    }
  }
}
