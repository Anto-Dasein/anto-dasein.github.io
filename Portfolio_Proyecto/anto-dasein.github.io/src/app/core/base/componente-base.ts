import { inject } from '@angular/core';
import { ServicioPortfolio } from '../services/portfolio.service';
import { ServicioTema } from '../services/tema.service';


 // Clase base abstracta para componentes del portfolio
 
export abstract class ComponenteBasePortfolio {
  // Servicios inyectados comunes
  protected readonly portfolioService = inject(ServicioPortfolio);
  protected readonly temaService = inject(ServicioTema);
  
  // Datos comunes accesibles para todos los componentes hijos
  readonly infoPersonal = this.portfolioService.infoPersonal;
  readonly enlacesSociales = this.portfolioService.enlacesSociales;
  readonly proyectos = this.portfolioService.proyectos;
  readonly habilidades = this.portfolioService.habilidades;
  readonly experiencias = this.portfolioService.experiencias;
  readonly esTemaOscuro = this.temaService.esTemaOscuro;
  
  /**
   * Método común para alternar tema
   */
  protected alternarTema(): void {
    this.temaService.alternarTema();
  }
  
  /**
   * Método común para obtener clases CSS basadas en tema
   */
  protected obtenerClasesTema(clasesBase: string): string {
    const temaClass = this.esTemaOscuro() ? 'tema-oscuro' : 'tema-claro';
    return `${clasesBase} ${temaClass}`;
  }
}