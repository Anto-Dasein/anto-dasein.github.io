import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponenteBasePortfolio } from '../../core/base/componente-base';

interface SkillConNivel {
  nombre: string;
  nivel: 'Expert' | 'Advanced' | 'Intermediate' | 'Learning';
  porcentaje: number; // Para las barras
  logo?: string; // Ruta del logo opcional
}

/**
 * Componente Skills con barras horizontales sutiles
 * Inspirado en el estilo minimalista de arnau.dev
 */
@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Skills extends ComponenteBasePortfolio {

  /**
   * Habilidades organizadas por nivel con barras
   */
  readonly skillsConNivel: SkillConNivel[] = [
    // Intermediate (60%)
    { nombre: 'JavaScript', nivel: 'Intermediate', porcentaje: 70, logo: 'assets/javascript-svgrepo-com.svg' },
    { nombre: 'TypeScript', nivel: 'Intermediate', porcentaje: 70, logo: 'assets/typescript.svg' },
    { nombre: 'Angular', nivel: 'Intermediate', porcentaje: 75, logo: 'assets/angular-svgrepo-com.svg' },
    { nombre: 'SQL', nivel: 'Intermediate', porcentaje: 65, logo: 'assets/database-svgrepo-com.svg' },
    { nombre: 'MariaDB', nivel: 'Intermediate', porcentaje: 65, logo: 'assets/mariadb.png' },
    { nombre: 'Java', nivel: 'Intermediate', porcentaje: 70, logo: 'assets/java-svgrepo-com.svg' },
    { nombre: 'Git', nivel: 'Intermediate', porcentaje: 75, logo: 'assets/git-svgrepo-com.svg' },
    { nombre: 'Fork', nivel: 'Intermediate', porcentaje: 60, logo: 'assets/Fork.png' },
    { nombre: 'HTML/CSS', nivel: 'Intermediate', porcentaje: 80, logo: 'assets/CSS3_and_HTML5.svg.png' },
    
    // Currently Learning (30%)
    { nombre: 'Python', nivel: 'Learning', porcentaje: 30, logo: 'assets/python-svgrepo-com.svg' },
    { nombre: 'React', nivel: 'Learning', porcentaje: 25, logo: 'assets/react-svgrepo-com.svg' }
  ];

  /**
   * Obtener clase CSS según el nivel
   */
  obtenerClaseNivel(nivel: string): string {
    const clases = {
      'Expert': 'skill-expert',
      'Advanced': 'skill-advanced', 
      'Intermediate': 'skill-intermediate',
      'Learning': 'skill-learning'
    };
    return clases[nivel as keyof typeof clases] || 'skill-intermediate';
  }
}
