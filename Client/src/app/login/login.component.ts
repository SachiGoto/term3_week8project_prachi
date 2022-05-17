import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string = '';
  password:string = '';
  // local property
  loginStatus = true;

  constructor(
            private cs: ProductService,
            private router: Router
          ) { }

  login(){
    this.cs.loginService(this.email, this.password).subscribe( loginData => {
      console.log(loginData, loginData.login);
      // by local property
      this.loginStatus = loginData.login;
      if(loginData.login){
        console.log(loginData.data[0].ID);
        localStorage.setItem("adminID", JSON.stringify(loginData.data[0].ID));
        //Navigate method takes an array. The first element is the path and the rest
        //are parameters

        this.router.navigate(['/admin']);
      }
    })
  }

  ngOnInit(): void {
  }

}

