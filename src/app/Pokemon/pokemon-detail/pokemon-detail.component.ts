import { JsonPipe, Location } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/service/pokemon.service';
import { PokemonType } from 'src/app/types/Pokemon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';

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
  constructor(private active: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.getUrl();
    this.detailPoke();
  }
  goBack() {
    this.location.back();
  }

  localPoke = JSON.parse(localStorage.getItem('POKEMONS')!);
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
    if (this.isOK) {
      return;
    } else {
      this.location.back();
      this.newObj = {
        HP: this.pawerText,
        Attack: this.attackText,
        Defense: this.defenseText,
        'Sp. Attack': 0,
        'Sp. Defense': 0,
        Speed: this.speedText,
      };
      this.localPoke[this.URLid - 1].base = this.newObj;
      console.log(this.localPoke[this.URLid - 1]);
      let newLocalPoke = JSON.stringify(this.localPoke);
      localStorage.setItem('POKEMONS', newLocalPoke);
    }
  }
}
