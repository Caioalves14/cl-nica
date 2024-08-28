import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Disease } from '../models/disease'; // Certifique-se de que o caminho está correto

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  private apiUrl = 'http://localhost:3000/diseases'; // Substitua pela URL real da sua API

  constructor(private http: HttpClient) {}

  getDiseases() {
    return this.http.get<Disease[]>(this.apiUrl).toPromise();
  }

  getDisease(cid: string) {
    return this.http.get<Disease>(`${this.apiUrl}/${cid}`).toPromise();
  }

  addDisease(disease: Disease) {
    return this.http.post(this.apiUrl, disease).toPromise();
  }

  updateDisease(disease: Disease) {
    return this.http.put(`${this.apiUrl}/${disease.cid}`, disease).toPromise();
  }

  deleteDisease(cid: string) {
    return this.http.delete(`${this.apiUrl}/${cid}`).toPromise();
  }
}
