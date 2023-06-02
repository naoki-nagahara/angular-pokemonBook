import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/service/pokemon.service';
import { PokemonType } from 'src/app/types/Pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent {
  pokemon?: PokemonType;
  constructor(
    private active: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getUrl();
  }
  goBack() {
    this.location.back();
  }
  getUrl() {
    this.active.paramMap.subscribe((map) => {
      const id = Number(map.get('id'));
      this.pokemonService.getPokemon().subscribe((poke) => {
        this.pokemon = poke[id - 1];
        console.log(this.pokemon);
      });
    });
  }
}
