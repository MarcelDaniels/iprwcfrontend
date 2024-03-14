export interface Product {
  product_id?: number;
  naam: string;
  prijs: number;
  beschrijving: string;
  voorraad: number;
  categorie_id: number;
  afbeelding: string;
  aantalItems?: number;
}
