import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { ErrorComponent } from './error/error.component';
import { TestComponent } from './test/test.component';
import { ProductAdditionComponent } from './product/product-addition/product-addition.component';
import { ProductAdditionFormComponent } from './product/product-addition-form/product-addition-form.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ImageHandlerComponent } from './image-handler/image-handler.component';
import { DemoMaterialModule } from './test/test-module';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './cart/order/order.component';
import { OrderDetailsComponent } from './dashboard/order-details/order-details.component';
import { HomeComponent } from './home/home.component';
import { ProductAdditionImageComponent } from './product/product-addition-image/product-addition-image.component';
import { ProductUpdationComponent } from './product/product-updation/product-updation.component';
import { ProductUpdationFormComponent } from './product/product-updation-form/product-updation-form.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "error",
    component: ErrorComponent
  },
  { 
    path: 'dashboard/products/:category', 
    component: DashboardComponent, 
    runGuardsAndResolvers: 'always'
  },
  { 
    path: 'dashboard/products/:category/u', 
    component: DashboardComponent, 
    runGuardsAndResolvers: 'always'
  },
  { 
    path: 'dashboard/product/:id', 
    component: DashboardComponent, 
    runGuardsAndResolvers: 'always'
  },
  { 
    path: 'dashboard/addProduct', 
    component: DashboardComponent, 
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'dashboard/updateProduct/:id',
    component: DashboardComponent,
    runGuardsAndResolvers: 'always'
  },
  { 
    path: 'image', 
    component: ImageHandlerComponent 
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'cart/:username',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: OrderComponent
  },
  {
    path: 'orders', 
    component: OrderDetailsComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    component: ErrorComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    ProductComponent,
    ErrorComponent,
    TestComponent,
    ProductAdditionComponent,
    ProductAdditionFormComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ImageHandlerComponent,
    CartComponent,
    OrderComponent,
    OrderDetailsComponent,
    HomeComponent,
    ProductAdditionImageComponent,
    ProductUpdationComponent,
    ProductUpdationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DemoMaterialModule,
    MatTableModule,
    NgxPageScrollCoreModule,
    RouterModule.forRoot(routes,
      { onSameUrlNavigation: 'reload' }
    )
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
