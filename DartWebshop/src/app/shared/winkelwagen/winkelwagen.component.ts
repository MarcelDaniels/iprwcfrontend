import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {WinkelmandjeStatusService} from "../../services/winkelmandje-status.service";
import {WinkelmandjeService} from "../../services/winkelmandje.service";

@Component({
  selector: 'app-winkelwagen',
  templateUrl: './winkelwagen.component.html',
  styleUrls: ['./winkelwagen.component.scss']
})
export class WinkelwagenComponent implements OnInit {
  aantalItemsInWinkelmandje: Observable<number>;
  aantalItemsInWinkelmandje2: number = 0;
  constructor(public winkelmandjeStatusService: WinkelmandjeStatusService, private winkelmandjeService: WinkelmandjeService) {}

  ngOnInit(): void {
    this.aantalItemsInWinkelmandje = this.winkelmandjeStatusService.aantalItems$;
    this.winkelmandjeService.winkelmandje$.subscribe((winkelmandje) => {
      this.winkelmandjeStatusService.updateAantalItemsInWinkelmandje(winkelmandje)
    });
  }
}
