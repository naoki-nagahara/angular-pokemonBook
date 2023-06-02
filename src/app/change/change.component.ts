import { Component } from '@angular/core';
import { IMGLIST } from '../api/imgList';
import { ChangeService } from '../service/change.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoreApp } from '../pokemon.reducer';
import { changeAction } from '../pokemon.action';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css'],
})
export class ChangeComponent {
  isSelect: Boolean = false;
  isBool$?: Observable<StoreApp>;
  int?: number;
  initNumber$?: Observable<StoreApp>;
  newId$?: Observable<StoreApp>;
  img$?: Observable<{ url: string }>;
  imgList = IMGLIST;
  InitialNumber?: number;

  constructor(private store: Store<{ store: StoreApp }>) {}

  ngOnInit() {
    let get = localStorage.getItem('Number');
    this.int = Number(get);
  }

  ImageTheme: ('white' | 'dark' | 'middle')[] = [
    'white',
    'dark',
    'white',
    'dark',
    'dark',
    'middle',
  ];

  change(id: number) {
    localStorage.setItem('Number', String(id));
    let get = localStorage.getItem('Number');
    this.int = Number(get);

    let images = document.querySelectorAll('img');
    let img = images[id - 1].getAttribute('src')!;
    localStorage.setItem('bgImage', img);
    let isColor = this.ImageTheme[id - 1];
    localStorage.setItem('Theme', isColor);
    this.store.dispatch(
      changeAction({
        val: localStorage.getItem('bgImage')!,
        colorTheme: isColor,
        ImageNumber: this.int,
      })
    );
  }
}

// select(id: number) {
//   let items = document.querySelectorAll('.itemImg');
//   let imgSrc = document.querySelectorAll('img');
//   let sendImg = imgSrc[id - 1].getAttribute('src');
//   this.shareService.setShareImage(sendImg);
//   this.shareService.setReload(true);
//   items.forEach((item) => {
//     item.classList.remove('active');
//   });
//   items[id - 1].classList.add('active');
// }
// if (!itemImage[id - 1].classList.contains('isSelected')) {
//   itemImage.forEach((i) => i.classList.remove('isSelected'));
//   itemImage[id - 1].classList.add('isSelected');
// }
