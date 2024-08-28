import { Injectable } from '@angular/core';
import { Pacient } from '../models/pacient';
import { Prescription } from '../models/prescription'

@Injectable({
  providedIn: 'root'
})
export class PacientService {

  private pacients: Pacient[] = [];  // Aqui você teria a lógica para buscar os pacientes de uma API ou banco de dados.

  getPacients(): Promise<Pacient[]> {
    // Simulação de uma chamada API
    return Promise.resolve(this.pacients);
  }

  getLatePrescriptions(): Promise<Prescription[]> {
    // Simulação de uma chamada API para pegar prescrições atrasadas.
    // Implementação fictícia.
    return Promise.resolve([]);
  }

  // Outros métodos relacionados ao paciente, como adicionar, atualizar, excluir, etc.
}
