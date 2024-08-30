import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pacient } from '../models/pacient';

@Injectable({
  providedIn: 'root'
})
export class PacientService {
  private apiUrl = 'http://localhost:8080/pacientes';

  constructor(private http: HttpClient) {}

  getPacients(): Observable<Pacient[]> {
    return this.http.get<Pacient[]>(this.apiUrl);
  }

  getPacientByCpf(cpf: string): Observable<Pacient> {
    return this.http.get<Pacient>(`${this.apiUrl}/buscar-por-cpf?cpf=${cpf}`);
  }

  updatePacient(id: string, pacient: Pacient): Observable<Pacient> {
    return this.http.put<Pacient>(`${this.apiUrl}/atualizar${id}`, pacient);
  }

  addPacient(pacient: Pacient): Observable<Pacient> {
    return this.http.post<Pacient>(`${this.apiUrl}/criar`, pacient);
  }

  deletePacient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete${id}`);
  }

  getPacientsByName(nome: string): Observable<Pacient[]> {
    return this.http.get<Pacient[]>(`${this.apiUrl}/buscar-por-nome?nome=${nome}`);
  }
}
