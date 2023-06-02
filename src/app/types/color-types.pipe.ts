import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorTypes',
})
export class ColorTypesPipe implements PipeTransform {
  ngColor: { [key: string]: number } = {
    normal: 0xffa8a7,
    electric: 0xdede22,
    fire: 0xe13c3c,
    water: 0x5656e1,
    bug: 0x70ec70,
    grass: 0x23e623,
    ice: 0xff96d9,
    fighting: 0xffc22e,
    poison: 0x993999,
    ground: 0xffe2bf,
    flying: 0xffa98f,
    psychic: 0xfff955,
    rock: 0xffb6a1,
    ghost: 0xff7357,
    dragon: 0xff6f35,
    dark: 0xff7057,
    steel: 0xffb7b7,
    fairy: 0xffd685,
  };

  transform(types: string[]): string {
    let colorCode = '';
    for (const type of types) {
      const code = this.ngColor[type.toLowerCase()];
      if (code) {
        colorCode = `#${code.toString(16)}`;
        break;
      }
    }
    return colorCode;
  }
}
