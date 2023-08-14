import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: `./cart.component.html`,
  styles: [],
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: "Snickers",
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "Snickers",
        price: 150,
        quantity: 2,
        id: 2,
      },
    ],
  };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  onClearCart(): void {
    this.cartService.clearCart();
  }
  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }
  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }
  onCheckout(): void {
    this.httpClient
      .post("storefront-production.up.railway.app/checkout", {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          "pk_test_51NeU7MGjkBMNCi0jYFJGpLPWLZ5ahlBI1wvWK9HejeJEdGqSaduhchTS7O3xkF5Eovi5fOItuSMVj0szXZustckF00jnDJ5iyn"
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
