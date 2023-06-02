import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoreApp } from './pokemon.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  image$?: Observable<StoreApp>;
  isColor$?: Observable<StoreApp>;
  isBool$?: Observable<StoreApp>;
  Show: Boolean = true;
  theme = '';
  imageUrl?: string;

  constructor(private store: Store<{ store: StoreApp }>) {
    this.image$ = this.store.select('store');
    this.image$!.subscribe((url: StoreApp) => (this.imageUrl = url.url));
    this.isColor$ = this.store.select('store');
    this.isColor$.subscribe((val) => (this.theme = val.theme));

    if (localStorage.length) {
      this.imageUrl = localStorage.getItem('bgImage')!;
      this.theme = localStorage.getItem('Theme')!;
      return;
    } else {
      localStorage.setItem('bgImage', this.imageUrl!);
      localStorage.setItem('Number', String(1));
      localStorage.setItem('Theme', this.theme);
    }
  }
  ngOnInit() {}
}

//発火のトリガーは別の関数で真偽値で決めて、それを判定にして変わったタイミングで
//関数を実行できるようにする。
//appcomponentのngInitは最初のタイミングで走るので、後ろで強制的に走らせる処理をしなくてはだめ。
// this.shareService.ReloadApp().subscribe((isSet) => {
//   if (isSet) {
//     //クリックされたから、setReloadがtureになり、この処理が走る
//     this.imageUrl = this.shareService.getShareImage();
//   }
// });
