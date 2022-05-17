import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { TopnavComponent } from './topnav/topnav.component';

import { AboutComponent } from './about/about.component';
import { StockComponent } from './stock/stock.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import {EditComponent} from './edit/edit.component';
import { NewproductComponent } from './newproduct/newproduct.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    TopnavComponent,

    AboutComponent,
    StockComponent,
    LoginComponent,
    AdminComponent,
    EditComponent,
    NewproductComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
