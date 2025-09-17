import { Injectable, signal, computed } from '@angular/core';
import { DATOS_PORTFOLIO, DatosPortfolio, InfoPersonal, Habilidad, Proyecto, Experiencia, EnlaceSocial } from '../models/portfolio.models';

// Interfaces para seguir principio de segregación de interfaces (I)
export interface IServicioLecturaDatos {
  obtenerInfoPersonal(): InfoPersonal;
  obtenerHabilidades(): Habilidad[];
  obtenerProyectos(): Proyecto[];
  obtenerExperiencias(): Experiencia[];
  obtenerEnlacesSociales(): EnlaceSocial[];
}

export interface IServicioFiltroDatos {
  obtenerProyectosDestacados(): Proyecto[];
  obtenerHabilidadesPorCategoria(categoria: string): Habilidad[];
  obtenerExperienciasPorTipo(tipo: string): Experiencia[];
}

/**
 * Servicio de portfolio que maneja todos los datos del portafolio
 * Sigue principios SOLID:
 * - S: Responsabilidad única de gestionar datos del portfolio
 * - O: Abierto para extensión (futuras APIs) cerrado para modificación
 * - L: Implementa las interfaces definidas correctamente
 * - I: Interfaces segregadas por responsabilidad
 * - D: Depende de abstracciones, no implementaciones concretas
 */
@Injectable({
  providedIn: 'root'
})
export class ServicioPortfolio implements IServicioLecturaDatos, IServicioFiltroDatos {
  
  // Señales reactivas para gestión de estado
  private readonly datosPortfolio = signal<DatosPortfolio>(DATOS_PORTFOLIO);
  
  // Datos computados para mejor rendimiento
  readonly infoPersonal = computed(() => this.datosPortfolio().infoPersonal);
  readonly habilidades = computed(() => this.datosPortfolio().habilidades);
  readonly proyectos = computed(() => this.datosPortfolio().proyectos);
  readonly experiencias = computed(() => this.datosPortfolio().experiencias);
  readonly enlacesSociales = computed(() => this.datosPortfolio().enlacesSociales);
  
  // Datos filtrados computados
  readonly proyectosDestacados = computed(() => 
    this.proyectos().filter(proyecto => proyecto.destacado)
  );
  
  readonly experienciasLaborales = computed(() => 
    this.experiencias()
      .filter(exp => exp.tipo === 'trabajo' || exp.tipo === 'practicas')
      .sort((a, b) => b.fechaInicio.getTime() - a.fechaInicio.getTime())
  );
  
  readonly formacionAcademica = computed(() => 
    this.experiencias()
      .filter(exp => exp.tipo === 'educacion' || exp.tipo === 'curso')
      .sort((a, b) => b.fechaInicio.getTime() - a.fechaInicio.getTime())
  );

  // Implementación de IServicioLecturaDatos
  obtenerInfoPersonal(): InfoPersonal {
    return this.infoPersonal();
  }

  obtenerHabilidades(): Habilidad[] {
    return this.habilidades();
  }

  obtenerProyectos(): Proyecto[] {
    return this.proyectos();
  }

  obtenerExperiencias(): Experiencia[] {
    return this.experiencias();
  }

  obtenerEnlacesSociales(): EnlaceSocial[] {
    return this.enlacesSociales();
  }

  // Implementación de IServicioFiltroDatos
  obtenerProyectosDestacados(): Proyecto[] {
    return this.proyectosDestacados();
  }

  obtenerHabilidadesPorCategoria(categoria: string): Habilidad[] {
    return this.habilidades().filter(habilidad => habilidad.categoria === categoria);
  }

  obtenerExperienciasPorTipo(tipo: string): Experiencia[] {
    return this.experiencias().filter(experiencia => experiencia.tipo === tipo);
  }

  // Métodos adicionales para organización de datos
  obtenerHabilidadesTecnicas(): Habilidad[] {
    return this.habilidades().filter(h => 
      h.categoria === 'frontend' || 
      h.categoria === 'backend' || 
      h.categoria === 'herramientas'
    );
  }

  obtenerEnlacesParaHeader(): EnlaceSocial[] {
    return this.enlacesSociales().filter(enlace => enlace.mostrarEnHeader);
  }

  obtenerEnlacesParaFooter(): EnlaceSocial[] {
    return this.enlacesSociales().filter(enlace => enlace.mostrarEnFooter);
  }

  // Método preparado para futura integración con API REST
  async cargarDatosDesdeAPI(): Promise<void> {
    // TODO: Implementar cuando tengamos API REST
    // Por ahora usamos datos estáticos
    console.log('Datos cargados desde configuración local');
  }

  // Método para actualizar datos (preparado para futuras funcionalidades)
  actualizarDatos(nuevosDatos: Partial<DatosPortfolio>): void {
    this.datosPortfolio.update(datos => ({ ...datos, ...nuevosDatos }));
  }
}