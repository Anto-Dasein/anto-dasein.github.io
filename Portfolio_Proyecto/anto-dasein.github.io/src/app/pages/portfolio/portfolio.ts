import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

/**
 * Interfaz para los proyectos del portfolio
 */
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  year: number;
  category: 'web' | 'mobile' | 'desktop' | 'other';
}

/**
 * Componente Portfolio inspirado en arnau.dev/projects
 */
@Component({
  selector: 'app-portfolio',
  imports: [TitleCasePipe],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Portfolio {
  
  /**
   * Lista de proyectos (por ahora con ejemplos)
   * Mañana puedes reemplazar con tus proyectos reales
   */
  protected readonly projects = signal<Project[]>([
    {
      id: 'proyecto-ejemplo-1',
      title: 'Portfolio Personal',
      description: 'Mi portfolio personal desarrollado con Angular, siguiendo las mejores prácticas de desarrollo moderno.',
      technologies: ['Angular', 'TypeScript', 'CSS3', 'HTML5'],
      featured: true,
      year: 2025,
      category: 'web',
      githubUrl: 'https://github.com/your-username/portfolio',
      liveUrl: 'https://your-portfolio.dev'
    },
    {
      id: 'proyecto-ejemplo-2',
      title: 'Management Application',
      description: 'Management system developed as part of my academic training, focusing on practical business solutions.',
      technologies: ['Java', 'SQL', 'HTML', 'CSS'],
      featured: false,
      year: 2024,
      category: 'desktop',
      githubUrl: 'https://github.com/your-username/management-app'
    },
    {
      id: 'proyecto-ejemplo-3',
      title: 'Responsive Website',
      description: 'Practice project focused on responsive design and web accessibility standards.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      featured: false,
      year: 2024,
      category: 'web',
      githubUrl: 'https://github.com/your-username/responsive-web'
    }
  ]);

  /**
   * Filtros disponibles
   */
  protected readonly categories = signal([
    { id: 'all', name: 'All', active: true },
    { id: 'web', name: 'Web', active: false },
    { id: 'mobile', name: 'Mobile', active: false },
    { id: 'desktop', name: 'Desktop', active: false }
  ]);

  /**
   * Filtro activo actual
   */
  protected readonly activeFilter = signal('all');

  /**
   * Obtener proyectos filtrados
   */
  getFilteredProjects() {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.projects();
    }
    return this.projects().filter(project => project.category === filter);
  }

  /**
   * Obtener proyectos destacados
   */
  getFeaturedProjects() {
    return this.projects().filter(project => project.featured);
  }

  /**
   * Cambiar filtro activo
   */
  setActiveFilter(categoryId: string) {
    this.activeFilter.set(categoryId);
    
    // Actualizar estado visual de los filtros
    const updatedCategories = this.categories().map(cat => ({
      ...cat,
      active: cat.id === categoryId
    }));
    this.categories.set(updatedCategories);
  }

  /**
   * Obtener URL de imagen por defecto si no hay imagen
   */
  getProjectImage(project: Project): string {
    return project.image || 'assets/project-placeholder.svg';
  }
}
