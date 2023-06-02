import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../types/item';
import { BALLS } from '../api/item/ball';
import { TREE } from '../api/item/tree';
import { MACHINE } from '../api/item/machine';
import { REPAIR } from '../api/item/repair';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor() {}
  dataMap = {
    BALLS: BALLS,
    TREE: TREE,
    MACHINE: MACHINE,
    REPAIR: REPAIR,
  };
  getItemData(dataName: string): Observable<Item[]> {
    const data = (this.dataMap as any)[dataName];
    if (data) {
      return of(data);
    } else {
      return of([]);
    }
  }
}
