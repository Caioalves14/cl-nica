import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { ComponentsModule } from '../components/components.module';
import { DiseaseComponent } from './disease/disease.component';
import { FormsModule } from '@angular/forms';
import { PacientComponent } from './pacient/pacient.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { CardModule } from 'primeng/card'; // Importar o módulo do p-card
import { FieldsetModule } from 'primeng/fieldset';
import { ReportComponent } from './report/report.component'; // Importar o módulo do p-fieldset


@NgModule({
  declarations: [DiseaseComponent, PacientComponent, PrescriptionComponent, ReportComponent],
  imports: [
    ComponentsModule,
    FormsModule,
    TabViewModule,
    CommonModule,
    ButtonModule,
    MenuModule,
    TableModule,
    ToastModule,
    TagModule,
    DropdownModule,
    InputTextModule,
    RouterModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    CardModule,
    FieldsetModule,
  ],
  providers: [MessageService]
})
export class PagesModule {}
