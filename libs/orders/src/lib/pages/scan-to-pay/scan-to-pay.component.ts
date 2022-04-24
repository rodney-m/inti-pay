import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-scan-to-pay',
  templateUrl: './scan-to-pay.component.html',
  styles: [
  ]
})
export class ScanToPayComponent implements OnInit {
  qrInfo : any;
  constructor(private cartService : CartService, private router : Router, private activateRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this._getOrderData()
  }

  private _getOrderData(){
    this.cartService.cart$.subscribe((cart) => {
      this.qrInfo = JSON.stringify(cart.items)
    })
  }

  navigateToCheckout(){
    this.router.navigate(['checkout'])
  }

}
