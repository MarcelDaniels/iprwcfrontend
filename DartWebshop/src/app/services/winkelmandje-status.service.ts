import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class WinkelmandjeStatusService {
  private aantalItemsSubject = new BehaviorSubject<number>(0);
  aantalItems$ = this.aantalItemsSubject.asObservable();

  constructor() {}

  updateAantalItems(aantal: number): void {
    this.aantalItemsSubject.next(aantal);
  }
  updateAantalItemsInWinkelmandje(producten: Product[]): void {
    let totalItems = 0;
    for (const product of producten) {
      totalItems += product.aantalItems;
    }
    this.updateAantalItems(totalItems);
  }
}
