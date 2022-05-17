import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import{adminproduct} from '../interface/admin.interface';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.scss']
})
export class NewproductComponent implements OnInit {


  description:string = '';
  price:string = '';
  productTitle:string ='';
  product_image:string = '';
  stockAvailability:boolean = false;
  display:any = 'offline';
  updateStatus = false;
  showMessage = 'none';
  errorMessage: any = '';



  constructor(private param: ActivatedRoute, private es:ProductService, private router:Router) { }

  addNew(){

    this.es.addNew(this.productTitle, this.product_image, this.description, this.price, this.stockAvailability, this.display).subscribe(products=>{
           if(products.insert){
             console.log("new item is added")

           }else{
             console.log(products.message);
           }
    })


  }

  ngOnInit(): void {
  }

}
