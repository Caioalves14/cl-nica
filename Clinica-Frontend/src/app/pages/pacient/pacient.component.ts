import { Component, OnInit } from '@angular/core';
import { PacientService } from '../../services/pacient.service';
import { Pacient } from '../../models/pacient';

@Component({
  selector: 'app-pacient',
  templateUrl: './pacient.component.html',
  styleUrls: ['./pacient.component.scss']
})
export class PacientComponent implements OnInit {

  pacients: Pacient[] = [];
  pacientsInTreatment: Pacient[] = [];
  error: string | null = null;

  constructor(private pacientService: PacientService) {}

  ngOnInit() {
    this.loadPacients();
    this.loadPacientsInTreatment();
  }

  loadPacients() {
    this.pacientService.getPacients().subscribe(
      (data: Pacient[]) => {
        this.pacients = data;
      },
      (error: any) => {
        this.error = 'Erro ao carregar pacientes';
      }
    );
  }

  loadPacientsInTreatment() {
    this.pacientService.getPacientsInTreatment().subscribe(
      (data: Pacient[]) => {
        this.pacientsInTreatment = data;
      },
      (error: any) => {
        this.error = 'Erro ao carregar pacientes em tratamento';
      }
    );
  }
}
