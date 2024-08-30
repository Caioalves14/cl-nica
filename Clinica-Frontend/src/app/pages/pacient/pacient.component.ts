import { Component, OnInit } from '@angular/core';
import { PacientService } from '../../services/pacient.service';
import { Pacient } from '../../models/pacient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pacient',
  templateUrl: './pacient.component.html',
  styleUrls: ['./pacient.component.scss'],
  providers: [MessageService]
})
export class PacientComponent implements OnInit {

  pacients: Pacient[] = [];
  pacientsInTreatment: Pacient[] = [];
  pacientForm: FormGroup;
  searchForm: FormGroup;
  error: string | null = null;
  displayModal: boolean = false;

  constructor(
    private pacientService: PacientService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.pacientForm = this.fb.group({
      cpf: ['', Validators.required],
      nome: ['', Validators.required],
      idade: ['', [Validators.required, Validators.min(0)]],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required]
    });

    this.searchForm = this.fb.group({
      searchValue: ['', Validators.required]
    });
  }

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
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.error });
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
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.error });
      }
    );
  }

  onNewPacient() {
    this.pacientForm.reset();
    this.displayModal = true;
  }

  async addPacient() {
    if (this.pacientForm.valid) {
      const newPacient: Pacient = this.pacientForm.value;

      try {
        const exists = await this.checkCpf(newPacient.cpf);
        if (exists) {
          this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Paciente com este CPF já está cadastrado' });
        } else {
          this.pacientService.addPacient(newPacient).subscribe(
            () => {
              this.pacients.push(newPacient);
              this.pacientForm.reset();
              this.displayModal = false;
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Paciente cadastrado com sucesso' });
            },
            (error: any) => {
              this.error = 'Erro ao cadastrar paciente';
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.error });
            }
          );
        }
      } catch (error) {
        this.error = 'Erro ao verificar CPF';
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.error });
      }
    }
  }

  async checkCpf(cpf: string): Promise<boolean> {
    try {
      const pacient = await this.pacientService.getPacientByCpf(cpf).toPromise();
      return !!pacient;
    } catch {
      return false;
    }
  }

  deletePacient(id: string) {
    // Verificar se há prescrições associadas antes de excluir
    this.pacientService.deletePacient(id).subscribe(
      () => {
        this.pacients = this.pacients.filter(p => p.cpf !== id);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Paciente excluído com sucesso' });
      },
      (error: any) => {
        this.error = 'Erro ao excluir paciente';
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.error });
      }
    );
  }

  searchPacientsByName() {
    const { searchValue } = this.searchForm.value;
    this.pacientService.getPacientsByName(searchValue).subscribe(
      (data: Pacient[]) => {
        this.pacients = data;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pacientes encontrados' });
      },
      (error: any) => {
        this.error = 'Erro ao buscar pacientes por nome';
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.error });
      }
    );
  }

  searchPacientsByCpf() {
    const { searchValue } = this.searchForm.value;
    this.pacientService.getPacientsByCpf(searchValue).subscribe(
      (data: Pacient[]) => {
        this.pacients = data;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pacientes encontrados' });
      },
      (error: any) => {
        this.error = 'Erro ao buscar pacientes por CPF';
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.error });
      }
    );
  }
}
