import { Component, Input, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: `./header.component.html`,
})
export class HeaderComponent implements OnInit {
  //private means only in the ts file and public would mean the ts and the HTML file
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }
  set cart(cart: Cart) {
    this._cart = cart;
    // this takes the cart objects and the map turns it into all quantities of the this.itemsQuantity, then the reduce adds them all together to get the itemsQuantity.
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
}
