import { Injectable, signal, effect } from '@angular/core';

// Interface para el servicio de tema (principio I de SOLID)
export interface IServicioTema {
  readonly temaActual: () => string;
  readonly esTemaOscuro: () => boolean;
  alternarTema(): void;
  establecerTema(tema: string): void;
}

export type TemaPortfolio = 'claro' | 'oscuro';

/**
 * Servicio para gestión de temas dark/light inspirado en arnau.dev
 * Sigue principios SOLID:
 * - S: Responsabilidad única de gestionar el tema visual
 * - O: Extensible para nuevos temas sin modificar código existente
 * - L: Implementa correctamente la interfaz definida
 * - I: Interface específica para gestión de temas
 * - D: No depende de implementaciones concretas
 */
@Injectable({
  providedIn: 'root'
})
export class ServicioTema implements IServicioTema {
  
  private readonly CLAVE_ALMACENAMIENTO = 'tema-portfolio';
  private readonly TEMA_POR_DEFECTO: TemaPortfolio = 'claro';
  
  // Signal reactivo para el tema actual
  private readonly _temaActual = signal<TemaPortfolio>(this.obtenerTemaInicial());
  
  // Propiedades públicas de solo lectura
  readonly temaActual = this._temaActual.asReadonly();
  readonly esTemaOscuro = () => this._temaActual() === 'oscuro';
  
  constructor() {
    // Effect para aplicar cambios automáticamente cuando cambia el tema
    effect(() => {
      this.aplicarTemaAlDOM(this._temaActual());
      this.guardarTemaEnAlmacenamiento(this._temaActual());
    });
  }

  /**
   * Alterna entre tema claro y oscuro
   */
  alternarTema(): void {
    const nuevoTema: TemaPortfolio = this.esTemaOscuro() ? 'claro' : 'oscuro';
    this._temaActual.set(nuevoTema);
  }

  /**
   * Establece un tema específico
   * @param tema - El tema a establecer
   */
  establecerTema(tema: string): void {
    if (this.esTemaValido(tema)) {
      this._temaActual.set(tema as TemaPortfolio);
    } else {
      console.warn(`Tema no válido: ${tema}. Usando tema por defecto.`);
      this._temaActual.set(this.TEMA_POR_DEFECTO);
    }
  }

  /**
   * Obtiene el tema inicial desde localStorage o preferencias del sistema
   */
  private obtenerTemaInicial(): TemaPortfolio {
    // Intentar obtener desde localStorage
    if (typeof localStorage !== 'undefined') {
      const temaGuardado = localStorage.getItem(this.CLAVE_ALMACENAMIENTO);
      if (temaGuardado && this.esTemaValido(temaGuardado)) {
        return temaGuardado as TemaPortfolio;
      }
    }

    // Fallback a preferencias del sistema
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefiereTemaOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefiereTemaOscuro ? 'oscuro' : 'claro';
    }

    return this.TEMA_POR_DEFECTO;
  }

  /**
   * Aplica el tema al DOM manipulando el atributo data-theme
   */
  private aplicarTemaAlDOM(tema: TemaPortfolio): void {
    if (typeof document !== 'undefined') {
      const valorTemaDOM = tema === 'oscuro' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', valorTemaDOM);
      
      // También actualizar la clase para compatibilidad con CSS
      document.documentElement.classList.remove('tema-claro', 'tema-oscuro');
      document.documentElement.classList.add(`tema-${tema}`);
    }
  }

  /**
   * Guarda el tema en localStorage
   */
  private guardarTemaEnAlmacenamiento(tema: TemaPortfolio): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.CLAVE_ALMACENAMIENTO, tema);
    }
  }

  /**
   * Valida si un tema es válido
   */
  private esTemaValido(tema: string): boolean {
    return tema === 'claro' || tema === 'oscuro';
  }

  /**
   * Método para escuchar cambios en las preferencias del sistema
   * Útil para actualizar automáticamente cuando el usuario cambia
   * las preferencias de su sistema operativo
   */
  escucharCambiosDelSistema(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const manejarCambio = (e: MediaQueryListEvent) => {
        // Solo cambiar si no hay preferencia guardada del usuario
        if (!localStorage.getItem(this.CLAVE_ALMACENAMIENTO)) {
          this._temaActual.set(e.matches ? 'oscuro' : 'claro');
        }
      };

      mediaQuery.addEventListener('change', manejarCambio);
    }
  }
}