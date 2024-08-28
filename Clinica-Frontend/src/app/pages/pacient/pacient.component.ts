import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PacientService } from '../../services/pacient.service';
import { Pacient } from '../../models/pacient';
import { Prescription } from '../../models/prescription';
import { PatientStatus } from '../../enums/patient-status.enum';
import { Table } from 'primeng/table';  // Importar o tipo Table do PrimeNG

@Component({
  selector: 'app-pacient',
  templateUrl: './pacient.component.html',
  styleUrls: ['./pacient.component.scss']
})
export class PacientComponent implements OnInit {

  @ViewChild('dt2', { static: false }) dt2!: Table;  // Declarar a propriedade dt2 com o tipo Table

  pacients: Pacient[] = [];
  pacientsInTreatment: Pacient[] = [];
  latePrescriptions: Prescription[] = [];

  statuses = Object.keys(PatientStatus).map(key => ({
    label: key,
    value: PatientStatus[key as keyof typeof PatientStatus]
  }));

  clonedPacients: { [s: string]: Pacient } = {};

  constructor(
    private pacientService: PacientService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.pacientService.getPacients().then((data) => {
      this.pacients = data || [];
      this.pacientsInTreatment = this.pacients.filter(p => p.status === PatientStatus.ACTIVE);
    });

    this.pacientService.getLatePrescriptions().then((data) => {
      this.latePrescriptions = data || [];
    });
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (this.dt2) {
      this.dt2.filterGlobal(inputElement.value, 'contains');
    }
  }

  onRowEditInit(pacient: Pacient) {
    this.clonedPacients[pacient.id as string] = { ...pacient };
  }

  onRowEditSave(pacient: Pacient) {
    if (pacient.name.trim() !== '') {
      delete this.clonedPacients[pacient.id as string];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Patient details updated' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Name' });
    }
  }

  onRowEditCancel(pacient: Pacient, index: number) {
    this.pacients[index] = this.clonedPacients[pacient.id as string];
    delete this.clonedPacients[pacient.id as string];
  }

  getSeverity(status: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'warning';
      case 'PENDING':
        return 'danger';
      default:
        return 'info'; // Valor padrão para status desconhecido
    }
  }
}
