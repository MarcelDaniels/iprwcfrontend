import {Component, OnInit} from '@angular/core';
import {WinkelmandjeService} from "../../../services/winkelmandje.service";
import {WinkelmandjeStatusService} from "../../../services/winkelmandje-status.service";
import {Observable, Subscription} from "rxjs";
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../models/order.model";
import {Product} from "../../../models/product.model";
import {OrderItem} from "../../../models/order-item.model";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {ToastService} from "../../../services/toast-service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-winkelmand-overzicht',
  templateUrl: './winkelmand-overzicht.component.html',
  styleUrl: './winkelmand-overzicht.component.scss',
  providers : [OrderService, AuthService, ToastService]
})
export class WinkelmandOverzichtComponent implements OnInit{
  winkelmandje: Product[] = [];
  subtotaal: number = 0;
  userId: number;
  isError: boolean = false;
  toastType: string = '';
  constructor(private winkelmandjeService: WinkelmandjeService, private winkelmandjeStatusService: WinkelmandjeStatusService, private orderService : OrderService, private userService : UserService, public toastService : ToastService, private router : Router) {}

  ngOnInit(): void {
    this.winkelmandjeService.winkelmandje$.subscribe((winkelmandje) => {
      this.winkelmandje = winkelmandje;
      this.berekenSubtotaal();
    });
    this.userId = this.userService.getUserId();
  }

  private berekenSubtotaal(){
    let total = 0;
    for(const product of this.winkelmandje){
      total += product.prijs * product.aantalItems;
    }
    this.subtotaal = total;
  }

  leegWinkelmandje(): void {
    if (this.winkelmandjeService.isWinkelmandjeLeeg()) {
      this.toastType = 'error';
      this.isError = true;
      this.toastService.showOrUpdateToast("Het winkelmandje is leeg!", false, 'error');
    } else {
      this.winkelmandjeService.leegWinkelmandje();
      this.berekenSubtotaal();
    }
  }

  verwijderProduct(index: number) {
    if (index >= 0 && index < this.winkelmandje.length) {
      this.winkelmandje.splice(index, 1);
      this.winkelmandjeStatusService.updateAantalItems(this.winkelmandje.length);
      this.berekenSubtotaal();
      this.winkelmandjeStatusService.updateAantalItemsInWinkelmandje(this.winkelmandje);
    }
  }

  verhoogAantal(product: Product): void {
    const index = this.winkelmandje.findIndex(item => item.product_id === product.product_id);
    if (index !== -1) {
      this.winkelmandje[index].aantalItems++; // Verhoog de hoeveelheid met 1
      this.winkelmandjeStatusService.updateAantalItemsInWinkelmandje(this.winkelmandje);
      this.berekenSubtotaal();
    }
  }

  verlaagAantal(product: Product): void {
    const index = this.winkelmandje.findIndex(item => item.product_id === product.product_id);
    if (index !== -1) {
      if (product.aantalItems > 1) {
        this.winkelmandje[index].aantalItems--;
      } else {
        this.winkelmandje.splice(index, 1);
      }
      this.winkelmandjeStatusService.updateAantalItemsInWinkelmandje(this.winkelmandje);
      this.berekenSubtotaal();
    }
  }

  private mapWinkelmandjeToOrderItems(): Order[] {
    return this.winkelmandje.map(product => ({
      orderDate: new Date(),
      user_id: this.userId,
      quantity: product.aantalItems,
      product_name : product.naam,
      total_price : 0
    }));
  }
  placeOrder(): void {
    const order = this.mapWinkelmandjeToOrderItems();
    if(this.userId != undefined){
      this.orderService.placeOrder(order).subscribe(
        response => {
          this.toastType = 'success'
          this.isError = false;
          this.toastService.showOrUpdateToast("De order is geplaatst!", false, 'success');
          this.leegWinkelmandje();
        });
    }else {
      this.toastType = 'error'
      this.isError = true;
      this.toastService.showOrUpdateToast("Je moet inloggen voordat je iets kan bestellen!", false, 'error');
    }
  }
}
