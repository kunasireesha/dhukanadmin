
import { AddlocationComponent } from './components/location/add.location';
import { AddSlotComponent } from './components/slot/add.slot';
import { AddBannerComponent } from './components/banner/add.banner';
import { BannerComponent } from './components/banner/banner.component';
import { AddOffersComponent } from './components/offers/add.offer';
import { AddDeliveryComponent } from './components/delivery/add.delivery';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

// import * as xlsx from "xlsx";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import swal from 'sweetalert'
import { HttpModule } from '@angular/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { routing } from './app.routing';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/login/forgot.password';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgSelectModule } from '@ng-select/ng-select';
import { AmazingTimePickerModule } from 'amazing-time-picker';
//side menus
import { LogNavComponent } from './components/sidenav/logo.nav';
import { ProfileNavComponent } from './components/sidenav/profile.nav';
import { HeaderNavComponent } from './components/sidenav/header.nav';

//categories
import { CategoriesComponent } from './components/categories/categories';
import { AddCatComponent } from './components/categories/add.cat';
import { AddSubCatComponent } from './components/categories/add.sub.cat';
import { SubCatComponent } from './components/categories/subcategories';

//products
import { ProductsComponent } from './components/products/products.component';
import { AddProductsComponent } from './components/products/add.product';

//users
import { UsersComponent } from './components/users/users.component';
import { AddUsersComponent } from './components/users/add.user';

//wholesellers
import { WholesellersComponent } from './components/wholesellers/wholesellers.component';
import { AddWholesellersComponent } from './components/wholesellers/add.wholeseller';

//vendors
import { VendorsComponent } from './components/vendors/vendors.component';
import { AddVendorsComponent } from './components/vendors/add.vendor';


//orders
import { OrdersComponent } from './components/orders/orders.component';
import { VendorManagementComponent } from './components/vendor-management/vendor-management.component';

// modules
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';


import { ProductService } from './services/productService'

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
// service
import { AppService } from './services/dhukan/dhukan-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { ExcelService } from './services/excel.service';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { OffersComponent } from './components/offers/offers.component';
import { ContentManagementComponent } from './components/content-management/content-management.component';
import { LocationComponent } from './components/location/location.component';
import { SlotComponent } from './components/slot/slot.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { DeliveryInfoComponent } from './components/delivery-info/delivery-info.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ReturnsComponent } from './components/returns/returns.component';
import { BestDealsComponent } from './components/banner/best-deals/best-deals.component';
import { BestDiscountComponent } from './components/banner/best-discount/best-discount.component';
import { BestBrandsComponent } from './components/banner/best-brands/best-brands.component';
import { BestAppliancesComponent } from './components/banner/best-appliances/best-appliances.component';



// import { ExcelService } from './excel.service';
// import {MatDatepickerModule,MatNativeDateModule } from '@angular/material/datepicker';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ForgotPasswordComponent,
        CategoriesComponent,
        LogNavComponent,
        ProfileNavComponent,
        AddCatComponent,
        AddSubCatComponent,
        SubCatComponent,
        HeaderNavComponent,
        ProductsComponent,
        AddProductsComponent,
        UsersComponent,
        AddUsersComponent,
        WholesellersComponent,
        AddWholesellersComponent,
        VendorsComponent,
        AddVendorsComponent,
        OrdersComponent,
        ImageUploadComponent,
        DeliveryComponent,
        AddDeliveryComponent,
        OffersComponent,
        AddOffersComponent,
        ContentManagementComponent,
        BannerComponent,
        AddBannerComponent,
        LocationComponent,
        SlotComponent,
        AddSlotComponent,
        AddlocationComponent,
        AboutUsComponent,
        DeliveryInfoComponent,
        PrivacyPolicyComponent,
        ReturnsComponent,
        BestDealsComponent,
        BestDiscountComponent,
        BestBrandsComponent,
        BestAppliancesComponent

    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        Ng2SearchPipeModule,
        MatButtonModule,
        MatCheckboxModule,
        MyDatePickerModule,
        CKEditorModule,
        NgSelectModule,
        AmazingTimePickerModule,
        // MatNativeDateModule,
        // MatDatepickerModule,
        TooltipModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        RouterModule.forRoot([
            { path: '', component: LoginComponent },
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
            { path: 'orders', component: OrdersComponent, data: [{ page: 'orders' }] },
            { path: 'imageUpload', component: ImageUploadComponent, data: [{ page: 'imageupload' }] },
            { path: 'delivery', component: DeliveryComponent, data: [{ page: 'addDelivery' }] },
            { path: 'addDelivery', component: AddDeliveryComponent, data: [{ page: 'addDelivery' }] },
            { path: 'offers', component: OffersComponent, data: [{ page: 'addOffers' }] },
            { path: 'addOffers', component: AddOffersComponent, data: [{ page: 'addOffers' }] },
            { path: 'content', component: ContentManagementComponent, data: [{ page: 'content' }] },
            { path: 'addcontent', component: ContentManagementComponent, data: [{ page: 'addcontent' }] },
            { path: 'banner', component: BannerComponent, data: [{ page: 'banner' }] },
            { path: 'bestAppliances', component: BestAppliancesComponent, data: [{ page: 'bestAppliances' }] },
            { path: 'bestBrands', component: BestBrandsComponent, data: [{ page: 'bestBrands' }] },
            { path: 'bestDeals', component: BestDealsComponent, data: [{ page: 'bestDeals' }] },
            { path: 'bestDiscount', component: BestDiscountComponent, data: [{ page: 'bestDiscount' }] },
            { path: 'addbanner', component: AddBannerComponent, data: [{ page: 'addbanner' }] },
            { path: 'addlocation', component: AddlocationComponent, data: [{ page: 'addlocation' }] },
            { path: 'location', component: LocationComponent, data: [{ page: 'location' }] },
            { path: 'addslot', component: AddSlotComponent, data: [{ page: 'addslot' }] },
            { path: 'slot', component: SlotComponent, data: [{ page: 'slot' }] },
            { path: 'aboutUs', component: AboutUsComponent, data: [{ page: 'aboutUs' }] },
            { path: 'deliveryInfo', component: DeliveryInfoComponent, data: [{ page: 'deliveryInfo' }] },
            { path: 'privacy', component: PrivacyPolicyComponent, data: [{ page: 'privacy' }] },
            { path: 'returns', component: ReturnsComponent, data: [{ page: 'returns' }] }

        ], { useHash: true }),
        BrowserAnimationsModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
        AppService,
        ProductService,
        ExcelService
        // ExcelService
    ],
    bootstrap: [AppComponent],
    entryComponents: [],
    exports: [BrowserModule, TranslateModule]
})
export class AppModule { }
