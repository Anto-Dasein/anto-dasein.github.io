import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponenteBasePortfolio } from '../../../core/base/componente-base';

/**
 * Interfaz para la experiencia académica
 */
interface ExperienciaAcademica {
  codigo: string;
  titulo: string;
  institucion: string;
  periodo: string;
  logo: string;
}

/**
 * Componente Body inspirado en arnau.dev
 * Usa herencia para simplificar código común
 */
@Component({
  selector: 'app-body',
  imports: [],
  templateUrl: './body.html',
  styleUrl: './body.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Body extends ComponenteBasePortfolio {
  
  /**
   * Experiencia académica actual
   */
  protected readonly experienciaAcademica = signal<ExperienciaAcademica[]>([
    {
      codigo: '(IFCD0112)',
      titulo: 'Programming with Object-Oriented Languages and Relational Databases',
      institucion: 'Copermática Training Center',
      periodo: '2025-Present',
      logo: 'assets/copermatica_logo.jpg'
    },
    {
      codigo: '',
      titulo: 'Higher Technician in Multiplatform Application Development (DAM)',
      institucion: 'I.E.S Juan Bosco',
      periodo: '2025-Present',
      logo: 'assets/Bosco.jpeg'
    }
  ]);
  
  /**
   * Obtener enlaces sociales para mostrar en el body
   * Solo GitHub y LinkedIn como en arnau.dev
   */
  enlacesSocialesBody() {
    return this.enlacesSociales().filter(enlace => 
      enlace.nombre === 'GitHub' || enlace.nombre === 'LinkedIn'
    );
  }
}
