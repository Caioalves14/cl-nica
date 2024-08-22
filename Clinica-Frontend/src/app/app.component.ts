import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button'; // Importando diretamente no componente

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule],
  template: '<router-outlet></router-outlet>', 
})
export class AppComponent {
  title = 'Clinica-Frontend';
}
