import { Component } from '@angular/core';
import { ItemService } from 'src/app/service/item.service';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent {
  balls?: Item[];
  trees?: Item[];
  machines?: Item[];
  repairs?: Item[];
  constructor(private itemService: ItemService) {}
  ngOnInit() {
    this.getItemBall();
    this.getItemMachine();
    this.getItemRepair();
    this.getItemTree();
  }

  getItemBall() {
    this.itemService.getItemData('BALLS').subscribe((item) => {
      this.balls = item;
    });
  }
  getItemTree() {
    this.itemService.getItemData('TREE').subscribe((item) => {
      this.trees = item;
    });
  }
  getItemRepair() {
    this.itemService.getItemData('REPAIR').subscribe((item) => {
      this.repairs = item;
    });
  }
  getItemMachine() {
    this.itemService.getItemData('MACHINE').subscribe((item) => {
      this.machines = item;
    });
  }
}
