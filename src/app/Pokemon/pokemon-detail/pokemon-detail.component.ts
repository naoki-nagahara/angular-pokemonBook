import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { searchPokemonAction, sortPokemonAction } from 'src/app/pokemon.action';
import { ChangeService } from 'src/app/service/change.service';
import { PokemonService } from 'src/app/service/pokemon.service';
import { PokemonType } from 'src/app/types/Pokemon';

export interface statusType {
  HP: number;
  Attack: number;
  Defense: number;
  'Sp. Attack': number;
  'Sp. Defense': number;
  Speed: number;
}

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent {
  pokemon!: PokemonType;
  isShow = false;
  pawerText = 0;
  attackText = 0;
  defenseText = 0;
  speedText = 0;
  URLid: number = 0;
  isOK: boolean = false;
  localPoke = JSON.parse(localStorage.getItem('POKEMONS')!);
  selectPokemon = this.localPoke[this.URLid - 1];
  isType = '';

  newObj: statusType = {
    HP: this.pawerText,
    Attack: this.attackText,
    Defense: this.defenseText,
    'Sp. Attack': 0,
    'Sp. Defense': 0,
    Speed: this.speedText,
  };

  constructor(
    private active: ActivatedRoute,
    private location: Location,
    private pokemonService: PokemonService,
    private changeService: ChangeService,
    private router: Router,
    private store: Store<{ sortStore: any }>
  ) {}

  ngOnInit() {
    this.getUrl();
    this.detailPoke();
    this.getState();
  }
  goBack() {
    this.location.back();
  }
  isToggle() {
    this.isShow = !this.isShow;
  }

  getUrl() {
    this.active.paramMap.subscribe((map) => {
      this.URLid = Number(map.get('id'));
    });
  }
  detailPoke() {
    let newPoke = this.localPoke[this.URLid - 1];
    this.pokemon = newPoke;
    this.pawerText = newPoke.base.HP;
    this.attackText = newPoke.base.Attack;
    this.defenseText = newPoke.base.Defense;
    this.speedText = newPoke.base.Speed;
    console.log(this.pawerText);
  }
  initialPoke!: any;
  getState() {
    this.store.select('sortStore').subscribe((poke) => {
      this.initialPoke = poke.pokemons;
      this.isType = poke.isType;
    });
    console.log(this.initialPoke);
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
    console.log(this.newObj);
  }
  saveButton() {
    console.log(this.detailPoke());
    // this.store.dispatch(
    //   searchPokemonAction({ pokemon: this.initialPoke, isType: '' })
    // );
    this.location.back();
    console.log(this.getObj());
  }

  saveButto() {
    this.detailPoke();
    this.getObj();

    let getPoke = this.initialPoke[this.URLid - 1].base;
    let pokeURL = this.localPoke[this.URLid - 1];
    pokeURL.base = this.newObj;
    getPoke = this.newObj;
    let newLocalPoke: string = JSON.stringify(this.localPoke);
    let setPoke = JSON.parse(newLocalPoke);
    localStorage.setItem('POKEMONS', newLocalPoke);
    this.pokemonService.setSavePokemon(pokeURL.name.japanese);
    this.store.dispatch(
      sortPokemonAction({ pokemon: this.initialPoke, isType: this.isType })
    );
    this.location.back();
    // window.history.back();
    //変更後のstateに戻る処理が必要
  }
}
//sortの処理も共通化させる

/*
detail画面を開いたとき、storの情報を取得。
現在　store取得　戻るボタンをおしたら、dispatchして更新後の画面を渡して、画面を更新する
stateの
*/

/*
detailページの役割
詳細を表示する
ステータスを変更できるようにする
変更して保存ボタンを押すと、すぐに画面が変更されている状態にする
sortして表示した画面で、ステータスを変更した場合、保存ボタンを押したら変更値を含めたsort後の状態にする
 *  */
