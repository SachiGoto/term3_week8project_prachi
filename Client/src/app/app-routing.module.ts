import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ ProductsComponent} from './products/products.component';
import{ AboutComponent} from './about/about.component';
import { LoginComponent } from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import { EditComponent} from './edit/edit.component';
import { NewproductComponent } from './newproduct/newproduct.component';
// import { AdminproductsComponent } from './adminproducts/adminproducts.component';


const routes: Routes = [

  {path:'about',component:AboutComponent },
  {path:'products',component:ProductsComponent },
  {path:'login', component: LoginComponent},
  {path:'admin', component: AdminComponent},
  {path:'edit', component: EditComponent},
  {path:'products/:id', component: EditComponent},
  {path:'newproduct', component:NewproductComponent}
  // {path :'adminproducts',component: AdminproductsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
