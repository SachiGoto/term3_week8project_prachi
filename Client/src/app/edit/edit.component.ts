import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import{adminproduct} from '../interface/admin.interface';




@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  product:adminproduct;

  constructor(private param: ActivatedRoute, private es:ProductService, private router:Router) { }

  description:string = '';
  price:string = '';
  title:string ='';
  image:string = '';
  stockAvailability:boolean = false;
  display:string = 'offline';
  updateStatus = false;
  showMessage = 'none';
  errorMessage: any = '';


  // toggleBtn(){
  //   // console.log("clicked");
  //   console.log(this.display);

  //   if(this.display == "offline"){
  //     this.display = "online"
  //   }else{
  //     this.display = "offline";

  //   }

  // }


  edit(){

    let ID:any = this.param.snapshot.paramMap.get("id");
    console.log("id is " + ID)
    console.log(this.display)
    // this case, id is coming from the url so no need to deslare id variable.
    this.es.editProducts(this.description, ID, this.price, this.title,this.image, this.stockAvailability, this.display).subscribe(editConfirmation=>{
      if(editConfirmation.edit){
        // this.router.navigate(['/admin']);
        console.log(editConfirmation.edit);
        }



    })








    // let ID: any = localStorage.getItem("photoUserID");
    // this.es.editProduct(this.description,ID,this.price,this.productTitle,this.product_image,this.stockAvailability).subscribe( editConfirmation =>{
    //   console.log(editConfirmation.edit);
    //   this.updateStatus = editConfirmation.edit;
    //   this.showMessage = 'block';
    //   this.errorMessage = editConfirmation.message;

    // })

  }

  deleteItem(){

    if(confirm("Are you sure?")){
      let id:any = this.param.snapshot.paramMap.get('id');
      this.es.deleteProduct(id).subscribe((response)=>{
        if(response.deletedbyID){
          // localStorage.setItem("photoUserID", "0");
          // this.router.navigate(['/signUp']);
          console.log("deleted");
          this.router.navigate(['/admin']);

        }else{
          console.log("didn't get deleted")
        }
      })
    }

  }


  // delete() {
  //   if (confirm('Are you sure?')) {
  //     let id: any = this.param.snapshot.paramMap.get('id');
  //     this.es.deleteProduct(id).subscribe((response) => {
  //       console.log(response);
  //       if (response.delete) {
  //         this.router.navigate(['/admin']);
  //       }
  //     })
  //   }
  // }

  // code below is how you can populate information about the specific product into the inputfield. This should happend as soon as the page is loaded so it is written in ngOnint(): void.
  ngOnInit(): void {
    console.log(this.param.snapshot.paramMap.get('id'));
    let id:any = this.param.snapshot.paramMap.get('id');
    this.es.getProductsById(id).subscribe(item=>{
      this.product = item;
      console.log(this.product);
      // Since you created two way bindings by using ngModel in html, I am linking description, title, image, stock availablility from database to the inputfields in html. The code below is how you can do it.

      this.description = this.product.description
      this.price = this.product.price
      this.title = this.product.productTitle
      this.image = this.product.product_image
      this.stockAvailability = this.product.stockAvailability
      this.display = this.product.display

    })

// old version---------------------------------------------------
    // this.es.getProductId(id).subscribe(productDetail=>{
    //   console.log(productDetail);
    //   this.product = productDetail;
      // this.description = productDetail.productData[0].description;
      // this.price = productDetail.productData[0].price;
      // this.productTitle = productDetail.productData[0].productTitle;
      // this.product_image = productDetail.productData[0].product_image;
      // this.stockAvailability = productDetail.productData[0].stockAvailability;
  //     console.log(productDetail.productData[0].display);
  //     if (productDetail.productData[0].display === 1) {
  //       productDetail.productData[0].display = true;
  //     } else {
  //       productDetail.productData[0].display = false;
  //     }
  //     this.display = productDetail.productData[0].display;
  //      console.log(productDetail.productData[0].display);


  }

}

