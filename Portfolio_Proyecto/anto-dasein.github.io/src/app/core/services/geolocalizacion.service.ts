import { Injectable, signal } from '@angular/core';

// Interfaces para el servicio de geolocalización
export interface CoordenadaGeografica {
  latitud: number;
  longitud: number;
  precision?: number;
}

export interface DatosUbicacion {
  coordenadas: CoordenadaGeografica;
  ciudad?: string;
  pais?: string;
  codigoPostal?: string;
  zona?: string;
  fechaObtencion: Date;
}

export interface IServicioGeolocalizacion {
  obtenerUbicacionActual(): Promise<DatosUbicacion>;
  obtenerUbicacionPorIP(): Promise<DatosUbicacion>;
  estaGeolocalizacionDisponible(): boolean;
}

/**
 * Servicio de geolocalización preparado para futuras integraciones con APIs REST
 * Actualmente proporciona datos estáticos pero está preparado para extensión
 * 
 * Futuras implementaciones podrían incluir:
 * - API de geolocalización del navegador
 * - APIs externas como OpenStreetMap, Google Maps
 * - APIs de geolocalización por IP
 * - Integración con servicios de mapas
 */
@Injectable({
  providedIn: 'root'
})
export class ServicioGeolocalizacion implements IServicioGeolocalizacion {
  
  // Señales reactivas para el estado de geolocalización
  private readonly _ubicacionActual = signal<DatosUbicacion | null>(null);
  private readonly _cargandoUbicacion = signal<boolean>(false);
  private readonly _errorGeolocalizacion = signal<string | null>(null);
  
  // Propiedades públicas de solo lectura
  readonly ubicacionActual = this._ubicacionActual.asReadonly();
  readonly cargandoUbicacion = this._cargandoUbicacion.asReadonly();
  readonly errorGeolocalizacion = this._errorGeolocalizacion.asReadonly();
  
  // Datos estáticos para España (ubicación actual de Antonio)
  private readonly UBICACION_ESTATICA: DatosUbicacion = {
    coordenadas: {
      latitud: 40.4168,
      longitud: -3.7038,
      precision: 1000
    },
    ciudad: 'Madrid',
    pais: 'Spain',
    zona: 'Europe/Madrid',
    fechaObtencion: new Date()
  };

  /**
   * Verifica si la geolocalización está disponible en el navegador
   */
  estaGeolocalizacionDisponible(): boolean {
    return typeof navigator !== 'undefined' && 'geolocation' in navigator;
  }

  /**
   * Obtiene la ubicación actual usando la API del navegador
   * TODO: Implementar cuando se requiera geolocalización real
   */
  async obtenerUbicacionActual(): Promise<DatosUbicacion> {
    this._cargandoUbicacion.set(true);
    this._errorGeolocalizacion.set(null);

    try {
      // Por ahora devolver datos estáticos
      // En el futuro se implementará la API real del navegador
      return new Promise((resolve) => {
        setTimeout(() => {
          const ubicacion = { ...this.UBICACION_ESTATICA, fechaObtencion: new Date() };
          this._ubicacionActual.set(ubicacion);
          this._cargandoUbicacion.set(false);
          resolve(ubicacion);
        }, 1000); // Simular latencia de red
      });

      /* Implementación futura con API real:
      return new Promise((resolve, reject) => {
        if (!this.estaGeolocalizacionDisponible()) {
          reject(new Error('Geolocalización no disponible'));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const coordenadas: CoordenadaGeografica = {
              latitud: position.coords.latitude,
              longitud: position.coords.longitude,
              precision: position.coords.accuracy
            };

            // Aquí se haría llamada a API REST para obtener detalles de ubicación
            const datosCompletos = await this.enriquecerDatosUbicacion(coordenadas);
            
            this._ubicacionActual.set(datosCompletos);
            this._cargandoUbicacion.set(false);
            resolve(datosCompletos);
          },
          (error) => {
            this._errorGeolocalizacion.set(error.message);
            this._cargandoUbicacion.set(false);
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minutos
          }
        );
      });
      */

    } catch (error) {
      this._errorGeolocalizacion.set('Error obteniendo ubicación');
      this._cargandoUbicacion.set(false);
      throw error;
    }
  }

  /**
   * Obtiene la ubicación aproximada basada en la IP del usuario
   * TODO: Integrar con API externa como ipapi.co o similar
   */
  async obtenerUbicacionPorIP(): Promise<DatosUbicacion> {
    this._cargandoUbicacion.set(true);
    this._errorGeolocalizacion.set(null);

    try {
      // Por ahora devolver datos estáticos
      // En el futuro se implementará llamada a API REST
      return new Promise((resolve) => {
        setTimeout(() => {
          const ubicacion = { ...this.UBICACION_ESTATICA, fechaObtencion: new Date() };
          this._ubicacionActual.set(ubicacion);
          this._cargandoUbicacion.set(false);
          resolve(ubicacion);
        }, 500);
      });

      /* Implementación futura con API REST:
      const response = await fetch('https://ipapi.co/json/');
      const datos = await response.json();
      
      const ubicacion: DatosUbicacion = {
        coordenadas: {
          latitud: datos.latitude,
          longitud: datos.longitude
        },
        ciudad: datos.city,
        pais: datos.country_name,
        codigoPostal: datos.postal,
        zona: datos.timezone,
        fechaObtencion: new Date()
      };

      this._ubicacionActual.set(ubicacion);
      this._cargandoUbicacion.set(false);
      return ubicacion;
      */

    } catch (error) {
      this._errorGeolocalizacion.set('Error obteniendo ubicación por IP');
      this._cargandoUbicacion.set(false);
      throw error;
    }
  }

  /**
   * Método preparado para enriquecer datos de coordenadas con información adicional
   * Usaría APIs como Nominatim (OpenStreetMap), Google Geocoding, etc.
   */
  private async enriquecerDatosUbicacion(coordenadas: CoordenadaGeografica): Promise<DatosUbicacion> {
    // TODO: Implementar llamada a API de geocodificación inversa
    return {
      coordenadas,
      fechaObtencion: new Date()
    };
  }

  /**
   * Limpia el estado del servicio
   */
  limpiarEstado(): void {
    this._ubicacionActual.set(null);
    this._errorGeolocalizacion.set(null);
    this._cargandoUbicacion.set(false);
  }

  /**
   * Obtiene datos de ubicación estáticos (útil para desarrollo)
   */
  obtenerUbicacionEstatica(): DatosUbicacion {
    return { ...this.UBICACION_ESTATICA, fechaObtencion: new Date() };
  }
}