import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {apiURL} from "../../constants";
import {ProductService} from "../../services/product-service";
import {Product} from "../../models/product.model";
import {GetAllProductsService} from "../../services/get-all-products.service";
import {ToastService} from "../../services/toast-service";
import {forkJoin, mergeMap} from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  providers: [AuthService, ProductService, GetAllProductsService, ToastService]
})
export class AdminComponent implements OnInit{
  products : any = [];
  product : Product;
  selectedProduct: Product;
  deletionFeedback: string;
  confirmFeedback: string;
  newProduct: Product = {
    naam: '',
    prijs: 0,
    beschrijving: '',
    voorraad: 0,
    categorie_id: 0,
    afbeelding: '',
    aantalItems : 0
  };
  isError: boolean = false;
  toastType: string = '';
  constructor(private productService : ProductService, private getDartService : GetAllProductsService, public toastService: ToastService) {}

  ngOnInit() {
    this.getProducts()
  }

  onSubmit() {
    console.log(this.newProduct.naam)
    if(this.newProduct.prijs >= 0 && this.newProduct.voorraad >= 0 && this.newProduct.naam != "" && this.newProduct.afbeelding != ""){
      this.productService.addProduct(this.newProduct).subscribe(() => {
        this.toastType = 'success'
        this.toastService.showOrUpdateToast("Het nieuwe product is toegevoegd!", false, 'success');
        this.newProduct = {
          naam: '',
          prijs: 0,
          beschrijving: '',
          voorraad: 0,
          categorie_id: 0,
          afbeelding: '',
          aantalItems: 0
        };
      }, error => {
        this.toastType = 'error'
        this.isError = true;
        this.toastService.showOrUpdateToast("Er is een fout opgetreden bij het toevoegen van het product.", true, 'error');
      });
    } else {
      this.toastType = 'error'
      this.isError = true;
      this.toastService.showOrUpdateToast("Je mag geen vak leeg laten", true, 'error');
    }
  }

  getProducts(): void {
    this.getDartService.getAllDarts().pipe(
        mergeMap(darts => {
          this.products = darts;
          return forkJoin([
            this.getDartService.getAllBoards(),
            this.getDartService.getAllSurrounds()
          ]);
        })
    ).subscribe({
      next: ([boards, surrounds]) => {
        this.products = this.products.concat(boards, surrounds);
      },
      error: (error) => {
      }
    });
  }

  onDeleteSelected(): void {
    if (!this.selectedProduct) {
      this.toastType = 'error';
      this.isError = true;
      this.toastService.showOrUpdateToast("Selecteer eerst een product om te verwijderen.", true, 'error');
      return;
    }
    this.productService.deleteProduct(this.selectedProduct)
      .subscribe(() => {
        this.toastType = 'success'
        this.isError = false
        this.toastService.showOrUpdateToast("Het product is verwijderd!", false, 'success');
      }, error => {
        this.toastType = 'error'
        this.toastService.showOrUpdateToast("Er is een fout opgetreden bij het verwijderen van het product.", true, 'error');
  });
  }
}
