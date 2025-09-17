import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

/**
 * Interfaz para las tecnologías del footer
 */
interface Tecnologia {
  nombre: string;
  logo: string;
  url: string;
}

/**
 * Componente Footer inspirado en arnau.dev
 */
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {
  
  /**
   * Tecnologías utilizadas en el proyecto
   */
  protected readonly tecnologias = signal<Tecnologia[]>([
    {
      nombre: 'Angular',
      logo: 'assets/angular-svgrepo-com.svg',
      url: 'https://angular.dev'
    },
    {
      nombre: 'TypeScript',
      logo: 'assets/typescript.svg',
      url: 'https://www.typescriptlang.org'
    }
  ]);

  /**
   * Año actual para el copyright
   */
  protected readonly currentYear = signal(new Date().getFullYear());

  /**
   * Información personal para el copyright
   */
  protected readonly personalInfo = signal({
    name: 'Antonio Espinosa',
    rights: 'All rights Reserved'
  });
}
