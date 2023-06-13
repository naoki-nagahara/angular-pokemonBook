import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { sortPokemonAction } from 'src/app/pokemon.action';

import { PokemonType } from 'src/app/types/Pokemon';
import { Subscription } from 'rxjs';
import { PokemonService } from 'src/app/service/pokemon.service';

export interface statusType {
  HP: number;
  Attack: number;
  Defense: number;
  'Sp. Attack': number;
  'Sp. Defense': number;
  Speed: number;
}

export interface PokemonId {
  id: number;
}

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnDestroy, OnInit {
  pokemon!: PokemonType;
  isShow: boolean = false;
  pawerText: number = 0;
  attackText: number = 0;
  defenseText: number = 0;
  speedText: number = 0;
  URLid: number = 0;
  isOK: boolean = false;
  localPoke = JSON.parse(localStorage.getItem('POKEMONS')!);
  selectPokemon = this.localPoke[this.URLid - 1];
  isType: string = '';
  subscription!: Subscription;
  initialPoke!: any;
  NewLocalPokemon: any;
  SubstPokemon: any;
  selectedType: string = '';
  isSearch: boolean = false;
  poke: any;

  newObj: statusType = {
    HP: this.pawerText,
    Attack: this.attackText,
    Defense: this.defenseText,
    'Sp. Attack': 0,
    'Sp. Defense': 0,
    Speed: this.speedText,
  };

  constructor(
    private pokemonService: PokemonService,
    private active: ActivatedRoute,
    private location: Location,
    private router: Router,
    private store: Store<{ sortStore: any }>
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getUrl();
    this.detailPoke();
    this.getState();
    this.getSubstPokemon();
    this.getObj();
  }
  goBack() {
    this.location.back();
  }
  isToggle() {
    this.isShow = !this.isShow;
  }

  getUrl() {
    this.subscription = this.active.paramMap.subscribe((map: ParamMap) => {
      this.URLid = Number(map.get('id'));
    });
  }
  detailPoke() {
    let newPoke = { ...this.localPoke[this.URLid - 1] };
    this.pokemon = newPoke;
    this.pawerText = newPoke.base.HP;
    this.attackText = newPoke.base.Attack;
    this.defenseText = newPoke.base.Defense;
    this.speedText = newPoke.base.Speed;
  }
  getState() {
    this.store.select('sortStore').subscribe((poke) => {
      this.initialPoke = poke.pokemons;
      this.isType = poke.isType;
      this.selectedType = poke.selectType;
      this.isSearch = poke.isSearch;
    });
  }

  getSubstPokemon() {
    this.subscription = this.store.select('sortStore').subscribe((poke) => {
      poke.isSearch === true ? (this.isSearch = true) : (this.isSearch = false);
      if (this.isSearch === true) {
        this.poke = poke.pokemons;
      } else {
        this.poke = JSON.parse(localStorage.getItem('POKEMONS')!);
      }
    });
  }
  getObj() {
    this.newObj = {
      HP: this.pawerText,
      Attack: this.attackText,
      Defense: this.defenseText,
      'Sp. Attack': 0,
      'Sp. Defense': 0,
      Speed: this.speedText,
    };
  }

  originalSort(arr: PokemonType[]) {
    arr.sort((a: PokemonType, b: PokemonType) => {
      const aValue = a.base[this.isType as keyof typeof a.base];
      const bValue = b.base[this.isType as keyof typeof b.base];
      return this.selectedType === 'upButton'
        ? bValue - aValue
        : aValue - bValue;
    });
  }

  sendPokemonName(arr: PokemonType[]) {
    return this.pokemonService.setSavePokemon(
      arr[this.URLid - 1].name.japanese
    );
  }
  searchResultSaveFunction() {
    console.log('検索され、リポケリストが表示されていた場合');
    let getLocalPokemon = localStorage.getItem('POKEMONS');
    let newLocalPoke = JSON.parse(getLocalPokemon!);
    newLocalPoke[this.URLid - 1].base = this.newObj;
    this.sendPokemonName(this.localPoke);
    let setPoke = JSON.stringify(newLocalPoke);
    localStorage.setItem('POKEMONS', setPoke);
    let replacePokemon = JSON.parse(setPoke);
    const newPokemonArray = replacePokemon.filter((item1: PokemonId) => {
      return this.poke.some((item2: PokemonId) => item1.id === item2.id);
    });
    this.originalSort(newPokemonArray);
    this.store.dispatch(
      sortPokemonAction({
        pokemon: newPokemonArray,
        isType: this.isType,
        selectType: this.selectedType,
        isSearch: this.isSearch,
      })
    );
    this.location.back();
  }
  sortResultSaveFunction() {
    console.log('並びかえまたは初期リストが表示されている場合');
    let newPoke = JSON.parse(JSON.stringify(this.poke));
    newPoke[this.URLid - 1].base = this.newObj;
    let localSavePokemon = JSON.stringify(newPoke);
    localStorage.setItem('POKEMONS', localSavePokemon);
    this.sendPokemonName(newPoke);
    let stringJson = JSON.stringify(newPoke);
    let pokemonSendAction = JSON.parse(stringJson);
    console.log(pokemonSendAction);
    if (!this.isType.length) {
      console.log('初期並びだけ発火');
      this.store.dispatch(
        sortPokemonAction({
          pokemon: pokemonSendAction,
          isType: this.isType,
          selectType: this.selectedType,
          isSearch: this.isSearch,
        })
      );
    }
    if (this.isType.length) {
      console.log('ステータス順で並び替えされた場合');
      this.sendPokemonName(newPoke);
      this.originalSort(newPoke);
      let JsonPokemon = JSON.stringify(newPoke);
      let pokemonSendAction = JSON.parse(JsonPokemon);
      console.log(newPoke);
      this.store.dispatch(
        sortPokemonAction({
          pokemon: pokemonSendAction,
          isType: this.isType,
          selectType: this.selectedType,
          isSearch: this.isSearch,
        })
      );
    }
    this.location.back();
  }

  saveButton() {
    this.getObj();
    this.getSubstPokemon();
    if (this.isSearch === true) {
      this.searchResultSaveFunction();
    } else {
      this.sortResultSaveFunction();
    }
  }

  // saveButton() {
  //   this.getObj();
  //   this.getSubstPokemon();
  //   if (this.isSearch === true) {
  //     console.log('検索され、リポケリストが表示されていた場合');
  //     let getLocalPokemon = localStorage.getItem('POKEMONS');
  //     let newLocalPoke = JSON.parse(getLocalPokemon!);
  //     newLocalPoke[this.URLid - 1].base = this.newObj;
  //     this.sendPokemonName(this.localPoke);
  //     let setPoke = JSON.stringify(newLocalPoke);
  //     localStorage.setItem('POKEMONS', setPoke);
  //     let replacePokemon = JSON.parse(setPoke);
  //     const newPokemonArray = replacePokemon.filter((item1: PokemonId) => {
  //       return this.poke.some((item2: PokemonId) => item1.id === item2.id);
  //     });
  //     this.originalSort(newPokemonArray);
  //     this.store.dispatch(
  //       sortPokemonAction({
  //         pokemon: newPokemonArray,
  //         isType: this.isType,
  //         selectType: this.selectedType,
  //         isSearch: this.isSearch,
  //       })
  //     );
  //     this.location.back();
  //   } else {
  //     console.log('並びかえまたは初期リストが表示されている場合');
  //     let newPoke = JSON.parse(JSON.stringify(this.poke));
  //     newPoke[this.URLid - 1].base = this.newObj;
  //     let localSavePokemon = JSON.stringify(newPoke);
  //     localStorage.setItem('POKEMONS', localSavePokemon);
  //     this.sendPokemonName(newPoke);
  //     let stringJson = JSON.stringify(newPoke);
  //     let pokemonSendAction = JSON.parse(stringJson);
  //     console.log(pokemonSendAction);
  //     if (!this.isType.length) {
  //       console.log('初期並びだけ発火');
  //       this.store.dispatch(
  //         sortPokemonAction({
  //           pokemon: pokemonSendAction,
  //           isType: this.isType,
  //           selectType: this.selectedType,
  //           isSearch: this.isSearch,
  //         })
  //       );
  //     }
  //     if (this.isType.length) {
  //       console.log('ステータス順で並び替えされた場合');
  //       this.originalSort(newPoke);
  //       this.sendPokemonName(newPoke);
  //       let stringJson = JSON.stringify(newPoke);
  //       let pokemonSendAction = JSON.parse(stringJson);
  //       this.store.dispatch(
  //         sortPokemonAction({
  //           pokemon: pokemonSendAction,
  //           isType: this.isType,
  //           selectType: this.selectedType,
  //           isSearch: this.isSearch,
  //         })
  //       );
  //     }
  //     this.location.back();
  //   }
  // }
}
