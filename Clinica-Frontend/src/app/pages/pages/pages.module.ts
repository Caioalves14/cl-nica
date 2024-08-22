import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RemedyComponent } from './remedy/remedy.component';


@NgModule({
  declarations: [
    RemedyComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class PagesModule { }
