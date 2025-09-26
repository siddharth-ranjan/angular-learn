import { Injectable, signal } from '@angular/core';
import { Grocery } from '../types/grocery.interface';

@Injectable({
  providedIn: 'root'
})

export class GroceryService {
  readonly items = signal<Grocery[]>([]);

  constructor(){}

  addItem(newItemName: string, newItemQuantity: number): void {

    if(newItemName && newItemQuantity > 0) {
      this.items.update(items=> {
        let isDuplicate = false;

        isDuplicate = items.some(it => it.name === newItemName)
        if(!isDuplicate) {
          let newItem: Grocery = {
            id: Date.now(),
            name: newItemName,
            quantity: newItemQuantity,
            bought: false
          };

          return [...items, newItem];
        }
        console.log("Task already exists!");
        return items;
      })
    }
    console.log("Input error!");
  }

  toggleItem(id: number):void {
    this.items.update(items =>
      items.map(item =>
        item.id === id ? {...item, bought: !item.bought} : item
      )
    );
  }

  deleteItem(id: number):void {
    this.items.update(items => items.filter(item => item.id !== id));
  }

  get boughtCount() {
    return this.items().filter(it => it.bought).length;
  }

  get totalCount() {
    return this.items().length;
  }
}
