import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

/**
 * Interfaz para las tecnologías y herramientas
 */
interface Technology {
  name: string;
  description: string;
  logo: string;
  url: string;
  category: 'Technologies' | 'Tools';
}

/**
 * Componente About inspirado en arnau.dev/about
 */
@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class About {
  
  /**
   * Información personal y descripción
   */
  protected readonly aboutInfo = signal({
    title: "I'm Antonio Espinosa, living in Ciudad Real – where I'm trying to survive, code and build the future.",
    paragraphs: [
      "I'm a developer in the making, passionate about technology and how it shapes the way we live, connect, and create. What excites me most is the chance to grow every single day: to face challenges not as walls, but as stepping stones. For me, every bug, every project, every \"aha!\" moment is an opportunity to level up – step by step.",
      "My journey with tech started early. I've been fascinated by computers and the digital world since I was a kid, but only recently decided to turn that passion into a career. Beyond code, I draw a lot of inspiration from fantasy and science fiction literature – worlds that fuel my imagination and remind me that innovation often starts with daring to imagine something different.",
      "And of course, video games have been part of my life since I was five. They're more than entertainment: they've taught me problem-solving, persistence, and how creativity and logic can blend seamlessly. In many ways, coding feels like playing a game too – one where the reward is creating something meaningful from scratch."
    ],
    email: 'anto.dasein@gmail.com'
  });

  /**
   * Tecnologías que uso
   */
  protected readonly technologies = signal<Technology[]>([
    {
      name: 'JavaScript',
      description: 'Programming Language',
      logo: 'assets/javascript-svgrepo-com.svg',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      category: 'Technologies'
    },
    {
      name: 'TypeScript',
      description: 'Programming Language',
      logo: 'assets/typescript.svg',
      url: 'https://www.typescriptlang.org',
      category: 'Technologies'
    },
    {
      name: 'Angular',
      description: 'Web Framework',
      logo: 'assets/angular-svgrepo-com.svg',
      url: 'https://angular.dev',
      category: 'Technologies'
    },
    {
      name: 'React',
      description: 'UI Library',
      logo: 'assets/react-svgrepo-com.svg',
      url: 'https://react.dev',
      category: 'Technologies'
    },
    {
      name: 'Python',
      description: 'Programming Language',
      logo: 'assets/python-svgrepo-com.svg',
      url: 'https://www.python.org',
      category: 'Technologies'
    },
    {
      name: 'Java',
      description: 'Programming Language',
      logo: 'assets/java-svgrepo-com.svg',
      url: 'https://www.oracle.com/java/',
      category: 'Technologies'
    },
    {
      name: 'SQL',
      description: 'Query Language',
      logo: 'assets/database-svgrepo-com.svg',
      url: 'https://en.wikipedia.org/wiki/SQL',
      category: 'Technologies'
    },
    {
      name: 'MariaDB',
      description: 'Database System',
      logo: 'assets/mariadb.png',
      url: 'https://mariadb.org',
      category: 'Technologies'
    },
    {
      name: 'Git',
      description: 'Version Control',
      logo: 'assets/git-svgrepo-com.svg',
      url: 'https://git-scm.com',
      category: 'Tools'
    },
    {
      name: 'Fork',
      description: 'Git Client',
      logo: 'assets/Fork.png',
      url: 'https://git-fork.com',
      category: 'Tools'
    }
  ]);

  /**
   * Obtener tecnologías filtradas por categoría
   */
  getTechnologiesByCategory(category: 'Technologies' | 'Tools') {
    return this.technologies().filter(tech => tech.category === category);
  }
}
