import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DiseaseService } from '../../services/disease.service';
import { Disease } from '../../models/disease';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss']
})
export class DiseaseComponent implements OnInit {

  disease: Disease = { cid: '', name: '', description: '' };

  constructor(
    private diseaseService: DiseaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const cid = this.route.snapshot.paramMap.get('cid');
    if (cid) {
      this.diseaseService.getDisease(cid).then(data => {
        if (data) {
          this.disease = data;
        } else {
          // Tratar caso onde `data` é `undefined`
          this.disease = { cid: '', name: '', description: '' }; // Valor padrão ou navegue para outra página
          // Ou exiba uma mensagem de erro
        }
      });
    }
  }

  onSubmit() {
    if (this.disease.cid) {
      this.diseaseService.updateDisease(this.disease).then(() => {
        this.router.navigate(['/diseases']);
      });
    } else {
      this.diseaseService.addDisease(this.disease).then(() => {
        this.router.navigate(['/diseases']);
      });
    }
  }
}
