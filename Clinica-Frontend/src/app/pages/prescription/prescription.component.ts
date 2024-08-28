import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../../services/prescription.service';
import { Prescription } from '../../models/prescription';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {

  prescriptions: Prescription[] = [];
  latePrescriptions: Prescription[] = [];
  error: string | null = null;

  constructor(private prescriptionService: PrescriptionService) {}

  ngOnInit() {
    this.loadPrescriptions();
    this.loadLatePrescriptions();
  }

  loadPrescriptions() {
    this.prescriptionService.getPrescriptions().subscribe(
      (data: Prescription[]) => {
        this.prescriptions = data;
      },
      (error: any) => {
        this.error = 'Erro ao carregar prescrições';
      }
    );
  }

  loadLatePrescriptions() {
    this.prescriptionService.getLatePrescriptions().subscribe(
      (data: Prescription[]) => {
        this.latePrescriptions = data;
      },
      (error: any) => {
        this.error = 'Erro ao carregar prescrições atrasadas';
      }
    );
  }
}
