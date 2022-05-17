import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { adminproduct } from '../interface/admin.interface';
import { edit } from '../interface/edit.interface';
import { Deletedata } from '../interface/delete.interface';



interface Login{
  login: boolean;
  message: string;
  data: [
    {
      ID: any;
      UserID:number;
      email:string;
      password:string;
    }
  ]
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // editProduct: any;
  // getProductId: any;
  addNewProduct(description: string, price: string, productTitle: any, product_image: string, arg4: any) {
    throw new Error('Method not implemented.');
  }

  // url = "http://localhost:4600/productsapi";
  private urlsp = "http://localhost:4600/productssp";
  private loginURL = "http://localhost:4600/login";
  private adminURL = "http://localhost:4600/admin";
  private editURL = "http://localhost:4600/edit";

  private deleteURL = "http://localhost:4600/deleteproduct";
  private addproductURL ="http://localhost:4600/addnewproduct";
  private onlineproductsURL =" http://localhost:4600/onlineproducts";


  constructor(private eshttp:HttpClient) { }

  // I created addnewproducts here
  addNew(productTitle:string,
         product_image:string,
         description:string,
         price:string,
         stockAvailability:boolean,
         display:string){

    let addBody={
      "productTitle": productTitle,
      "product_image":product_image,
      "description": description,
      "price":price,
      "stockAvailability":stockAvailability,
      "display":display

    }
    return this.eshttp.post<{message:string, insert:boolean}>(this.addproductURL, addBody);
  }

  //will return the observable
  getAllProducts(){
    return this.eshttp.get<adminproduct[]>(this.urlsp);

  }

  // there was no method for selecting items by id so I created one here and I used this in edit component so that only selected item will be displayed.
  getProductsById(id:number){
    return this.eshttp.get<adminproduct>(this.urlsp + "/" + id);
  }

  loginService(email:string, password:string){
    let loginBody = {
      email: email,
      password: password
    }
    return this.eshttp.post<Login>(this.loginURL, loginBody);
  }

  // getAlladminProducts(){
  //   return this.eshttp.get<adminproduct[]>(this.adminURL);

  // }




editProducts(description:string,ID:any,price:string,productTitle:string,product_image:string,stockAvailability:boolean, display:string){
  let editBody ={

    "description":description,
    "ID":ID,
    "price":price,
    "productTitle":productTitle,
    "product_image":product_image,
    "stockAvailability":stockAvailability,
    "display":display

    }
    return this.eshttp.put<{ edit:boolean, message:any  }>(this.editURL, editBody);
  }

  // editDisplay(ID: any, display: string) {
  //   let editdisplaybody = {
  //     ID: ID,
  //     display:display
  //   }
  //   return this.eshttp.put<editDisplay>(this.editdisplayURL, editdisplaybody)
  // }


  deleteProduct(id: number) {
    return this.eshttp.delete<{deletedbyID:boolean, message:string}>(this.deleteURL+ '/' +id)
  }

  onlineproducts(){
    return this.eshttp.get<adminproduct[]>(this.onlineproductsURL);

  }



}
