import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  reports: any[] = []; // Tipo ajustado para array vazio por padrão

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.getReports().then(data => {
      this.reports = data;
    }).catch(error => {
      console.error('Erro ao carregar relatórios:', error);
    });
  }
}
