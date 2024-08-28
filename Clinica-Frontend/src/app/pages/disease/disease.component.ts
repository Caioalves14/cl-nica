import { Component, OnInit } from '@angular/core';
import { DiseaseService } from '../../services/disease.service';
import { Disease } from '../../models/disease';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss']
})
export class DiseaseComponent implements OnInit {

  diseases: Disease[] = [];
  selectedDisease: Disease = { cid: '', nome: '', descricao: '' };  // Objeto vazio por padrão
  error: string | null = null;

  constructor(private diseaseService: DiseaseService) {}

  ngOnInit() {
    this.loadDiseases();
  }

  loadDiseases() {
    this.diseaseService.getDiseases().subscribe(
      (data: Disease[]) => {
        this.diseases = data;
      },
      (error: any) => {
        this.error = 'Erro ao carregar doenças';
      }
    );
  }

  onSelectDisease(disease: Disease) {
    this.selectedDisease = { ...disease };  // Clona o objeto para edição
  }

  onSaveDisease() {
    if (this.selectedDisease.cid) {
      this.diseaseService.updateDisease(this.selectedDisease.cid, this.selectedDisease).subscribe(
        () => {
          this.loadDiseases();
          this.selectedDisease = { cid: '', nome: '', descricao: '' };  // Reset selectedDisease
        },
        (error: any) => {
          this.error = 'Erro ao atualizar doença';
        }
      );
    } else {
      this.diseaseService.addDisease(this.selectedDisease).subscribe(
        () => {
          this.loadDiseases();
          this.selectedDisease = { cid: '', nome: '', descricao: '' };  // Reset selectedDisease
        },
        (error: any) => {
          this.error = 'Erro ao adicionar doença';
        }
      );
    }
  }

  onDeleteDisease(cid: string) {
    this.diseaseService.deleteDisease(cid).subscribe(
      () => {
        this.loadDiseases();
      },
      (error: any) => {
        this.error = 'Erro ao excluir doença';
      }
    );
  }

  onCancel() {
    this.selectedDisease = { cid: '', nome: '', descricao: '' };  // Reset selectedDisease
  }
}
