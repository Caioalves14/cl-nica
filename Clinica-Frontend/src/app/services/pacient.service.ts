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

  updatePacient(cpf: string, pacient: Pacient): Observable<Pacient> {
    return this.http.put<Pacient>(`${this.apiUrl}/${cpf}`, pacient);
  }

  addPacient(pacient: Pacient): Observable<Pacient> {
    return this.http.post<Pacient>(this.apiUrl, pacient);
  }

  // Novo método para buscar pacientes em tratamento
  getPacientsInTreatment(): Observable<Pacient[]> {
    return this.http.get<Pacient[]>(`${this.apiUrl}/em-tratamento`);
  }
}
