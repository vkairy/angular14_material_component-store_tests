import { Component, OnInit } from '@angular/core';
import { WarrantyStore } from './warranty.store';

@Component({
  selector: 'warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.css'],
  providers: [WarrantyStore],
})
export class WarrantyComponent {
  public warrantyInfo$ = this.warrantyStore.warrantyInfo$;

  constructor(private warrantyStore: WarrantyStore) {}

  public fetchWarrantyInfo() {
    this.warrantyStore.getWarrantyInfo();
  }
}
