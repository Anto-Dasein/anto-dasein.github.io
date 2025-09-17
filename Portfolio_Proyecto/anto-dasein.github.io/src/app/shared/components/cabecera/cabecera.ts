import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponenteBasePortfolio } from '../../../core/base/componente-base';

interface ElementoNavegacion {
  etiqueta: string;
  ruta: string;
}

/**
 * Componente de cabecera usando herencia
 * Inspirado en el diseño minimalista de arnau.dev
 */
@Component({
  selector: 'app-cabecera',
  imports: [CommonModule, RouterModule],
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cabecera extends ComponenteBasePortfolio {
  private readonly platformId = inject(PLATFORM_ID);
  
  // Mi navegación simplificada
  readonly elementosNavegacion: ElementoNavegacion[] = [
    { etiqueta: 'Home', ruta: '/' },
    { etiqueta: 'About', ruta: '/about' },
    { etiqueta: 'Projects', ruta: '/projects' },
    { etiqueta: 'Skills', ruta: '/skills' }
  ];
  
  /**
   * Usa el método heredado para alternar tema
   */
  alternarTemaPublico(): void {
    this.alternarTema();
  }
  
  /**
   * Verifico si una ruta está activa (compatible con SSR)
   */
  esSeccionActiva(ruta: string): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    return window.location.pathname === ruta;
  }
}
