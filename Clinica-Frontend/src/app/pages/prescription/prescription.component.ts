import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pacient } from '../../models/pacient';
import { Prescription } from '../../models/prescription';
import { PacientService } from '../../services/pacient.service';
import { DiseaseService } from '../../services/disease.service';
import { PrescriptionService } from '../../services/prescription.service';
import { Disease } from '../../models/disease';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {

  prescription: Prescription = { number: '', pacient: '', disease: '', medicine: '', consultationDate: new Date(), treatment: '', status: '' };
  pacients: Pacient[] = [];
  diseases: Disease[] = [];
  statusOptions = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Cancelled', value: 'CANCELLED' }
  ];

  constructor(
    private prescriptionService: PrescriptionService,
    private pacientService: PacientService,
    private diseaseService: DiseaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const number = this.route.snapshot.paramMap.get('number');
    if (number) {
      this.prescriptionService.getPrescription(number).then(data => {
        if (data) {
          this.prescription = data;
        } else {
          this.router.navigate(['/not-found']); // Ajuste conforme necessário
        }
      }).catch(() => {
        this.router.navigate(['/not-found']); // Navegue para a página de erro se a prescrição não for encontrada
      });
    }

    this.pacientService.getPacients().then(data => {
      this.pacients = data || [];
    });

    this.diseaseService.getDiseases().then(data => {
      this.diseases = data || [];
    });
  }

  onSubmit() {
    if (this.prescription.number) {
      this.prescriptionService.updatePrescription(this.prescription).then(() => {
        this.router.navigate(['/prescriptions']);
      });
    } else {
      this.prescriptionService.addPrescription(this.prescription).then(() => {
        this.router.navigate(['/prescriptions']);
      });
    }
  }
}
