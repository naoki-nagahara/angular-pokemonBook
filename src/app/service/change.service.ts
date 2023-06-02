import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeService {
  isShow: boolean = false;
  constructor() {}
  shareImage: any;
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
}
