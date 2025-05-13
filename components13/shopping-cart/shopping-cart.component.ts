import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { OrderService } from '../../services/order.service';
import { Order } from '../../types/order';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core'; // Enables UI updates

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  cartService = inject(CartService);
  formbuilder = inject(FormBuilder);
  orderService = inject(OrderService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef); // Enables manual UI updates

  orderStep: number = 0;
  paymentType = 'cash';

  ngOnInit() {
    this.cartService.init();
  }

  get cartItems() {
    return this.cartService.items;
  }

  sellingPrice(product: Product) {
    return Math.round(product.price - (product.price * product.discount) / 100);
  }

  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe(() => {
      this.cartService.init();
      this.cdr.detectChanges(); // Ensures UI updates dynamically
    });
  }

  get totalAmmount(): number {
    return this.cartItems.reduce((sum, item) => {
      return sum + this.sellingPrice(item.product) * item.quantity;
    }, 0);
  }

  addressForm = this.formbuilder.group({
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    city: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]],//VALIDATION DONE
    pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]], // Only accepts 6-digit numbers
  });

  get pincodeError() {
    const control = this.addressForm.get('pincode');
    if (control?.hasError('required')) return 'Pincode is required.';
    if (control?.hasError('pattern')) return 'Enter a valid 6-digit number.';
    return '';
  }

  checkout() {
    if (this.totalAmmount > 0) {
      this.orderStep = 1;
    }
  }

  addAddress() {
    this.orderStep = 2;
  }

  completeOrder() {
    if (this.addressForm.valid) {
      let order: Order = {
        items: this.cartItems,
        paymentType: this.paymentType,
        address: this.addressForm.value,
        date: new Date(),
      };
      this.orderService.addOrder(order).subscribe(() => {
        alert('Your order is completed');
        this.cartService.init();
        this.orderStep = 0;
        this.router.navigateByUrl('/orders');
        this.cdr.detectChanges(); // Ensures UI refresh after order completion
      });
    }
  }
}
