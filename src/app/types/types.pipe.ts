import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'types',
})
export class TypesPipe implements PipeTransform {
  pokemonType: { [key: string]: string } = {
    Normal: 'ノーマル',
    Electric: 'でんき',
    Fire: 'ほのお',
    Water: 'みず',
    Bug: 'むし',
    Grass: 'くさ',
    Ice: 'こおり',
    Fighting: 'かくとう',
    Poison: 'どく',
    Ground: 'じめん',
    Flying: 'ひこう',
    Psychic: 'エスパー',
    Rock: 'いわ',
    Ghost: 'ゴースト',
    Dragon: 'ドラゴン',
    Dark: 'やみ',
    Steel: 'はがね',
    Fairy: 'フェアリー',
  };
  transform(types: string[], ...args: any[]): any {
    return types.map((type) => this.pokemonType[type] || type);
  }
}
