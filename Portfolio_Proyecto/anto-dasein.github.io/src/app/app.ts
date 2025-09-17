import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecera } from './shared/components/cabecera/cabecera';
import { Footer } from './shared/components/footer/footer';
import { ServicioPortfolio } from './core/services/portfolio.service';

/**
 * Mi componente principal de la aplicación
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cabecera, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly portfolioService = inject(ServicioPortfolio);
  
  protected readonly title = signal('anto-dasein.github.io');
  protected readonly infoPersonal = this.portfolioService.infoPersonal;
}
