import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeService {
  isShow: boolean = false;
  shareImage: any;
  selectValue: string = '';
  constructor() {}

  private reloadAppSubject = new Subject<boolean>();
  //画像パスを取得・変更する処理
  getShareImage() {
    return this.shareImage;
  }
  setShareImage(val: any) {
    this.shareImage = val;
  }

  //データの流れを任意のタイミングに行えるようにする処理
  setReload(val: boolean) {
    this.reloadAppSubject.next(val);
  }
  ReloadApp(): Observable<any> {
    return this.reloadAppSubject.asObservable();
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
