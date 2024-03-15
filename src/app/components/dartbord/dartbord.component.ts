import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {WinkelmandjeService} from "../../services/winkelmandje.service";

import {AuthService} from "../../services/auth.service";
import {GetAllProductsService} from "../../services/get-all-products.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dartbord',
  templateUrl: './dartbord.component.html',
  styleUrl: './dartbord.component.scss',
    providers: [GetAllProductsService, AuthService, HttpClient]
})
export class DartbordComponent implements OnInit{
    dartboards : Product[] = [];
  constructor(private winkelmandjeService: WinkelmandjeService, private getProductsService : GetAllProductsService, private authService : AuthService) {}

    ngOnInit() {
        this.getBoards();
    }
    getBoards(){
        this.getProductsService.getAllBoards().subscribe((dartboards) => {
            this.dartboards = dartboards;
        });
    }

    addToCart(board: Product): void {
        if (board && board.naam) {
            this.winkelmandjeService.voegToeAanWinkelmandje(board);
        } else {
            console.error('Ongeldig dartobject. Kan niet aan winkelmandje toevoegen.');
        }
    }
}
