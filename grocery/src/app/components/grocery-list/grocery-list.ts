import {Component, inject, signal} from '@angular/core';
import {Grocery} from '../../types/grocery.interface';
import {GroceryService} from '../../services/grocery.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-grocery-list',
  imports: [FormsModule],
  templateUrl: './grocery-list.html',
  styleUrl: './grocery-list.css'
})
export class GroceryList {
  protected readonly groceryService = inject(GroceryService);

  protected readonly title = signal('Grocery List');
  protected readonly newItemName = signal('');
  protected readonly newItemQuantity = signal<number>(0);

  addItem(): void {
    const itemName = this.newItemName().trim();
    const itemQuantity = this.newItemQuantity();

    if(itemName && itemQuantity && itemQuantity > 0) {
      this.groceryService.addItem(itemName, itemQuantity);

      this.newItemName.set('');
      this.newItemQuantity.set(0);
    }
  }
}
