import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { OtherComponent } from './other/other.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';

const  appRoutes:Routes =[
  {path:'home',component:HomeComponent},
  {path:'other',component:OtherComponent},  
  {path:'**',component:HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    OtherComponent,
    HomeComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
