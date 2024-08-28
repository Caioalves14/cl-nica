import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Disease } from '../models/disease';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {
  private apiUrl = 'http://localhost:8080/api/doencas';  // URL da API

  constructor(private http: HttpClient) {}

  // Método para buscar todas as doenças
  getDiseases(): Observable<Disease[]> {
    return this.http.get<Disease[]>(this.apiUrl);
  }

  // Método para buscar uma doença por CID
  getDisease(cid: string): Observable<Disease> {
    return this.http.get<Disease>(`${this.apiUrl}/${cid}`);
  }

  // Método para criar uma nova doença
  addDisease(disease: Disease): Observable<Disease> {
    return this.http.post<Disease>(this.apiUrl, disease);
  }

  // Método para atualizar uma doença existente
  updateDisease(cid: string, disease: Disease): Observable<Disease> {
    return this.http.put<Disease>(`${this.apiUrl}/${cid}`, disease);
  }

  // Método para excluir uma doença
  deleteDisease(cid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cid}`);
  }
}
