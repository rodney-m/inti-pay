import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import {BadgeModule} from 'primeng/badge';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import {InputNumberModule} from 'primeng/inputnumber';


import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { QRCodeModule } from 'angular2-qrcode';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuard } from '@bluebits/users';
import { ScanToPayComponent } from './pages/scan-to-pay/scan-to-pay.component';

const routes :Routes = [
  {
    path : 'cart',
    component: CartPageComponent
  },
  {
    path : 'checkout',
    component: CheckoutPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'pay',
    component: ScanToPayComponent,
   
  },
  {
    path : 'success',
    component: ThankYouComponent
  }
]
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    BadgeModule, 
    ButtonModule, 
    InputNumberModule,
    ToastModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    ReactiveFormsModule, 
    RouterModule.forChild(routes),
    QRCodeModule
  ],
  declarations: [CartIconComponent, CartPageComponent, OrderSummaryComponent, CheckoutPageComponent, ThankYouComponent, ScanToPayComponent],
  exports: [CartIconComponent, CartPageComponent, OrderSummaryComponent, CheckoutPageComponent, ThankYouComponent, ScanToPayComponent, ],
})
export class OrdersModule {
  constructor(cartService: CartService){
    cartService.innitCartLocalStorage();
  }
}
