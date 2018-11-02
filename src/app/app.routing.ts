

import { LoginComponent } from './components/login/login.component';
import { CategoriesComponent } from './components/categories/categories';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AddCatComponent } from './components/categories/add.cat';
import { AddSubCatComponent } from './components/categories/add.sub.cat';
import { SubCatComponent } from './components/categories/subcategories';
import { ProductsComponent } from './components/products/products.component';
import { AddProductsComponent } from './components/products/add.product';
import { UsersComponent } from './components/users/users.component';
import { AddUsersComponent } from './components/users/add.user';
import { AddWholesellersComponent } from './components/wholesellers/add.wholeseller';
import { WholesellersComponent } from './components/wholesellers/wholesellers.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { AddVendorsComponent } from './components/vendors/add.vendor';
import { OrdersComponent } from './components/orders/orders.component';
import { ForgotPasswordComponent } from './components/login/forgot.password';


export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent },
    { path: 'category', component: CategoriesComponent, data: [{ page: 'categorie' }] },
    { path: 'addcategory', component: AddCatComponent, data: [{ page: 'addcategorie' }] },
    { path: 'subcategory', component: SubCatComponent, data: [{ page: 'subcategorie' }] },
    { path: 'addsubcategory', component: AddSubCatComponent, data: [{ page: 'addsubcategorie' }] },
    { path: 'prducts', component: ProductsComponent, data: [{ page: 'products' }] },
    { path: 'addprducts', component: AddProductsComponent, data: [{ page: 'addproducts' }] },
    { path: 'users', component: UsersComponent, data: [{ page: 'users' }] },
    { path: 'addusers', component: AddUsersComponent, data: [{ page: 'addusers' }] },
    { path: 'wholesellers', component: WholesellersComponent, data: [{ page: 'wholesellers' }] },
    { path: 'addwholesellers', component: AddWholesellersComponent, data: [{ page: 'addwholesellers' }] },
    { path: 'vendors', component: VendorsComponent, data: [{ page: 'vendors' }] },
    { path: 'addvendors', component: AddVendorsComponent, data: [{ page: 'addvendors' }] },
    { path: 'orders', component: OrdersComponent, data: [{ page: 'orders' }] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);