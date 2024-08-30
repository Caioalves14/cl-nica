import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:4200/reports'; // Ajuste a URL conforme necessário

  constructor(private http: HttpClient) {}

  getReports(): Promise<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(response => {
        // Garantir que a resposta seja um array
        return Array.isArray(response) ? response : [];
      }),
      catchError(error => {
        console.error('Erro ao buscar relatórios:', error);
        return throwError(() => new Error('Erro ao buscar relatórios'));
      })
    ).toPromise() as Promise<any[]>; // Assegurar o tipo Promise<any[]>
  }
}
