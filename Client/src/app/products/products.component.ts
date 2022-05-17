import { Component, OnInit } from '@angular/core';
import{ adminproduct } from '../interface/admin.interface'
import { ProductService } from '../services/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  productList:adminproduct[] = [] ;
    // {
    // Id : 1,
    // productTitle:"Apple iPhone 11 Pro",
    // productPicture:'assets/mobile.jpg',
    // description: "Apple iPhone 11 Pro, US Version, 256GB, Midnight Green - Unlocked",
    // price:1649.99,
    // stockAvailability: "yes"
    // },

    // {

    //   Id : 2,
    //   productTitle:"Canon EOS 250D DSLR Camera",
    //   productPicture:'assets/camera.png',
    //   description: "Includes: SanDisk Ultra 64GB SDXC Memory Card + Wide Angle",
    //   price :949.99,
    //   stockAvailability: "no"


    // },
    // {
    //   Id : 3,
    //   productTitle:"Bose SoundLink Revolve+ ",
    //   productPicture:'assets/speakers.jpg',
    //   description: "Bose SoundLink Revolve+ Portable and Long-Lasting Bluetooth 360 Speaker - Triple Black",
    //   price :349.99,
    //   stockAvailability: "yes"


    // },
    // {
    //   Id : 4,
    //   productTitle:"Short Sleeve Criss Cross T-Shirt",
    //   productPicture:'assets/tshirt13.png',
    //   description: "yokamira Womens Casual V Neck Short Sleeve Criss Cross T-Shirt Blouse Tops, S-2XL",
    //   price :49.99,
    //   stockAvailability: "no"
    // },



    // {
    //   Id : 5,
    //   productTitle:"Short Sleeve T Shirts ",
    //   productPicture:'assets/tshirt1.jpg',
    //   description: "RANPHEE Womens Short Sleeve T Shirts Henley Summer Cotton Plus Size Tunic Tops",
    //   price :49.99,
    //   stockAvailability: "yes"

    // },

    // {
    //   Id : 6,
    //   productTitle:"Loose Casual Short Sleeve",
    //   productPicture:'assets/tshirt2.jpg',
    //   description: "VIISHOW Women's Loose Casual Short Sleeve Chiffon Top T-Shirt Blouse",
    //   price :32.99,
    //   stockAvailability: "no"

    // },
    // {
    //   Id : 7,
    //   productTitle:"Iron Wheel-Inspired Console Table",
    //   productPicture:'assets/table.jpg',
    //   description: "Deco 79 59444 Fir Wood and Iron Wheel-Inspired Console Table,Coffee Table Natural for Living Room for Home Decor Furniture,Wood & Steel Rustic , Brown/Black",
    //   price :489.99,
    //   stockAvailability:"yes"


    // },

    // {
    //   Id : 8,
    //   productTitle:"Set of 3– Two-Toned Real Touch Plastic Fake Plants",
    //   productPicture:'assets/vase1.png',
    //   description: "Set of 3– Two-Toned Real Touch Plastic Fake Plants in Beautiful Mandala Pattern Ceramic Pots– Faux and Ultra Cute: 5x3 inches",
    //   price :489.99,
    //   stockAvailability: "no"

    // },
    // {
    //   Id : 9,
    //   productTitle:"Sofa Pillow Covers",
    //   productPicture:'assets/cushions.jpg',
    //   description: "RABUSOFA Sofa Pillow Covers Green 18x18 inches Set 4 Decorative Square Throw Pillow Cover Cushion Covers Pillow case, Home Decor Decorations for Sofa Couch Bed Chair Car",
    //   price :32.99,
    //   stockAvailability: "yes"
    // }












  constructor(private es:ProductService) { }

  ngOnInit(): void {
    this.es.onlineproducts().subscribe( productList => {
      // console.log("product",this.productList);
      console.log(this.productList);
      this.productList = productList;
    })

  }

}
