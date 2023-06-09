import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { searchPokemonAction, sortPokemonAction } from 'src/app/pokemon.action';
import { ChangeService } from 'src/app/service/change.service';
import { PokemonService } from 'src/app/service/pokemon.service';
import { PokemonType } from 'src/app/types/Pokemon';
import { Subscription } from 'rxjs';

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
export class PokemonDetailComponent implements OnDestroy, OnInit {
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
  subscription!: Subscription;
  initialPoke!: any;
  NewLocalPokemon: any;
  SubstPokemon: any;

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
    this.subscription = this.active.paramMap.subscribe((map) => {
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
    console.log(this.pokemon.base, '編集前のオブジェクトデータ');
  }
  getState() {
    this.store.select('sortStore').subscribe((poke) => {
      this.initialPoke = poke.pokemons;
      this.isType = poke.isType;
    });
    console.log(this.initialPoke, 'STOREの出力結果');
  }

  getSubstPokemon() {
    this.subscription = this.pokemonService.getPokemon().subscribe((poke) => {
      this.SubstPokemon = poke;
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
    console.log(this.newObj, '書き換えられたOBJ');
  }

  // saveButton() {
  //   this.getObj();
  //   console.log(this.newObj, '新しい値が入ったOBJ');
  //   let a: any = [...this.initialPoke];
  //   console.log(a[this.URLid - 1]);
  //   a[this.URLid - 1].base = { ...a[this.URLid - 1] } = this.newObj;
  //   console.log(a);
  // }
  //クリックしたら反映させて、sort処理も実行する

  saveButton() {
    this.getObj();

    // let newLocalPoke: string = JSON.stringify(this.localPoke);
    // let setPoke = JSON.parse(newLocalPoke);
    // localStorage.setItem('POKEMONS', newLocalPoke);
    // this.pokemonService.setSavePokemon(pokeURL.name.japanese);
    // this.store.dispatch(
    //   sortPokemonAction({ pokemon: this.initialPoke, isType: this.isType })
    // );
    // this.location.back();
  }
}
//コピー先を意識、シャローコピーをするとコピー元はどうなるか？それで値が変更されている場合があり
//一段階まで。シャローコピー
/*
詳細表示 => テキスト編集 => local保存　=>
詳細表示 => テキスト編集 => dispatch 　=>
*/
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

//ディープコピー裏技
// const object = {
//   name: "apple",
//   like: {
//     food: "かぼちゃ"
//   }
// };
// const newObject = JSON.parse(JSON.stringify(object));

// newObject.name = "banana";
// newObject.like.food = "魚";

// console.log(object);
// console.log(newObject);
