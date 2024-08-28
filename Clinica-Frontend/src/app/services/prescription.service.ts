import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Prescription } from '../models/prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private apiUrl = 'http://localhost:3000/prescriptions';

  constructor(private http: HttpClient) {}

  getPrescription(number: string): Promise<Prescription> {
    return this.http.get<Prescription>(`${this.apiUrl}/${number}`).pipe(
      map(response => {
        if (response) {
          return response;
        } else {
          // Lançar um erro se a resposta for undefined
          throw new Error('Prescrição não encontrada');
        }
      }),
      catchError(error => {
        console.error('Error fetching prescription:', error);
        return throwError(() => new Error('Prescrição não encontrada'));
      })
    ).toPromise().then(result => {
      if (result === undefined) {
        throw new Error('Prescrição não encontrada');
      }
      return result;
    });
  }

  addPrescription(prescription: Prescription): Promise<Prescription> {
    return this.http.post<Prescription>(this.apiUrl, prescription).pipe(
      map(response => {
        if (response) {
          return response;
        } else {
          throw new Error('Falha ao adicionar a prescrição');
        }
      }),
      catchError(error => {
        console.error('Error adding prescription:', error);
        return throwError(() => new Error('Falha ao adicionar a prescrição'));
      })
    ).toPromise().then(result => {
      if (result === undefined) {
        throw new Error('Falha ao adicionar a prescrição');
      }
      return result;
    });
  }

  updatePrescription(prescription: Prescription): Promise<Prescription> {
    return this.http.put<Prescription>(`${this.apiUrl}/${prescription.number}`, prescription).pipe(
      map(response => {
        if (response) {
          return response;
        } else {
          throw new Error('Falha ao atualizar a prescrição');
        }
      }),
      catchError(error => {
        console.error('Error updating prescription:', error);
        return throwError(() => new Error('Falha ao atualizar a prescrição'));
      })
    ).toPromise().then(result => {
      if (result === undefined) {
        throw new Error('Falha ao atualizar a prescrição');
      }
      return result;
    });
  }

  deletePrescription(number: string): Promise<void> {
    return this.http.delete<void>(`${this.apiUrl}/${number}`).pipe(
      catchError(error => {
        console.error('Error deleting prescription:', error);
        return throwError(() => new Error('Falha ao excluir a prescrição'));
      })
    ).toPromise();
  }
}
