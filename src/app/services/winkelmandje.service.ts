import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {WinkelmandjeStatusService} from "./winkelmandje-status.service";

@Injectable({
  providedIn: 'root'
})
export class WinkelmandjeService {
  private winkelmandjeSubject = new BehaviorSubject<any[]>([]);

  winkelmandje$ = this.winkelmandjeSubject.asObservable();


  constructor(private winkelmandjeStatusService: WinkelmandjeStatusService) {}

  voegToeAanWinkelmandje(item: any): void {
    const huidigWinkelmandje = this.winkelmandjeSubject.value;
    const existingItemIndex = huidigWinkelmandje.findIndex(i => i.product_id === item.product_id);

    if (existingItemIndex !== -1) {
      const nieuwWinkelmandje = huidigWinkelmandje.map((i, index) => {
        if (index === existingItemIndex) {
          return { ...i, aantalItems: i.aantalItems + 1 };
        }
        return i;
      });
      this.winkelmandjeSubject.next(nieuwWinkelmandje);
      this.winkelmandjeStatusService.updateAantalItemsInWinkelmandje(nieuwWinkelmandje);
    } else {
      const nieuwItem = { ...item, aantalItems: 1 };
      const nieuwWinkelmandje = [...huidigWinkelmandje, nieuwItem];
      this.winkelmandjeSubject.next(nieuwWinkelmandje);
      this.winkelmandjeStatusService.updateAantalItemsInWinkelmandje(nieuwWinkelmandje);
    }
  }

  leegWinkelmandje(): void {
    this.winkelmandjeSubject.next([]);
    this.winkelmandjeStatusService.updateAantalItems(0);
  }
  isWinkelmandjeLeeg(): boolean {
    return this.winkelmandjeSubject.value.length === 0;
  }
}
