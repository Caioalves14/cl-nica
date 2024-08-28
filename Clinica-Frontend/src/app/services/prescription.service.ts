import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription } from '../models/prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = 'http://localhost:8080/prescricoes';  // URL da API

  constructor(private http: HttpClient) {}

  // Método para buscar todas as prescrições
  getPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(this.apiUrl);
  }

  // Método para buscar prescrições atrasadas
  getLatePrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.apiUrl}/atrasadas`);
  }

  // Outros métodos como createPrescription, updatePrescription, etc.
}
