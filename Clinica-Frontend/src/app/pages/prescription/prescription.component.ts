import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../../services/prescription.service';
import { Prescription } from '../../models/prescription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss'],
  providers: [MessageService]
})
export class PrescriptionComponent implements OnInit {

  prescriptions: Prescription[] = [];
  latePrescriptions: Prescription[] = [];
  prescriptionForm: FormGroup;
  error: string | null = null;
  displayModal: boolean = false;

  constructor(
    private prescriptionService: PrescriptionService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.prescriptionForm = this.fb.group({
      numero: ['', Validators.required],
      paciente: ['', Validators.required],
      doenca: ['', Validators.required],
      medicamento: ['', Validators.required],
      dataConsulta: ['', Validators.required],
      tratamento: ['', Validators.required],
      dataRevisao: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

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

  onNewPrescription() {
    this.prescriptionForm.reset();
    this.displayModal = true;
  }

  async addPrescription() {
    if (this.prescriptionForm.valid) {
      const newPrescription: Prescription = this.prescriptionForm.value;

      try {
        this.prescriptionService.addPrescription(newPrescription).subscribe(
          () => {
            this.prescriptions.push(newPrescription);
            this.prescriptionForm.reset();
            this.displayModal = false;
          },
          (error: any) => {
            this.error = 'Erro ao cadastrar prescrição';
          }
        );
      } catch (error) {
        this.error = 'Erro ao cadastrar prescrição';
      }
    }
  }

  concludePrescription(id: string) {
    this.prescriptionService.concludePrescription(id).subscribe(
      (data: Prescription) => {
        this.loadPrescriptions();
        this.loadLatePrescriptions();
        this.generateReport(data);
      },
      (error: any) => {
        this.error = 'Erro ao concluir prescrição';
      }
    );
  }

  generateReport(prescription: Prescription) {
    const doc = new jsPDF();
    doc.text(`Prescrição Número: ${prescription.numero}`, 10, 10);
    doc.text(`Paciente: ${prescription.paciente}`, 10, 20);
    doc.text(`Doença: ${prescription.doenca}`, 10, 30);
    doc.text(`Nome do Remédio: ${prescription.nomeRemedio}`, 10, 40); // Updated line
    doc.text(`Data da Consulta: ${new Date(prescription.dataConsulta).toLocaleDateString()}`, 10, 50);
    doc.text(`Tratamento: ${prescription.tratamento}`, 10, 60);
    doc.text(`Data da Revisão: ${new Date(prescription.dataRevisao).toLocaleDateString()}`, 10, 70);
    doc.text(`Status: ${prescription.status}`, 10, 80);
    doc.save(`prescricao_${prescription.numero}.pdf`);
  }

}
