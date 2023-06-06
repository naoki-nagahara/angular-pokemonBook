import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  newObj: statusType = {
    HP: this.pawerText,
    Attack: this.attackText,
    Defense: this.defenseText,
    'Sp. Attack': 0,
    'Sp. Defense': 0,
    Speed: this.speedText,
  };
  localPoke = JSON.parse(localStorage.getItem('POKEMONS')!);

  constructor(
    private active: ActivatedRoute,
    private location: Location,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.getUrl();
    this.detailPoke();
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
  }

  saveButton() {
    let pokeURL = this.localPoke[this.URLid - 1];

    this.newObj = {
      HP: this.pawerText,
      Attack: this.attackText,
      Defense: this.defenseText,
      'Sp. Attack': 0,
      'Sp. Defense': 0,
      Speed: this.speedText,
    };
    pokeURL.base = this.newObj;
    let newLocalPoke = JSON.stringify(this.localPoke);
    localStorage.setItem('POKEMONS', newLocalPoke);
    this.pokemonService.setSavePokemon(pokeURL.name.japanese);
    this.location.back();
  }
}
