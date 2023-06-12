import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeService {
  isShow: boolean = false;
  shareImage: any;
  selectValue: string = '';
  constructor() {}

  //画像パスを取得・変更する処理
  getShareImage() {
    return this.shareImage;
  }
  setShareImage(val: any) {
    this.shareImage = val;
  }

  onSelect(isTypes: string) {
    switch (isTypes) {
      case 'HP':
        this.selectValue = 'HP';
        break;
      case 'Attack':
        this.selectValue = '攻撃';
        break;
      case 'Defense':
        this.selectValue = '防御';
        break;
      case 'Speed':
        this.selectValue = 'スピード';
        break;
    }
  }
}
