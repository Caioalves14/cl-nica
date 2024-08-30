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
  searchOptions = [
    { label: 'Nome', value: 'name' },
    { label: 'CPF', value: 'cpf' }
  ];
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
      searchType: ['', Validators.required],
      searchValue: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadPacients();
    this.loadPacientsInTreatment();
  }

  async loadPacients() {
    try {
      this.pacients = await this.pacientService.getPacients();
    } catch (error) {
      this.error = 'Erro ao carregar pacientes';
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.error });
    }
  }

  async loadPacientsInTreatment() {
    try {
      const data = await this.pacientService.getPacients();
      this.pacientsInTreatment = data.filter((pacient: Pacient) => !pacient.revisao);
    } catch (error) {
      this.error = 'Erro ao carregar pacientes em tratamento';
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.error });
    }
  }

  async searchPacients() {
    const { searchType, searchValue } = this.searchForm.value;
    if (searchType === 'name') {
      await this.searchPacientsByName(searchValue);
    } else if (searchType === 'cpf') {
      await this.searchPacientsByCpf(searchValue);
    }
  }

  async searchPacientsByName(name: string) {
    try {
      this.pacients = await this.pacientService.getPacientsByName(name);
    } catch (error) {
      this.error = 'Erro ao buscar pacientes por nome';
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.error });
    }
  }

  async searchPacientsByCpf(cpf: string) {
    try {
      const data = await this.pacientService.getPacientByCpf(cpf);
      this.pacients = [data]; // Certifique-se de que está lidando com um único paciente
    } catch (error) {
      this.error = 'Erro ao buscar pacientes por CPF';
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.error });
    }
  }

  async savePacient() {
    if (this.pacientForm.valid) {
      const newPacient: Pacient = this.pacientForm.value;
      try {
        await this.pacientService.addPacient(newPacient);
        await this.loadPacients();
        this.displayModal = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Paciente cadastrado com sucesso' });
      } catch (error) {
        this.error = 'Erro ao cadastrar paciente';
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: this.error });
      }
    }
  }
}
