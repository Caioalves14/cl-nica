import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pacient } from '../models/pacient';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientService {

  private apiUrl = 'http://localhost:8080/pacientes';

  constructor(private http: HttpClient) { }

  getPacients(): Promise<Pacient[]> {
    return this.http.get<Pacient[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erro ao buscar pacientes', error);
          return throwError(() => new Error('Erro ao buscar pacientes'));
        })
      )
      .toPromise()
      .then(pacients => pacients || []); // Garante que nunca retorne undefined
  }

  getPacientsByName(name: string): Promise<Pacient[]> {
    return this.http.get<Pacient[]>(`${this.apiUrl}?name=${name}`)
      .pipe(
        catchError(error => {
          console.error('Erro ao buscar pacientes por nome', error);
          return throwError(() => new Error('Erro ao buscar pacientes por nome'));
        })
      )
      .toPromise()
      .then(pacients => pacients || []); // Garante que nunca retorne undefined
  }

  async getPacientByCpf(cpf: string): Promise<Pacient> {
    const pacient = await this.http.get<Pacient>(`${this.apiUrl}/${cpf}`)
      .pipe(
        catchError(error => {
          console.error('Erro ao buscar paciente por CPF', error);
          return throwError(() => new Error('Erro ao buscar paciente por CPF'));
        })
      )
      .toPromise();
    if (!pacient) {
      throw new Error('Paciente não encontrado');
    }
    return pacient;
  }

  addPacient(pacient: Pacient): Promise<Pacient> {
    return this.http.post<Pacient>(`${this.apiUrl}/criar`, pacient)
      .toPromise()
      .then(pacient => {
        if (!pacient) {
          throw new Error('Erro ao adicionar paciente');
        }
        return pacient;
      })
      .catch(error => {
        console.error('Erro ao adicionar paciente', error);
        throw new Error('Erro ao adicionar paciente');
      });
  }
}
